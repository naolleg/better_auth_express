import express from 'express';
import cors from 'cors';
import  {HOST, PORT}  from './src/config/secrete.js';
//import appRouter from './src/route/index.js';
import { toNodeHandler } from "better-auth/node";
import { auth } from "./src/utils/auth.js";
import router from './src/routes/route.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

import { log } from 'console';
app.use('/api/auth', router);
app.all("/api/auth/*", (req, res, next) => {
   console.log('toNodeHandler middleware called');
   console.log('Request object:', req);
   toNodeHandler(auth)(req, res);
 });

app.get('/',(req,res,next)=>{
   return res.send('server is working');
});

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));