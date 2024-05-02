import supertest = require('supertest');
import Server from '../server';

const PATH = '/api/v1';
const ENDPOINTUSER = `${PATH}/user`;

const server = new Server();

const addressPayload = {
    name: "Casa de departamento",
    addressName: "prueba2",
    coords: {
        "latitude": 1234,
        "longitude": 4321
    }
}

const addressPayloadMissingField = {
    addressName: "prueba2",
    coords: {
        "latitude": 1234,
        "longitude": 4321
    }
}

const addressPayloadWrongDatatype = {
    name: 123,
    addressName: "prueba2",
    coords: {
        "latitude": 1234,
        "longitude": 4321
    }
}

let idUser = "660f3c208583cc309fc01cf2"

describe('POST /user/add-address/:id', () => {
    it('should return a 400 if the id is not a uuid', async () => {
        const { statusCode } = await supertest(server.app).post(`${ENDPOINTUSER}/add-address/asdsadsada`)

        expect(statusCode).toBe(400)
    })
    it('should return 400 if the user dont send nothing', async () => {
        const { statusCode, body } = await supertest(server.app)
            .post(`${ENDPOINTUSER}/add-address/${idUser}`)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })
    it('should return 400 if the user send one field left', async () => {
        const { statusCode, body } = await supertest(server.app)
            .post(`${ENDPOINTUSER}/add-address/${idUser}`)
            .send(addressPayloadMissingField)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })
    it('should return 400 if the user send wrong data type', async () => {
        const { statusCode, body } = await supertest(server.app)
            .post(`${ENDPOINTUSER}/add-address/${idUser}`)
            .send(addressPayloadWrongDatatype)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })
    it('should return 200 if address is added', async () => {
        const { statusCode, body } = await supertest(server.app)
            .post(`${ENDPOINTUSER}/add-address/${idUser}`)
            .send(addressPayload)

        console.log('body 200', body)
        console.log('statusCode 200', statusCode)

        expect(statusCode).toBe(200)
    })
})