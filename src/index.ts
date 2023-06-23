import middlewareWrapper from './middleware-wrapper';

// export default middlewareWrapper; before push uncomment it and comment down

import express from 'express'

const app = express();

app.use(middlewareWrapper());

app.listen(4000)
