import express, {Request, Response, NextFunction, Router} from 'express';
import 'express-async-errors';
import cors from 'cors';


import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors())


app.use(router);
app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
    if(err instanceof Error) {
        // Se for uma instancia de um error
        return resp.status(400).json({
            error: err.message
        })
    }

    return resp.status(500).json({
        status: 'error',
        message: 'Interno server error'
    })
})


const PORT = process.env.PORT

app.listen(3333, () => {
    console.log(`Backend is running on port ${3333}`)
})