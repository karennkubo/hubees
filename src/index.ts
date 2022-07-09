import { shopRouter } from './controller/routes/shopRouter';
import { app } from "./controller/app";


app.use('/shop', shopRouter);