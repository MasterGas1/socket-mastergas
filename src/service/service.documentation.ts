/**
 * @swagger
 * tags: 
 *  name: Service
 *  description: Service endpoints for the customer when they want to select a service, this is a tree structure
 * /api/v1/service:
 *    post:
 *      summary: Create a service
 *      tags: [Service]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  required:
 *                      - name
 *                      - description
 *                      - type
 *                      - image
 *                      - father_service
 *                      - sub_services
 *                      - price
 *                  properties:
 *                      name:
 *                          type: string
 *                      description:
 *                          type: string
 *                      type:
 *                          type: string
 *                      image:
 *                          type: string
 *                      father_service:
 *                          type: string
 *                      sub_services:
 *                          type: array
 *                      price:
 *                          type: number
 *                      available:
 *                          type: boolean
 *      responses:
 *          200:
 *              description: Service created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: json
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: json
 *          500:
 *              description: Server error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: json
 * 
 */