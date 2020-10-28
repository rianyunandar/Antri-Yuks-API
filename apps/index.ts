import express from 'express';
import morgan from 'morgan';

const PORT = process.env.PORT || 3000;

const app = express();

app.use (express.json());
app.use (morgan('dev'));
app.use ((err: Error, req: express.Request, res: express.Response, next: express.NextFunction)=>
{
    res.status(500).json({
        success : false,
        message : err.message
    });
});

app.get('/', async (req, res, next)=>{
    res.json({message: 'success'})
})

app.listen (PORT, ()=>{
    console.log(`app run in port ${PORT}`)
})