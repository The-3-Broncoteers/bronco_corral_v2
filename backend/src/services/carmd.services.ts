const axios = require('axios');

const authKey = '';
const token = '';

export const getMaintenances = async (vin: number, mileage: number) => {
    const apiUrl = `https://api.carmd.com/v3.0/maint?vin=${vin}&mileage=${mileage}`;
    const response = await axios.get(apiUrl, {
        headers: {
            'content-type': 'application/json',
            'authorization': authKey,
            'partner-token': token
        }
    });
    return await response.data;
}