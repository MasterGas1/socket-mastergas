import supertest = require("supertest")
import Server from "../server"

const PATH = '/api/v1'
const server = new Server()

describe('GET /seeder/roles', () => {
    it('should return 200 OK', async() => {
        const {statusCode} = await supertest(server.app).get(`${PATH}/seeder/roles`)

        expect(statusCode).toBe(200)
    })
})

describe('GET /seeder/admin', () => {
    it('should return 200 OK', async() => {
        const {statusCode} = await supertest(server.app).get(`${PATH}/seeder/admin`)

        expect(statusCode).toBe(200)
    })
})