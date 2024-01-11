import express from 'express';
import statusMonitor from '../../src/index.js';

const app = express();

app.use(statusMonitor());

app.listen(4000);
