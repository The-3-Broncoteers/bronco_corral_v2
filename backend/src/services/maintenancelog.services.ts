export const allVehicleInfo = async (auth: string) => {
	const vehicles = await db.userVehicle.findMany({
		where: {
			userEmail: auth,
		},
	});
	return vehicles;
};
