import { Application } from 'express';
import swaggerDocument from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { options } from './options';

const swaggerDocs = swaggerDocument(options)

const PATH = '/api/v1'

export const swaggerDoc = (app:Application, port:string) => {
    app.use(`${PATH}/api-docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocs))

    console.log(`Version 1 Doc are available at http://localhost:${port}/api/v1/api-docs`)
}