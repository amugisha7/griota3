import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import userRouter from './routes/user.route.js'
import applicationRouter from './routes/application.route.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mg'}));

app.use('api/v1/users', userRouter)
app.use('api/v1/applicaitons', applicationRouter)

app.get('/', (req,res) => {
	res.send({message: 'Praise God'})
})

const startServer = async()=>{
	try {
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, ()=> console.log('Server running on http://localhost:8080'))
    }
    catch(err){
        console.log(err)
    }
}
startServer()