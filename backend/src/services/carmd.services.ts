const axios = require('axios');

const authKey = 'ZDhhYzAxNzAtYWE0YS00MmE3LTkwZDUtYzMzYjY2YzQ5ZWY3';
const token = 'b3ebd4fae8f84950ab179693abe0204d';

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