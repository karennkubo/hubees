import { Bike } from './../model/Bike';
import { InputBike, InputVerifyBike } from './../types';
import { BikeData } from './../data/BikeData';
import { IdGenerator } from './../services/IdGenerator';

export class BikeBusiness {
    constructor(
        private bikeData: BikeData,
        private idGenerator: IdGenerator
    ) { }
    //Cadastrando uma nova bicicleta:
    addingNewBike = async (inputBike: InputBike):Promise<Bike> => {
        const { color, gears, brand, model, price } = inputBike;
        //Se os dados não forem inseridos no body:
        if (!color || !gears || !brand || !model || !price) {
            throw new Error(`Preencha os campos de "color", "gears, "brand", "model" e "price" no body corretamente!`)
        }
        //Verificando se ela foi registrada no sistema:
        let inputVerifyBike: InputVerifyBike = {
            color,
            gears,
            brand,
            model
        }

        const bikeIsRegistered = await this.bikeData.verify(inputVerifyBike);
        if (bikeIsRegistered.length > 0) {
            throw new Error(`Esse produto já consta no nosso banco de dados.`)
        }

        //Verificando se gears e price são válidos:
        if (gears < 1 || isNaN(gears) || price < 1 || isNaN(price) || !Number.isInteger(gears)) {
            throw new Error(`Gears deve ser um número inteiro e price deve ser um número válido!`)
        }

        //Gerando um id para a operação:
        const id = this.idGenerator.generateId();

        //Criando o model de bike:
        const bike = new Bike(
            id,
            color,
            gears,
            brand,
            model,
            price
        )
        //Inserindo-o no banco de dados:
        await this.bikeData.insert(bike);

        return bike;
    }
    //Realizando uma venda do produto:
    sellingBike = async (id: string):Promise<Bike> => {
        //Verificando se o parâmetro foi passado:
        if (!id) {
            throw new Error(`Preencha o id da bike corretamente no body!`)
        }
        //Encontrando o produto:
        const [bike] = await this.bikeData.find(id);
        if (!bike) {
            throw new Error(`Esse produto não existe no nosso banco de dados!`)
        }
        //Deletando o produto:
        await this.bikeData.delete(id);

        return bike;
    }
    //Alterando o preço do  produto:
    updatingPrice = async (id: string, price: number):Promise<Bike[]> => {
        //Verificando se o parâmetro foi passado:
        if (!id) {
            throw new Error(`Preencha o id da bike corretamente nos parâmetros!`)
        }
        //Verificando se o preço foi passado:

        if (!price || isNaN(price)) {
            throw new Error(`Por favor, preencha o preço (como número) no body da requisição.`)
        }

        //Encontrando o produto:
        
        const [bike] = await this.bikeData.find(id);

        if (!bike) {
            throw new Error(`Esse produto não existe no nosso banco de dados!`)
        }
        //Atualizando-o:
        const updatedBike = await this.bikeData.update(id, price);

        return updatedBike;
    }
    //Listando todos os produtos:
    gettingAllBikes = async():Promise<Bike[]> => {
        //Listando os produtos
        const bikes = await this.bikeData.get();

        return bikes;
    }
    //Pegando produtos por cor:
    gettingAllBikesByColor = async(color:string):Promise<Bike[]> => {
        //Verificando se a cor foi passada!
        if (!color) {
            throw new Error("Por favor, informe a cor desejada na query da requisição")
        }
        //Listando os produtos filtrados:
        const bikes = await this.bikeData.getBikesByColor(color);
        //Verificando se produtos com essa característica foram encontrados:
        if(bikes.length<1){
            throw new Error(`Não foram encontrados produtos com a cor ${color}.`)
        }

        return bikes;
    }
    //Ordenando produtos pelo preço:
    orderingBikesByPrice = async(order:string):Promise<Bike[]> => {
        if (!order || order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC") {
            order = "DESC"
        }
        //Ordenando os produtos pelo preço
        const bikes = await this.bikeData.orderBikesByPrice(order);

        return bikes;
    }
    //Ordenando produtos pelo preço E selecionando-os pela cor:
    filteringAndOrderingBikes = async(color:string, order:string):Promise<Bike[]> => {
        if (!color) {
            throw new Error("Por favor, informe a cor desejada na query da requisição")
        }
        if (!order || order.toUpperCase() !== "ASC" && order.toUpperCase() !== "DESC") {
            order = "DESC"
        }
        //Ordenando os produtos pelo preço
        const bikes = await this.bikeData.filteringAndOrderingBikes(color,order);

        return bikes;
    }
}