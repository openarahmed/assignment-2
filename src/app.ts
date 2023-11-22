import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { UsersRoute } from './app/module/users/users.route';

app.use(express.json());
app.use(cors());

app.use('/api', UsersRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

export default app;
