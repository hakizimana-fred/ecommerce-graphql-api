import "reflect-metadata";

import { AppMiddlewares } from "@/middleware";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { PrismaClient } from "@prisma/client";
import { connectDb } from "config/db";
import "dotenv/config";
import express, { Application } from "express";
import { createServer } from "http";
import "module-alias/register";
import { buildSchema } from "type-graphql";

const prisma = new PrismaClient();

class App {
  private app: Application;
  public apolloServer: ApolloServer;
  httpServer: import("http").Server<
    typeof import("http").IncomingMessage,
    typeof import("http").ServerResponse
  >;

  constructor() {
    this.app = express();
    AppMiddlewares(this.app);
    this.httpServer = createServer(this.app);
    this.apolloServerInit();
    this.initServer();
  }

  public async apolloServerInit() {
    this.apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers: [`${__dirname}/resolvers/*.ts`],
        validate: false,
      }),
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer: this.httpServer }),
      ],
    });
    await this.apolloServer.start();
    this.app.use(
      express.json(),
      expressMiddleware(this.apolloServer, {
        context: async ({ req, res }) => ({
          req,
          res,
          prisma,
        }),
      }),
    );
  }

  public async initServer() {
    await connectDb();
    await new Promise((resolve: any) =>
      this.httpServer.listen({ port: 4000 }, resolve),
    );

    console.log(`🚀 Server ready at http://localhost:4000`);
  }
}

new App();
