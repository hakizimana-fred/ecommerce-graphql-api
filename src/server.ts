import { AppMiddlewares } from "@/middleware";
import { ApolloServer } from "@apollo/server";
import { connectDb } from "config/db";
import "dotenv/config";
import express, { Application } from "express";
import { createServer } from "http";
import "module-alias/register";

// The GraphQL schema
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

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
      typeDefs,
      resolvers,
    });
    await this.apolloServer.start();
    this.app.use(expressMiddleware(this.apolloServer));
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
function expressMiddleware(server: any): any {
  throw new Error("Function not implemented.");
}
