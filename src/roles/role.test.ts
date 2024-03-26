import supertest from "supertest";
import Server from "../server";

const PATH = "/api/v1";
const server = new Server();

const rolePayload = {
    name: "kevin",
    permissions: ["create", "read", "update", "delete"],
}

const rolePayloadFailedField = {
    name: "Barrendero",
}

const rolePayloadFailedDatType = {
    name: 12345,
    permmissions: ["create", "read", "update", "delete"],
}

const rolePayloadNameSame = {
    name: 'admin',
    permmissions: ["create", "read", "update", "delete"],
}

describe('POST /role', () => {
    it('should return 400 if the user dont send nothing', async () => {
        const { statusCode, body } = await supertest(server.app)
            .post(`${PATH}/role`)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    });

    it("should return 400 if the user send one field left", async () => {
        const { statusCode, body } = await supertest(server.app)
            .post(`${PATH}/role`)
            .send(rolePayloadFailedField)

        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    });

    it('should return 400 if the user send wrong data type', async () => {
        const { statusCode, body } = await supertest(server.app)
            .post(`${PATH}/role`)
            .send(rolePayloadFailedDatType)

        expect(statusCode).toBe(400);
        expect(Array.isArray(body.data)).toBe(true);
    });

    it('shpuld return 400 if name already exist', async () => {
        const { statusCode, body } = await supertest(server.app)
            .post(`${PATH}/role`)
            .send(rolePayloadNameSame)
        
            expect(statusCode).toBe(400);
    });
});

describe('GET /role', () => {
    it('should return 200 OK request get roles', async () => {
        const { statusCode } = await supertest(server.app)
        .get(`${PATH}/role`)

        expect(statusCode).toBe(200)
    });
});

describe('PUT /role', () => {

});

describe('DELETE /role', () => {
    it('shpuld return 200 OK request delete role', async () => {
    const { statusCode } = await supertest(server.app)
        .delete(`${PATH}/role`)
        
        expect(statusCode).toBe(200)
    });
});