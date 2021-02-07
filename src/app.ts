import express, {Request, Response} from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', './views');
app.set('view engine', 'pug')

const renderOptions = {
    httpRoot: '/',
};

app.get('/', (req: Request, res: Response) => {
    res.render('index', renderOptions);
});
app.get('/login', (req: Request, res: Response) => {
    res.send('Well, this is definitely on the cards sometime...');
});
app.get('/healthcheck', (req: Request, res: Response) => {
    res.send("all ok");
});

export default app;
