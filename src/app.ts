import express, {NextFunction, Request, Response} from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import lusca from 'lusca';
import * as bodyParser from 'body-parser';
import expressSession from 'express-session';
import {authInit, loginRouter} from "./auth/login";

const ExpressSecret: string = process.env.EXPRESS_SECRET;
const Port: number = +(process.env.PORT || 3000);
const ServerHostname: string = process.env.SERVER_HOSTNAME || 'localhost';
const ServerScheme: string = process.env.SERVER_SCHEME || 'http';

authInit(`${ServerScheme}://${ServerHostname}:${Port}`);

passport.serializeUser((user, cb) => {
    cb(null, user);
});
passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

const app = express();
app.set('port', Port);
app.set('views', './views');
app.set('view engine', 'pug')

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: ExpressSecret, resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());
// Some amount of voodoo here from https://github.com/microsoft/TypeScript-Node-Starter/blob/master/src/config/passport.ts
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req: Request, res: Response, next: NextFunction) => {
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

export default app;
