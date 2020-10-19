import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/HttpException';
import logger from './logger';

function requestLogger(req: Request, _res: Response, next: NextFunction): void {
    logger.info('Method:', req.method);
    logger.info('Path:  ', req.path);
    logger.info('Body:  ', req.body);
    logger.info('---');
    next();
}

function unknownEndpoint(_req: Request, res: Response): void {
    res.status(404).send({ error: 'unknown endpoint' });
}

function errorHandler(err: HttpException, _req: Request, res: Response, next: NextFunction): Response | void {
    logger.error(err.message);
    if (err.status) {
        return res.status(err.status).send({ error: err.message });
    }
    if (err.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' });
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
    }
    next(err);
}

export const middleware = { requestLogger, unknownEndpoint, errorHandler };
