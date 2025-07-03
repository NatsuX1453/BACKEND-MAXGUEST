import User from '../models/usermodels.js';

export const createUser = async (req, res) => {
	try {
		const createNewUser = await User.create(req.body);
		res.status(201).json(createNewUser);
	} catch (error) {
		res.status(400).json({
			message: 'Error: Hubo un error al crear su usuario. Inténtelo de nuevo',
			error: 'Client Error: Bad Request',
			status: '400',
		});
	}
};
