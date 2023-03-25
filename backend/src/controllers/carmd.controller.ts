import { NextFunction, Request, Response } from 'express';
import { getMaintenances } from '../services/carmd.services';

export const getMaintenanceInfo = async (req: Request, res: Response, next: NextFunction) => {

    const maintenances = await getMaintenances(Number(req.params.vin), Number(req.params.mileage));
    res.json(maintenances);
};