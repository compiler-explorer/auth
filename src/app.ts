import express, {NextFunction, Request, Response} from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import lusca from 'lusca';
import * as bodyParser from 'body-parser';
import expressSession from 'express-session';
import {authInit, loginRouter} from "./auth/login";
import {AppConfig} from "./config";

export function initialiseApp(config: AppConfig) {
    const externalFullUrl = new URL(`${(config.ServerScheme)}://${(config.ServerHostname)}:${(config.ExternalPort)}`).href;
    authInit(externalFullUrl, config);

    passport.serializeUser((user, cb) => {
        cb(null, user);
    });
    passport.deserializeUser((obj, cb) => {
        cb(null, obj);
    });

    const app = express();
    app.set('externalUrl', externalFullUrl);
    app.set('port', config.LocalPort);
    app.set('views', './views');
    app.set('view engine', 'pug')

    app.use(morgan('combined'));
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({extended: true}));
    // TODO: Warning: connect.session() MemoryStore is not Warning: connect.session() MemoryStore is
    //       not designed for a production environment, as it will leak memory, and will not scale past a single process.
    app.use(expressSession({secret: config.ExpressSecret, resave: true, saveUninitialized: true}));

    app.use(passport.initialize());
    app.use(passport.session());
// Some amount of voodoo here from https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/config/passport.ts
    app.use(lusca.xframe("SAMEORIGIN"));
    app.use(lusca.xssProtection(true));
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.set('Cache-Control', 'no-store'); // Cheesey solution, if solution it be.
        res.locals.user = req.user;
        next();
    });

    const renderOptions = {
        httpRoot: '/', // TODO really needed here?
    };
    app.get('/', (req: Request, res: Response) => {
        res.render('index', renderOptions);
    });
    app.get('/healthcheck', (req: Request, res: Response) => res.send("all ok"));
    app.use('/login', loginRouter(renderOptions));
    return app;
}
