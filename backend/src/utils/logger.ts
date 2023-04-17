import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import { promises as fsPromises, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const LOGS_DIR = join(__dirname, '../..', 'logs');

interface LogEventParams {
	message: string;
	logName: string;
}

export const logger = async ({ message, logName }: LogEventParams): Promise<void> => {
	const dateTime = `${format(new Date(), 'MM/dd/yyyy\tHH:mm:ss')}`;
	const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

	try {
		if (!existsSync(LOGS_DIR)) {
			mkdirSync(LOGS_DIR);
		}

		await fsPromises.appendFile(join(LOGS_DIR, logName), logItem);
	} catch (err) {
		console.error(err);
	}
};
