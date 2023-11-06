import express from 'express';
import cors from 'cors';
import subject from './routes/subject';
import selection from './routes/selection';
import authRouter from './routes/auth';
import groups from './routes/groups'
import students from './routes/students'

const app = express();

app.use(cors()); 

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/v0/auth', authRouter);
app.use('/api/v0/subject', subject);
app.use('/api/v0/selection', selection);
app.use('/api/v0/groups', groups);
app.use('/api/v0/students', students)

app.get('/', (req, res)=>{
    res.send('Return to home page')
})

export default app;


