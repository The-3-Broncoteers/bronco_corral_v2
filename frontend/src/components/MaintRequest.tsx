import React, { useState, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { VehicleContext } from '../context/VehicleProvider';

const FormContainer = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	max-width: 400px;
	margin: 0 auto;
`;

const FormLabel = styled.label`
	margin-bottom: 8px;
`;

const FormInput = styled.input`
	max-width: 200px;
	margin-bottom: 16px;
	padding: 8px;
`;

const FormButton = styled.button`
	max-width: 200px;
	padding: 8px;
	background-color: #007bff;
	color: #fff;
	cursor: pointer;
`;

const Table = styled.table`
	border-collapse: collapse;
	width: 100%;
	max-width: 800px;
	margin: 16px 0;
	font-size: 14px;
`;

const TableHead = styled.thead`
	background-color: #007bff;
	color: #fff;
`;

const TableRow = styled.tr`
	border-bottom: 1px solid #ddd;
	&:last-child {
		border-bottom: none;
	}
`;

const TableCell = styled.td`
	padding: 5px;
	text-align: left;
`;

const MaintRequest = () => {
	const [responseData, setResponseData] = useState([]);
	const { selectedVehicle } = useContext(VehicleContext);
	const [mileage, setMileage] = useState(10000);

	const handleSubmit = async () => {
		try {
			const response = await axios.get('http://localhost:3001/api/maintenance/maintenances', {
				params: {
					vin: selectedVehicle?.vin,
					mileage: mileage,
				},
			});
			setResponseData(response.data.data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	return (
		<FormContainer>
			<FormLabel htmlFor='vin'>VIN:</FormLabel>
			<FormInput type='text' id='vin' value={selectedVehicle?.vin} disabled />
			<FormLabel htmlFor='mileage'>Mileage:</FormLabel>
			<FormInput
				type='text'
				id='mileage'
				value={mileage}
				onChange={(event) => setMileage(parseInt(event.target.value))}
			/>
			<FormButton onClick={handleSubmit}>Get Maintenance List</FormButton>
			{responseData.length > 0 && (
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Description</TableCell>
							<TableCell>Due Mileage</TableCell>
						</TableRow>
					</TableHead>
					<tbody>
						{responseData.map((maintenance, index) => (
							<TableRow key={index}>
								<TableCell>{maintenance['desc']}</TableCell>
								<TableCell>{maintenance['due_mileage']}</TableCell>
							</TableRow>
						))}
					</tbody>
				</Table>
			)}
		</FormContainer>
	);
};

export default MaintRequest;
