import { useContext } from 'react';
import { LogContext } from '../context/logProvider';

/**
 * Streamlines the use of useContext(LogContext);
 *
 */

export const useLog = ([]) => {
	const log = useContext(LogContext);

	return log;
};
