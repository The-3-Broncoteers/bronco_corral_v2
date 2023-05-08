import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

const REQ_LOG_FILE = 'reqLog.txt';

export const eventLogger = (req: Request, res: Response, next: NextFunction): void => {
	const message = `${req.method}\t${req.headers.origin}\t${req.url}\t${req.ip}`;
	logger({ message, logName: REQ_LOG_FILE });
	next();
};
