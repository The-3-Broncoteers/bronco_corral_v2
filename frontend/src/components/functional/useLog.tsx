import React, { useContext, useEffect, useState } from 'react';
import logContext from '../../context/logProvider';
import axios from 'axios';
import AuthContext from '../../context/authProvider';
import { VehicleContext } from '../../context/VehicleProvider';
import LogContext, { logProvider } from '../../context/logProvider';

/**
 * Accesses user vehicle id's from VehicleContext,
 * then queries db to add logs to LogContext
 * @param - none
 * @returns nothing
 */

interface logObject {
	desc: string;
	dueMileage: number;
	vin: string;
}

const Logs = () => {
	const { logs, setLogs } = useContext(LogContext);
	const { hasDataFlag, setHasDataFlag } = useContext(LogContext);
	const { auth } = useContext(AuthContext);
	const { vehicleList } = useContext(VehicleContext);

	const addLog = (log: logObject) => {
		setLogs(logs.concat(log));
	};

	useEffect(() => {
		console.log('log test');
		const updateLogContext = async () => {
			if (hasDataFlag == false) {
				for (let i = 0; i < vehicleList.length; i++) {
					const id = vehicleList[i].id;
					const vin = vehicleList[i].vin;
					try {
						let res = await axios.get('/maintenance', {
							params: {
								id: id,
							},
						});

						const resData: logObject = {
							desc: res.data.desc,
							dueMileage: res.data.dueMileage,
							vin: vin,
						};
						addLog(resData);
					} catch (error) {
						console.log(error);
					}
				}
				setHasDataFlag(true);
				console.log(logs);
			}
		};
		updateLogContext();
	}, []);
};
