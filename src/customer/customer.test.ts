import supertest = require("supertest")
import Server from "../server"

const PATH = '/api/v1'
const server = new Server()

const customerPayload= {
    name:"Mayte",
    lastName: "Medrano Espinosa",
    email: "mabg0610.oficial@gmail.com",
    password: "Manu0610;",
    customer: {
        rfc: "MEEM2699909H",
        taxResidence: "Faro 2554"
    }
}

const customerPayloadRfcSame= {
    name:"Mayte",
    lastName: "Medrano Espinosa",
    email: "mabg0610.oficial1@gmail.com",
    password: "Manu0610;",
    customer: {
        rfc: "MEEM2699909H",
        taxResidence: "Faro 2554"
    }
}

const customerPayloadFailedField= {
    name:"Mayte",
    lastName: "Medrano Espinosa",
    email: "mabg0610.oficial@gmail.com",
    customer: {
        rfc: "MEEM2699909H",
        taxResidence: "Faro 2554"
    }
}

const customerPayloadFiledDataType= {
    name:23423423423,
    lastName: "Medrano Espinosa",
    email: "mabg0610",
    password: "Manu0610;",
    customer: {
        rfc: "MEEM2699909H",
        taxResidence: "Faro 2554"
    }
}

const customerSigInPayload = {
    email: "mabg0610.oficial@gmail.com",
    password: "Manu0610;"
}

const emptyCustomerSigInPayload = {}

const noPasswprdCustomerSigInPayload = {
    email: "mabg0610.oficial@gmail.com"
}

let token = ""

describe('POST /user/customers', () => {
    it('should return 400 if the user  dont send nothing', async() => {
        const {statusCode, body} = await supertest(server.app).post(`${PATH}/user/customer`)
        
        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })
    
    it('should return 400 if the user send one field left', async() => {
        const {statusCode,body} = await supertest(server.app).post(`${PATH}/user/customer`)
        .send(customerPayloadFailedField)
        
        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })
    
    it('should return 400 if the user send wrong data type', async() => {
        const {statusCode,body} = await supertest(server.app).post(`${PATH}/user/customer`)
        .send(customerPayloadFiledDataType)
        
        expect(statusCode).toBe(400)
        expect(Array.isArray(body.data)).toBe(true)
    })
    
    it('should return 200 OK should return token', async()=> {
        const {statusCode, body} = await supertest(server.app).post(`${PATH}/user/customer`)
        .send(customerPayload)
        
        token = body.data.token
        
        expect(statusCode).toBe(200)
    })

    it('should return 400 if email already exist', async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/user/customer`)
        .send(customerPayload)

        expect(statusCode).toBe(400)
    })

    it('should return 400 if rfc already exist', async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/user/customer`)
        .send(customerPayloadRfcSame)

        expect(statusCode).toBe(400)
    })
})

describe('POST /user/auth', () => {
    it("shpuld return 200 and a token", async() => {
        const {statusCode, body} = await supertest(server.app).post(`${PATH}/user/auth`)
        .send(customerSigInPayload)

        expect(statusCode).toBe(200)
        expect(body.data.token).toBeDefined()
    })

    it("should return 400 if the user is empty", async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/user/auth`)
        .send(emptyCustomerSigInPayload)
        
        expect(statusCode).toBe(400)
    })

    it("should return 400 if the user dont send password", async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/user/auth`)
        .send(noPasswprdCustomerSigInPayload)
        
        expect(statusCode).toBe(400)
    })

    it ("should return 400 if the email string is not valid", async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/user/auth`)
        .send({email: "mabg0610.oficial@gmailcom", password: "Manu0610;"})
        
        expect(statusCode).toBe(400)
    })

    it ("should return 400 if the password length is less than 7", async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/user/auth`)
        .send({email: "mabg0610.oficial@gmail.com", password: "Manu06"})
        
        expect(statusCode).toBe(400)
    })

    it("should return 401 if the password is wrong", async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/user/auth`)
        .send({email: "mabg0610.oficial@gmail.com", password: "Manu0610hasj;"})
        
        expect(statusCode).toBe(401)
    })

    it("should return 401 if the user dont exist", async() => {
        const {statusCode} = await supertest(server.app).post(`${PATH}/user/auth`)
        .send({email: "mabg.oficial@gmail.com", password: "Manu0610;"})
        
        expect(statusCode).toBe(401)
    })

})

describe('GET /customer', ()=> {
    it("should return  401 when the toke is not valid", async() => {
        await supertest(server.app).get(`${PATH}/customer`).expect(401)
    })

    it("should return 200 OK request get customer", async()=> {
        const {statusCode} = await supertest(server.app).get(`${PATH}/customer`)
        .set({Authorization: `Bearer ${token}`})

        expect(statusCode).toBe(200)
    })
})

describe('PUT /customer', ()=> {
    it("should return  401 when the toke is not valid", async() => {
        await supertest(server.app).put(`${PATH}/customer`).expect(401)
    })

    it('should return 400 if the user dont send password', async() => {
        const {statusCode} = await supertest(server.app).put(`${PATH}/customer`)
        .set({Authorization: `Bearer ${token}`})
        .send({name: 23423423423})

        expect(statusCode).toBe(400)
    })

    it('should return 400 if the user send wrong data type', async() => {
        const {statusCode} = await supertest(server.app).put(`${PATH}/customer`)
        .set({Authorization: `Bearer ${token}`})
        .send({password: "Manu0610;", name: 23423423423})

        expect(statusCode).toBe(400)
    })

    it('should return 401 if the password is wrong', async() => {
        const {statusCode} = await supertest(server.app).put(`${PATH}/customer`)
        .set({Authorization: `Bearer ${token}`})
        .send({password: "Manu0610hasj;", name: "Kevin"})

        expect(statusCode).toBe(401)
    })

    it('should return 400 if the email already exist', async() => {
        const {statusCode} = await supertest(server.app).put(`${PATH}/customer`)
        .set({Authorization: `Bearer ${token}`})
        .send({password: "Manu0610;", email: "mabg0610.oficial@gmail.com"})

        expect(statusCode).toBe(400)
    })

    it('should return 400 if the rfc already exist', async() => {
        const {statusCode} = await supertest(server.app).put(`${PATH}/customer`)
        .set({Authorization: `Bearer ${token}`})
        .send({password: "Manu0610;", rfc: "MEEM2699909H"})

        expect(statusCode).toBe(400)
    })

    it('should return 200 OK request update customer', async()=> {
        const {statusCode} = await supertest(server.app).put(`${PATH}/customer`)
        .set({Authorization: `Bearer ${token}`})
        .send({password: "Manu0610;", name: "Mayte1"})

        expect(statusCode).toBe(200)
    })
})

describe('DELETE /customer', ()=> {
    it("should return  401 when the toke is not valid", async() => {
        await supertest(server.app).delete(`${PATH}/customer`).expect(401)
    })

    it('should return 200 OK request delete customer', async()=> {
        const {statusCode} = await supertest(server.app).delete(`${PATH}/customer`)
        .set({Authorization: `Bearer ${token}`})
        
        expect(statusCode).toBe(200)
    })
})

