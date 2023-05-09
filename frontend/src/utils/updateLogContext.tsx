import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import AuthContext from '../context/authProvider';
import { VehicleContext } from '../context/VehicleProvider';
import { LogContext, LogProvider } from '../context/logProvider';
import { useLog } from '../hooks/useLog';

/**
 * Provides functions for updating LogContext
 *
 * @param - none
 * @returns nothing
 */

export interface logObject {
	desc: string;
	dueMileage: number;
	vin: string;
}

const { logs, setLogs } = useLog([]);
const { hasDataFlag, setHasDataFlag } = useLog([]);
const { auth } = useContext(AuthContext);
const { vehicleList } = useContext(VehicleContext);

export const addLog = (log: logObject) => {
	setLogs(logs.concat(log));
};

export const deleteLog = (log: logObject) => {
	const newLogs = logs.filter((log: logObject) => log !== log);
	setLogs(newLogs);
};
