import "reflect-metadata";
import "@shared/container"
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import swaggerUi from 'swagger-ui-express';
import { AppError } from "@shared/errors/AppError";
import { router } from "./routes";
import createConnection from '@shared/infra/typeorm';

const app = express();
const port = 3333;

createConnection();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerUi));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message
        });
    }
    return res.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
});

app.listen(port, () => {
    console.log(`App listening on ${port} port in doker rentalx!`);
});

