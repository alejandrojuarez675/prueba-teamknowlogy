import express from 'express';
import morgan from 'morgan';
import mutationRouter from './routes/mutation.routes';

const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// routes
app.use('', mutationRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server run on port ${port}`)
});

export default app;