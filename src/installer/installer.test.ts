import supertest = require('supertest');
import Server from '../server';

const PATH = '/api/v1';
const server = new Server();

const installerPayload = {
  name: 'Kevin',
  lastName: 'Paez',
  email: 'kevin@gmail.com',
  password: 'kevin1234',
  installer: {
    address: '123 Main St',
    country: 'Mexico',
    city: 'CDMX',
    state: 'CDMX',
    rfc: 'ABC123456789',
    phoneNumber: '123-456-7890',
    website: 'https://newpage.mypage.com',
    employeesNumber: 10,
    yearsOfExperience: 5,
    physicalPerson: true,
    socialMedia: [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/newpage',
      },
    ],
    certifications: [
      {
        name: 'Certification 1',
      },
    ],
    securityCourses: [
      {
        name: 'Security Course 1',
      },
    ],
  },
};

const installerPayloadRfcSame = {
  name: 'Kevin',
  lastName: 'Paez',
  email: 'kevin@gmail.com',
  password: 'kevin1234',
  installer: {
    address: '123 Main St',
    country: 'Mexico',
    city: 'CDMX',
    state: 'CDMX',
    rfc: 'ABC123456789',
    phoneNumber: '123-456-7890',
    website: 'https://newpage.mypage.com',
    employeesNumber: 10,
    yearsOfExperience: 5,
    physicalPerson: true,
    socialMedia: [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/newpage',
      },
    ],
    certifications: [
      {
        name: 'Certification 1',
      },
    ],
    securityCourses: [
      {
        name: 'Security Course 1',
      },
    ],
  },
};

const installerPayloadFailedField = {
  name: 'Kevin',
  lastName: 'Paez',
  email: 'kevin@gmail.com',
  installer: {
    address: '123 Main St',
    country: 'Mexico',
    city: 'CDMX',
    state: 'CDMX',
    rfc: 'ABC123456789',
    phoneNumber: '123-456-7890',
    website: 'https://newpage.mypage.com',
    employeesNumber: 10,
    yearsOfExperience: 5,
    physicalPerson: true,
    socialMedia: [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/newpage',
      },
    ],
    certifications: [
      {
        name: 'Certification 1',
      },
    ],
    securityCourses: [
      {
        name: 'Security Course 1',
      },
    ],
  },
};

const installerPayloadFiledDataType = {
  name: 23423423423,
  lastName: 'Medrano Espinosa',
  email: 'mabg0610',
  password: 'Manu0610;',
  installer: {
    address: '123 Main St',
    country: 'Mexico',
    city: 'CDMX',
    state: 'CDMX',
    rfc: 'ABC123456789',
    phoneNumber: '123-456-7890',
    website: 'https://newpage.mypage.com',
    employeesNumber: 10,
    yearsOfExperience: 5,
    physicalPerson: true,
    socialMedia: [
      {
        name: 'Facebook',
        url: 'https://www.facebook.com/newpage',
      },
    ],
    certifications: [
      {
        name: 'Certification 1',
      },
    ],
    securityCourses: [
      {
        name: 'Security Course 1',
      },
    ],
  },
};

let token = '';

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

    token = body.data.token;

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
      .send(installerPayloadRfcSame);

    expect(statusCode).toBe(400);
  });
});

describe('GET /installer', () => {
  it('should return  401 when the toke is not valid', async () => {
    await supertest(server.app).get(`${PATH}/installer`).expect(401);
  });

  it('should return 200 OK request get installer', async () => {
    const { statusCode } = await supertest(server.app)
      .get(`${PATH}/installer`)
      .set({ Authorization: `Bearer ${token}` });

    expect(statusCode).toBe(200);
  });
});

describe('PUT /installer', () => {
  it('should return  401 when the toke is not valid', async () => {
    await supertest(server.app).put(`${PATH}/installer`).expect(401);
  });

  it.skip("should return 400 if the user don't send password", async () => {
    const { statusCode } = await supertest(server.app)
      .put(`${PATH}/installer`)
      .set({ Authorization: `Bearer ${token}` })
      .send({ name: 23423423423 });

    expect(statusCode).toBe(400);
  });

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
});

describe('DELETE /installer', () => {
  it('should return  401 when the toke is not valid', async () => {
    await supertest(server.app).delete(`${PATH}/installer`).expect(401);
  });

  it('should return 200 OK request delete installer', async () => {
    const { statusCode } = await supertest(server.app)
      .delete(`${PATH}/installer`)
      .set({ Authorization: `Bearer ${token}` });

    expect(statusCode).toBe(200);
  });
});
