import 'dotenv/config.js';
import path from 'path';
import express from 'express';
import cors from 'cors';
import Pino from 'pino';
import { buildRouter } from './routes.js';

const logger = Pino({ level: 'info' });
const app = express();

app.use(cors());
app.use(express.static(path.resolve('public')));
app.use('/api', buildRouter(process.env));

// Root -> UI
app.get('/', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => logger.info(`DMS Panel running on :${PORT}`));