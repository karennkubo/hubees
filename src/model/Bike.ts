export class Bike {
    constructor(
        private id:string,
        private color:string,
        private gears:number,
        private brand:string,
        private model:string,
        private price:number
    ){}

    public getId = ():string => {
        return this.id;
    }
    public getColor = ():string => {
        return this.color;
    }
    public getGears = ():number => {
        return this.gears;
    }
    public getBrand = ():string => {
        return this.brand;
    }
    public getModel = ():string => {
        return this.model;
    }
    public getPrice = ():number => {
        return this.price;
    }
}
