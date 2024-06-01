import supertest = require("supertest")
import Server from "../server"
import mongoose, { Mongoose } from "mongoose"

const PATH = '/api/v1'
const ENDPOINTORDER = `${PATH}/order`;
const server = new Server()

const orderPayload = {
    serviceId: '6610a4fb34ff6daad92a64a1',
    installerUserId: '66561cecbcc8f363b5c54547',
    customerUserId: '66561cedbcc8f363b5c5454a',
    price: 200,
    state: 'proccess',
}

const orderPayloadFailedField = {
    serviceId: '6610a4fb34ff6daad92a64a1',
    installerUserId: '66561cecbcc8f363b5c54547',
    customerUserId: '66561cedbcc8f363b5c5454a',
    state: 'proccess',
}

const orderPayloadFailedDatType = {
    serviceId: '6610a4fb34ff6daad92a64a1',
    installerUserId: '66561cecbcc8f363b5c54547',
    customerUserId: '66561cedbcc8f363b5c5454a',
    price: true,
    state: 'proccess',
}

describe('POST /order', () => {
    it('should return 400 if the user dont send nothing', async () => {
        const { statusCode, body } = await supertest(server.app).post(`${ENDPOINTORDER}`)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })

    it('should return 400 if the user send one field left', async () => {
        const { statusCode, body } = await supertest(server.app).post(`${ENDPOINTORDER}`)
            .send(orderPayloadFailedField)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })

    it('should return 400 if the user send wrong data type', async () => {
        const { statusCode, body } = await supertest(server.app).post(`${ENDPOINTORDER}`)
            .send(orderPayloadFailedDatType)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })

    it('should return 200 OK should return order created', async () => {
        const { statusCode, body } = await supertest(server.app).post(`${ENDPOINTORDER}`)
            .send(orderPayload)

        expect(statusCode).toBe(200)
    })
});