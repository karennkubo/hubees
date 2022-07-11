import { InputBike } from './../types';
import { Request, Response } from 'express';
import { BikeBusiness } from "../business/BikeBusiness";

export class BikeController {
    constructor(
        private bikeBusiness: BikeBusiness
    ) { };
    //endpoint para criar um novo produto
    addNewBike = async (req: Request, res: Response) => {
        const { color, gears, brand, model, price } = req.body;

        const input: InputBike = {
            color,
            gears,
            brand,
            model,
            price
        };

        try {
            const product = await this.bikeBusiness.addingNewBike(input);
            const message = `Produto adicionado com sucesso!`;
            res.status(201).send({ message, product });

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message)
            } else {
                res.status(500).send(`Erro no cadastro do produto`)
            }
        }
    };
    //endpoint para vender o produto
    sellBike = async (req: Request, res: Response) => {
        const id = req.body.id as string;

        try {
            const product = await this.bikeBusiness.sellingBike(id);
            const message = `Produto deletado com sucesso com sucesso!`;
            res.status(200).send({ message, product })
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message)
            } else {
                res.status(500).send(`Erro ao fazer a requisição de vender o produto`)
            }
        }
    };
    //endpoint para atualizar o preço
    updatePriceFromBike = async (req: Request, res: Response) => {
        const id = req.params.id as string;
        const price = req.body.price as number;

        try {
            const product = await this.bikeBusiness.updatingPrice(id, price);
            const message = `Preço do produto alterado com sucesso com sucesso!`;
            res.status(200).send({ message, product })
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message)
            } else {
                res.status(500).send(`Erro ao alterar o preço!`)
            }
        }
    };
    //endpoint para listar todos os produtos (podendo-filtrá-los e ordená-los)
    getBikes = async (req: Request, res: Response) => {
        const color = req.query.color as string;
        const order = req.query.order as string;

        try {
            if (!color && !order) {
                const products = await this.bikeBusiness.gettingAllBikes();
                res.status(200).send({ products });
            } else if (color && !order) {
                const products = await this.bikeBusiness.gettingAllBikesByColor(color);
                res.status(200).send({ products });
            } else if (!color && order) {
                const products = await this.bikeBusiness.orderingBikesByPrice(order);
                res.status(200).send({ products });
            } else {
                const products = await this.bikeBusiness.filteringAndOrderingBikes(color, order);
                res.status(200).send({ products }); 
            }

        } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message)
            } else {
                res.status(500).send(`Erro ao listar os produtos!`)
            }
        }
    };
}
