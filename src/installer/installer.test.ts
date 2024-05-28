import supertest = require('supertest');
import Server from '../server';

const PATH = '/api/v1';
const server = new Server();

const installerPayload = {
  name: 'Kevin',
  lastName: 'Paez',
  email: 'kevin@gmail.com',
  rfc: 'ABC123456789',
  installer: {
    companyName: "My Company",
    phoneNumber: '1234567890',
    IMSSNumber: 12345678901,
    employeesNumber: 10,
    webSite: 'https://newpage.mypage.com',
    ownOffice: true,
    ownVehicle: false,
    address: '123 Main St',
    state: 'CDMX',
    city: 'CDMX',
    specializedTools: "Herramienta",
    yearsExperience: 5,
    certifications: "Certificación",
    securityCourses: "Curso de seguridad",    
  },
};

const installerPayloadRFCSame = {
  name: 'Kevin',
  lastName: 'Paez',
  email: 'kevin@gmail.com',
  rfc: 'ABC123456789',
  installer: {
    companyName: "My Company",
    phoneNumber: '1234567890',
    IMMSNumber: 1234567890,
    employeesNumber: 10,
    website: 'https://newpage.mypage.com',
    ownOffice: true,
    ownVehicle: false,
    address: '123 Main St',
    state: 'CDMX',
    city: 'CDMX',
    specializedTools: "Herramienta",
    yearsExperience: 5,
    certifications: "Certificación",
    securityCourses: "Curso de seguridad",    
  },
};

const installerPayloadFailedField = {  
  name: 'Kevin',
  lastName: 'Paez',
  email: 'kevin@gmail.com',
  installer: {
    companyName: "My Company",
    phoneNumber: '1234567890',
    IMMSNumber: 1234567890,
    employeesNumber: 10,
    website: 'https://newpage.mypage.com',
    ownOffice: true,
    ownVehicle: false,
    address: '123 Main St',
    state: 'CDMX',
    city: 'CDMX',
    specializedTools: "Herramienta",
    yearsExperience: 5,
    securityCourses: "Curso de seguridad",    
  },
};

const installerPayloadFiledDataType = {
  name: 'Kevin',
  lastName: 'Paez',
  email: 'kevin@gmail.com',
  rfc: 34543543,
  installer: {
    companyName: "My Company",
    phoneNumber: '1234567890',
    IMMSNumber: 1234567890,
    employeesNumber: 10,
    website: 'https://newpage.mypage.com',
    ownOffice: true,
    ownVehicle: 43,
    address: '123 Main St',
    state: 'CDMX',
    city: 'CDMX',
    specializedTools: "Herramienta",
    yearsExperience: 5,
    certifications: "Certificación",
    securityCourses: "Curso de seguridad",    
  },
};

let id = ""

describe('POST installer', () => {
  it("should return 400 if the user  don't send nothing", async () => {
    const { statusCode, body } = await supertest(server.app).post(
      `${PATH}/installer`
    );

    expect(statusCode).toBe(400);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('should return 400 if the user send one field left', async () => {
    const { statusCode, body } = await supertest(server.app)
      .post(`${PATH}/installer`)
      .send(installerPayloadFailedField);

    expect(statusCode).toBe(400);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('should return 400 if the user send wrong data type', async () => {
    const { statusCode, body } = await supertest(server.app)
      .post(`${PATH}/installer`)
      .send(installerPayloadFiledDataType);

    expect(statusCode).toBe(400);
    expect(Array.isArray(body.data)).toBe(true);
  });

  it('should return 200 OK should return token', async () => {
    const { statusCode, body } = await supertest(server.app)
      .post(`${PATH}/installer`)
      .send(installerPayload);

    expect(statusCode).toBe(200);
  });

  it('should return 400 if email already exist', async () => {
    const { statusCode } = await supertest(server.app)
      .post(`${PATH}/installer`)
      .send(installerPayload);

    expect(statusCode).toBe(400);
  });

  it('should return 400 if rfc already exist', async () => {
    const { statusCode } = await supertest(server.app)
      .post(`${PATH}/installer`)
      .send(installerPayloadRFCSame);

    expect(statusCode).toBe(400);
  });
});

// describe('PUT /installer', () => {
//   it('should return  401 when the toke is not valid', async () => {
//     await supertest(server.app).put(`${PATH}/installer`).expect(401);
//   });

//   it.skip("should return 400 if the user don't send password", async () => {
//     const { statusCode } = await supertest(server.app)
//       .put(`${PATH}/installer`)
//       .set({ Authorization: `Bearer ${token}` })
//       .send({ name: 23423423423 });

//     expect(statusCode).toBe(400);
//   });

  // it('should return 400 if the user send wrong data type', async () => {
  //   const { statusCode } = await supertest(server.app)
  //     .put(`${PATH}/installer`)
  //     .set({ Authorization: `Bearer ${token}` })
  //     .send({ password: 'kevin1234', name: 23423423423 });

  //   expect(statusCode).toBe(400);
  // });

  // it('should return 401 if the password is wrong', async () => {
  //   const { statusCode } = await supertest(server.app)
  //     .put(`${PATH}/installer`)
  //     .set({ Authorization: `Bearer ${token}` })
  //     .send({ password: 'Manu0610hasj;', name: 'Kevin' });

  //   expect(statusCode).toBe(401);
  // });

  // it('should return 400 if the email already exist', async () => {
  //   const { statusCode } = await supertest(server.app)
  //     .put(`${PATH}/installer`)
  //     .set({ Authorization: `Bearer ${token}` })
  //     .send({ password: 'kevin1234', email: 'kevin@gmail.com' });

  //   expect(statusCode).toBe(400);
  // });

  // it('should return 400 if the rfc already exist', async () => {
  //   const { statusCode } = await supertest(server.app)
  //     .put(`${PATH}/installer`)
  //     .set({ Authorization: `Bearer ${token}` })
  //     .send({ password: 'kevin1234', rfc: 'ABC123456789' });

  //   expect(statusCode).toBe(400);
  // });

  // it('should return 200 OK request update installer', async () => {
  //   const { statusCode } = await supertest(server.app)
  //     .put(`${PATH}/installer`)
  //     .set({ Authorization: `Bearer ${token}` })
  //     .send({ password: 'kevin1234', name: 'Meliodas' });

  //   expect(statusCode).toBe(200);
  // });

describe('GET /installers', () => {
  it('should return 200 OK request get installers pending', async () => {
    const { statusCode,body } = await supertest(server.app)
      .get(`${PATH}/installer?pending=true`)

    id = body[0]._id

    expect(statusCode).toBe(200);
  })
})

describe('GET /installer', () => {
  it('should return  400 when the id is not valid in URL', async () => {
    await supertest(server.app).get(`${PATH}/installer/asd2342dsfs`).expect(400);
  });

  it('should return 200 OK request get installer', async () => {
    const { statusCode } = await supertest(server.app)
      .get(`${PATH}/installer/${id}`)

    expect(statusCode).toBe(200);
  });
});


describe('DELETE /installer', () => {
  it('should return  400 when the id is not valid in URL', async () => {
    await supertest(server.app).delete(`${PATH}/installer/asd2342dsfs`).expect(400);
  });

  it('should return 200 OK request delete installer', async () => {
    const { statusCode } = await supertest(server.app)
      .delete(`${PATH}/installer/${id}`)

    expect(statusCode).toBe(200);
  });
});
