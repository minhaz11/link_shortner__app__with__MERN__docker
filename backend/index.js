const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./routes/routes');



const app = express();
dotenv.config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(routes);


//db connection

const dburl = `mongodb://mongodb:27017/link_shortner`;

mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error(err));


app.get('/',(req,res)=>{
    res.send('Hello World');
})


function errorHandler(err, req, res, next) { 
    if (res.headersSent) {
        return next(err);    
    }
    res.status(500).json({ error: err });
}
app.use(errorHandler);
    
app.listen(port, () =>{
    console.log(`app listening on port ${port}!`)
});