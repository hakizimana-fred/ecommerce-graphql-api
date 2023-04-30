import cors from "cors";
import "dotenv/config";
import express, { Application } from "express";
import RateLimit from "express-rate-limit";
import helmet from "helmet";

class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.initMiddleware();
    this.initServer();
  }

  private initMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.set("trust", 1);
    this.app.use(
      RateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
      }),
    );
  }

  public initServer() {
    this.app.listen(process.env.PORT, () => {
      console.log(`server started on port ${process.env.PORT}`);
    });
  }
}

new App();
