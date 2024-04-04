import supertest = require("supertest")
import Server from "../server"
import mongoose, { Mongoose } from "mongoose"

const PATH = '/api/v1'
const server = new Server()

//Create service
const servicePayloadRootFather= {
    name: "Moto",
    description: "Moto super rapida",
    type: "root service",
}

const servicePayloadSendSubService = {
    name: "Moto Extra",
    description: "Moto super rapida extra",
    type: "subservice",
    fatherService: ""
}

const servicePayloadSendPrice = {
    name: "Moto Extra",
    description: "Moto super rapida extra",
    type: "price",
    fatherService: "",
    price: 100
}

const servicePayloadUpdate = {
    name: "Moto Actualizado",
    description: "Moto super rapida actualizado",
}

const servicePayloadFailedField = {
    name: "Moto",
    description: "Moto super rapida",
}

const servicePayloadFailedTypeField = {
    name: "Moto",
    description: "Moto super rapida",
    type: "failed"
}

const servicePayloadFailedDataTypeField = {
    name: "Moto",
    description: true,
    type: "root service",
}

const servicePayloadFatherServiceFailed = {
    name: "Moto Extra",
    description: "Moto super rapida extra",
    type: "root service",
    fatherService: new mongoose.Types.ObjectId()
}

const servicePayloadSubServiceNotFoundFatherService = {
    name: "Moto Extra",
    description: "Moto super rapida extra",
    type: "subservice",
    fatherService: new mongoose.Types.ObjectId()
}

const servicePayloadPriceHaveSubService = {
    name: "Moto Extra",
    description: "Moto super rapida extra",
    type: "subservice",
    fatherService: ""
}

const servicePayloadPriceDontHavePrice = {
    name: "Moto Extra",
    description: "Moto super rapida extra",
    type: "price",
    fatherService: ""
}

let idService = ""


describe('POST /service', () => {
    it('should return 400 if the user  dont send nothing', async() => {
        const {statusCode, body} = await supertest(server.app).post(`${PATH}/service`)
        
        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })

    it('should return 400 if the user send one field left', async() => {
        const {statusCode,body} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadFailedField)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })

    it('should return 400 if the user send wrong type field', async() => {
        const {statusCode,body} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadFailedTypeField)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })

    it ('should return 400 if the user send wrong data type', async() => {
        const {statusCode,body} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadFailedDataTypeField)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })
    
    it('should return 400 if root father received father service id', async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadFatherServiceFailed)

        expect(statusCode).toBe(400)
    })

    it('should return 200 OK should return service created', async()=> {
        const {statusCode, body} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadRootFather)

        servicePayloadSendSubService.fatherService = body._id
        
        idService = body._id


        expect(statusCode).toBe(200)
    })

    it('should return 400 if the father service is repeated', async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadRootFather)

        expect(statusCode).toBe(400)
    })

    it('should return 400 if subservice not found father service', async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadSubServiceNotFoundFatherService)

        expect(statusCode).toBe(400)
    })

    it('should return 200 return subservice', async() => {
        const {statusCode, body} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadSendSubService)

        servicePayloadSendPrice.fatherService = body.service._id

        expect(statusCode).toBe(200)
    })

    it('should return 400 if subservice is repeated', async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadSendSubService)

        expect(statusCode).toBe(400)
    })

    it('should return 400 if price dont have price', async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadPriceDontHavePrice)

        expect(statusCode).toBe(400)
    })

    it('should return 200 return price', async() => {
        const {statusCode, body} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadSendPrice)

        servicePayloadPriceHaveSubService.fatherService = body.service._id

        expect(statusCode).toBe(200)
    })

    it('should return 400 if price is repeated', async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadSendPrice)

        expect(statusCode).toBe(400)
    })

    it('should return 400 if price have sub service', async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/service`)
        .send(servicePayloadPriceHaveSubService)

        expect(statusCode).toBe(400)
    })
})

describe('GET /service', ()=> {
    it('should return 200 OK should return services', async()=> {
        const {statusCode, body} = await supertest(server.app).get(`${PATH}/service`)

        expect(statusCode).toBe(200)
        expect(Array.isArray(body)).toBe(true)
        expect(body.length).toBeGreaterThan(0)
    })
})

describe('GET /service/:id', ()=> {
    it('should return 400 if the id is not uuid', async() => {
        const {statusCode} = await supertest(server.app).get(`${PATH}/service/asdsadsada`)

        expect(statusCode).toBe(400)

    })

    it('should return 404 if the service dont exist', async() => {
        const {statusCode} = await supertest(server.app).get(`${PATH}/service/${new mongoose.Types.ObjectId()}`)

        expect(statusCode).toBe(404)

    })

    it('should return 200 OK should return service', async()=> {
        const {statusCode, body} = await supertest(server.app).get(`${PATH}/service/${idService}`)

        expect(statusCode).toBe(200)
        expect(body._id).toBe(idService)
    })
})

describe('PUT /service/:id', ()=> {
    it('should return 400 if the id is not uuid', async() => {
        const {statusCode} = await supertest(server.app).put(`${PATH}/service/asdsadsada`)

        expect(statusCode).toBe(400)
    })

    it('should return 404 if the service dont exist', async() => {
        const {statusCode} = await supertest(server.app).put(`${PATH}/service/${new mongoose.Types.ObjectId()}`)

        expect(statusCode).toBe(404)
    })

    it('should return 200 OK should return service updated', async()=> {
        const {statusCode, body} = await supertest(server.app).put(`${PATH}/service/${idService}`)
        .send(servicePayloadUpdate)

        expect(statusCode).toBe(200)
    })
})

describe('DELETE /service', ()=> {
    it('should return 400 if the id is not uuid', async() => {
        const {statusCode} = await supertest(server.app).delete(`${PATH}/service/asdsadsada`)

        expect(statusCode).toBe(400)
    })

    it('should return 200 OK should return service deleted message', async()=> {
        const {statusCode} = await supertest(server.app).delete(`${PATH}/service/${idService}`)

        expect(statusCode).toBe(200)
    })

    it('should return 404 if the service dont exist', async() => {
        const {statusCode} = await supertest(server.app).delete(`${PATH}/service/${idService}`)

        expect(statusCode).toBe(404)
    })
})