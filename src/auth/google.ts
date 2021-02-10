import {Request, Response, Router} from 'express';
import passport from "passport";
import {Strategy, VerifyCallback} from "passport-google-oauth2";

export function googleInit(serverFullUrl: URL, clientID: string, clientSecret: string) {
    passport.use(
        new Strategy(
            {
                clientID: clientID,
                clientSecret: clientSecret,
                // TODO: this is ugly special knowledge of where things mount
                callbackURL: `${serverFullUrl}login/google/callback`
            },
            (accessToken: string, refreshToken: string, profile: any, cb: VerifyCallback) => {
                // console.log("Ooh", accessToken, refreshToken, profile);
                cb(null, profile);
                // User.findOrCreate({});
            }));
}

export function googleRouter() {
    return Router()
        .get('/', passport.authenticate('google', {scope: ['profile']}))
        .get('/callback',
            // TODO: this is ugly special knowledge of where things mount
            passport.authenticate('google', {failureRedirect: '/login'}),
            (req: Request, res: Response) => {
                res.redirect('/');
            });
}
