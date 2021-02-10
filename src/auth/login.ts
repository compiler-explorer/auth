import {Request, Response, Router} from 'express';
import {googleInit, googleRouter} from "./google";
import {AppConfig} from "../config";

export function authInit(serverFullUrl: URL, appConfig: AppConfig) {
    googleInit(serverFullUrl, appConfig.GoogleClientId, appConfig.GoogleClientSecret);
}

export function loginRouter(renderOptions: { httpRoot: string }) {
    return Router()
        .get('/', (req: Request, res: Response) => {
            res.render('login', renderOptions);
        })
        .use('/google', googleRouter());
}
