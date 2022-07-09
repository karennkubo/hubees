import { InputVerifyBike } from './../types';
import { Bike } from "../model/Bike";
import { BaseDatabase } from "./BaseDatabase";

export class BikeData extends BaseDatabase {
    protected table_name = "Hubees_Shop";
    //Adicionando uma nova bicicleta no banco de dados:
    insert = async (bike: Bike) => {
        try {
            await BikeData
                .connection(this.table_name)
                .insert({
                    id: bike.getId(),
                    color: bike.getColor(),
                    gears: bike.getGears(),
                    brand: bike.getBrand(),
                    model: bike.getModel(),
                    price: bike.getPrice()
                });
        } catch (error: any) {
            let err = error.message || error.sqlMessage;
            throw new Error(err);
        }
    };
    //Verificando se a bicicleta já existe nesse banco de dados:
    verify = async (bike: InputVerifyBike) => {
        try {
            const product = await BikeData
                .connection(this.table_name)
                .select()
                .where({ color: bike.color, gears: bike.gears, brand: bike.brand, model:bike.model })
            return product;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    };
    //Selecionando uma bicicleta pelo seu id:
    find = async (id: string) => {
        try {
            const product = await BikeData
                .connection(this.table_name)
                .select()
                .where({ id })
            return product;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    };
    //Vendendo uma bicicleta - deletando-a do banco de dados:
    delete = async (id: string) => {
        try {
            await BikeData
                .connection(this.table_name)
                .delete()
                .where({ id })
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }
    //Alterar o preço de uma bicicleta
    update = async (id: string, price: number) => {
        try {
            await BikeData
                .connection(this.table_name)
                .update({ price })
                .where({ id });
            const bike = await BikeData
                .connection(this.table_name)
                .select()
                .where({ id });
            return bike;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }
    //Pegar todos os produtos
    get = async () => {
        try {
            const bikes: Bike[] = await BikeData
                .connection(this.table_name)
                .select(`*`);

            return bikes;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }
    //Filtrar produtos por cor
    getBikesByColor = async (color: string) => {
        try {
            const bikes: Bike[] = await BikeData
                .connection(this.table_name)
                .select(`*`)
                .where('color', 'LIKE', `%${color}%`);

            return bikes;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }
    //Ordenar produtos pelo preço
    orderBikesByPrice = async (order: string) => {
        try {
            const bikes = await BikeData
                .connection(this.table_name)
                .select(`*`)
                .orderBy("price", order);

            return bikes;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }
    //Ordenar produtos pelo preço
    filteringAndOrderingBikes = async (color:string, order: string) => {
        try {
            const bikes = await BikeData
                .connection(this.table_name)
                .select(`*`)
                .where('color', 'LIKE', `%${color}%`)
                .orderBy("price", order);

            return bikes;
        } catch (error: any) {
            let err = error.message || error.sqlMessage
            throw new Error(err)
        }
    }
}