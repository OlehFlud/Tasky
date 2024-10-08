import { NextFunction, Request, Response } from 'express';

import rateLimit from 'express-rate-limit';
import * as mongoose from 'mongoose';
import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as path from 'path';
import helmet from 'helmet';

import { config } from './config';
import { ResponceStatusCodeEnum } from './constants';
import { projectRouter, userRouter } from './routes';

const serverRequestLimit = rateLimit({
  windowMs: config.serverRateLimits.period,
  max: config.serverRateLimits.maxRequests,
});

class App {
  public readonly app: express.Application = express();

  constructor() {
    (global as any).appRoot = path.resolve(process.cwd(), '../');

    this.app.use(morgan('dev'));
    this.app.use(helmet());
    this.app.use(serverRequestLimit);
    this.app.use(
      cors({
        origin: this.configureCors,
      }),
    );

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(express.static(path.resolve((global as any).appRoot, 'public')));

    this.mountRoutes();
    this.setupDB();
    this.app.use(this.customErrorHandler);
  }

  private setupDB(): void {
    mongoose.connect(config.MONGODB_URL);

    const db = mongoose.connection;
    db.on('error', console.log.bind(console, 'MONGO ERROR'));
  }

  private customErrorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    res.status(err.status || ResponceStatusCodeEnum.SERVER).json({
      message: err.message || 'Unknown Error',
      code: err.code,
    });
  }

  private configureCors = (origin: any, callback: any) => {
    const whiteList = config.ALLOWED_ORIGIN.split(';');

    if (!origin) {
      return callback(null, true);
    }
    if (!whiteList.includes(origin)) {
      return callback(new Error('Cors not allowed'), false);
    }

    return callback(null, true);
  };

  private mountRoutes(): void {
    this.app.use('/projects', projectRouter);
    this.app.use('/users', userRouter);
  }
}

export const app = new App().app;
