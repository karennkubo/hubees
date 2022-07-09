import { BikeBusiness } from './../../business/BikeBusiness';
import { BikeController } from './../BikeController';
import express from 'express';
import { BikeData } from '../../data/BikeData';
import { IdGenerator } from '../../services/IdGenerator';

export const shopRouter = express.Router();

const bikeBusiness = new BikeBusiness (
    new BikeData(),
    new IdGenerator()
);

const bikeController = new BikeController(
    bikeBusiness
);

shopRouter.post("/bike", bikeController.addNewBike);
shopRouter.delete("/bike", bikeController.sellBike);
shopRouter.put("/bike/:id", bikeController.updatePriceFromBike);
shopRouter.get("/bike", bikeController.getBikes);

