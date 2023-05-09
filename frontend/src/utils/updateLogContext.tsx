import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useLog } from '../hooks/useLog';

/**
 * Provides functions for updating LogContext
 *
 * @param - none
 * @returns null
 */

export interface logObject {
	desc: string;
	dueMileage: number;
	vin: string;
}

const { logs, setLogs } = useLog([]);
const { hasDataFlag, setHasDataFlag } = useLog([]);

export const addLog = (log: logObject) => {
	setLogs(logs.concat(log));
};

export const deleteLog = (log: logObject) => {
	const newLogs = logs.filter((log: logObject) => log !== log);
	setLogs(newLogs);
};
