import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    query: req.query,
    params: req.params,
    ip: req.ip,
  });
  next();
};

export default logRequest;