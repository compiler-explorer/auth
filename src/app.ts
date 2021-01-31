import express, {Request, Response} from 'express';

const app = express();
app.set('port', process.env.PORT || 3000);
app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'hello world',
    });
});
app.get('/login', (req: Request, res: Response) => {
    res.send({
        message: 'ooh please log in',
    });
});

export default app;
