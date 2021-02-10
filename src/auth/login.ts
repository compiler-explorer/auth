import {Request, Response, Router} from 'express';
import {googleInit, googleRouter} from "./google";

export function authInit(serverFullUrl: string) {
    googleInit(serverFullUrl,  process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
}

export function loginRouter(renderOptions: { httpRoot: string }) {
    return Router()
        .get('/', (req: Request, res: Response) => {
            res.render('login', renderOptions);
        })
        .use('/google', googleRouter());
}
