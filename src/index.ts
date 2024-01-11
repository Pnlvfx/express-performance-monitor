import express from 'express';
import middlewareWrapper from './middleware-wrapper.js';

const app = express();

app.use(middlewareWrapper());

app.listen(4000);

export { default } from './middleware-wrapper.js';
