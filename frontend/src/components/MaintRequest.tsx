import { useEffect, useState } from 'react';
import axios from 'axios';

interface Maintenance {
  id: number;
  description: string;
  dueMileage: number;
}

const MaintRequest = () => {
  const [maintenanceData, setMaintenanceData] = useState<Maintenance[]>([]);

  useEffect(() => {
    const fetchMaintenanceData = async () => {
      try {
        const response = await axios.get('/maintenance/maintenances');
        setMaintenanceData(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchMaintenanceData();
  }, []);

  return (
    <div>
      <h1>Maintenance List</h1>
      <ul>
        {maintenanceData.map(maintenance => (
          <li key={maintenance.id}>
            <h3>Description: {maintenance.description}</h3>
            <p>Due Mileage: {maintenance.dueMileage}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintRequest;