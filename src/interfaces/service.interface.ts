export interface serviceInterface{
    name: string,
    description: string,
    image?: string,
    type: 'root service' | 'subservice' | 'price',
    subServices?:string,
    fatherService?: string,
    price?:number,
    available?:boolean
}