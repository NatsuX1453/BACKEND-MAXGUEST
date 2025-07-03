import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { routerUser } from './src/routes/user.routes.js';
import { DBStart } from './src/config/database.js';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', routerUser);

DBStart().then(() => {
	app.listen(process.env.PORT, () => {
		console.log('Escuchando en el puerto 3000');
	});
});
