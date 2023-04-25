import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  margin-bottom: 16px;
  padding: 8px;
`;

const FormButton = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
`;

const MaintRequest = () => {
  const [responseData, setResponseData] = useState(null);
  const [vin, setVin] = useState('');
  const [mileage, setMileage] = useState('');

  const handleVinChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setVin(event.target.value);
  };

  const handleMileageChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setMileage(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get('http://localhost:3001/maintenance/maintenances', {
        params: {
          vin: vin,
          mileage: mileage,
        },
      });
      setResponseData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <FormContainer>
      <h1>Maintenance List</h1>
      <FormLabel htmlFor="vin">VIN:</FormLabel>
      <FormInput type="text" id="vin" value={vin} onChange={handleVinChange} />
      <FormLabel htmlFor="mileage">Mileage:</FormLabel>
      <FormInput type="text" id="mileage" value={mileage} onChange={handleMileageChange} />
      <FormButton onClick={handleSubmit}>Fetch Maintenance Data</FormButton>
      {responseData && (
        <div>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </FormContainer>
  );
};

export default MaintRequest;