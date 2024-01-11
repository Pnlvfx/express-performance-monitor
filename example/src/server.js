import express from 'express';
import statusMonitor from '../../dist/esm/index.js';

const app = express();

app.use(statusMonitor());

app.listen(4000);
