export interface serviceProps{
    name: string,
    description: string,
    image?: string,
    type: 'root service' | 'subservice' | 'price',
    sub_service?:string,
    father_service?: string,
    price?:number
}