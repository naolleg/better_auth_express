import express from 'express';
import cors from 'cors';
import { PORT } from './src/config/secrete.js';
//import appRouter from './src/route/index.js';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/utils/auth.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.all("/api/auth/*", toNodeHandler(auth));
//app.use('/api',appRouter);
app.get('/', (req, res, next) => {
    return res.send('server is working');
});
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
