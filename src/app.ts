import express, {Request, Response} from 'express';
import passport from 'passport';
import Strategy from 'passport-google-oauth2';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import expressSession from 'express-session';

const ExpressSecret: string = process.env.EXPRESS_SECRET;
const Port: number = +(process.env.PORT || 3000);

passport.use(
    new Strategy({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `http://localhost:${Port}/login/google/callback`  // TODO!
        },
        (accessToken: string, refreshToken: string, profile, cb) => {
            console.log("Ooh", accessToken, refreshToken, profile);
            cb(null, profile);
            // User.findOrCreate({});
        }));
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
// app.use(flash());
// app.use(lusca.xframe("SAMEORIGIN"));
// app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

const renderOptions = {
    httpRoot: '/', // TODO really needed here?
};
app.get('/', (req: Request, res: Response) => {
    res.render('index', renderOptions);
});
app.get('/login', (req: Request, res: Response) => {
    res.render('login', renderOptions);
});
app.get('/healthcheck', (req: Request, res: Response) => {
    res.send("all ok");
});

app.get('/login/google', passport.authenticate('google', {scope: ['profile']}));
app.get('/login/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    (req, res) => {
        res.redirect('/');
    });

export default app;
