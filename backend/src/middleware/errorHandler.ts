import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

const ERR_LOG_FILE = 'errLog.txt';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
	const message = `${err.name}: ${err.message}\t${req.ip}`;
	logger({ message, logName: ERR_LOG_FILE });
	console.error(err.stack);
	res.status(500).send(err.message);
};
