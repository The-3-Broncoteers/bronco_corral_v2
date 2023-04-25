import { NextFunction, Request, Response } from 'express';
import { getMaintenances } from '../services/carmd.services';

export const getMaintenanceInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vin = String(req.query.vin);
        const mileage = Number(req.query.mileage);

        const maintenances = await getMaintenances(vin, mileage);
        res.json(maintenances);
    } catch (error) {
        next(error);
    }
};