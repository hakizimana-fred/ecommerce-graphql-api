import { AppMiddlewares } from "@/middleware";
import { connectDb } from "config/db";
import "dotenv/config";
import express, { Application } from "express";
import "module-alias/register";

class App {
  private app: Application;

  constructor() {
    this.app = express();
    AppMiddlewares(this.app);
    this.initServer();
  }

  public async initServer() {
    await connectDb();
    this.app.listen(process.env.PORT, () => {
      console.log(`server started on port ${process.env.PORT}`);
    });
  }
}

new App();
