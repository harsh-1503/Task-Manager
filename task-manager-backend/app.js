console.log('Task Manager is running...')

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors());
const tasks = require('./routes/tasks')
const connectDB = require('./models/connect')
const notFound = require('./middlewares/not-found')
//Middlewares
const {errorhandlerMiddleware} = require('./middlewares/error-handler')
app.use(express.json())
//if we dont use this we have all the data in req.body

// app.use(notFound())


//Routes
app.use('/hello',(req,res,next)=>{
    console.log(new Date().getTime);
    next();
})

app.get('/',(req,res)=>{
    res.send(`<h1>Hello, Task Manager</h1>`)
    console.log("Hello");

})
app.use('/api/v1/tasks',tasks)

app.get('/api/v1/tasks',(req,res)=>{
    res.send(`<h1>Hello World</h1>`);
})


const port =process.env.PORT | 5000 

const start = async ()=>{
    try{
        await connectDB()
        app.listen(port,()=>{
            console.log(`Server is listening on ${port}...`);
        })
    }catch(error){
        console.log(error);
    }
}

start()

app.use(errorhandlerMiddleware)
