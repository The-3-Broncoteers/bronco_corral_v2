import { useContext } from 'react';
import { LogContext } from '../context/logProvider';

export const useLog = () => {
	const log = useContext(LogContext);

	return log;
};
