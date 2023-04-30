import cors from "cors";
import { Application } from "express";
import RateLimit from "express-rate-limit";
import helmet from "helmet";

export const AppMiddlewares = (app: Application) => {
  app.use(helmet());
  app.use(cors());
  app.set("trust", 1);
  app.use(
    RateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
};
