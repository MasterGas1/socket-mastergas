/**
 * @swagger
 * tags:
 *   name: Seeder
 *   description: The seeder is to populate the database
 * /api/v1/seeder/roles:
 *   get:
 *     summary: Create all roles for the system
 *     tags: [Seeder]
 *     responses:
 *       200:
 *         description: Seeder excuted.
 *         schema: 
 *          type:json
 *       500:
 *         description: Some server error
 * /api/v1/seeder/type-service:
 *   get:
 *     summary: Create all type-service for the system
 *     tags: [Seeder]
 *     responses:
 *       200:
 *         description: Seeder excuted.
 *         schema:
 *          type:json
 *       500:
 *         description: Some server error
 */