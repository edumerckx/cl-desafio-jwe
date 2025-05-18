import express from 'express';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';
import * as openapi from '../swagger.json';
import { checkEnvVars } from './validation';
import routes from './routes';

checkEnvVars();

const app = express();
app.use(express.json());

app.use('/', routes);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapi));

export default app;
