
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));
app.use(bodyParser.json())

//dummy data to send back to the client --> app.get
let calculations = [
{
    numOne: 8,
    numTwo: 10,
    operator: '+',
    result: 18
},
{
    numOne: 100,
    numTwo: 50,
    operator: '+',
    result: 50
}
]

// send the calculation to the client. 
app.get('/calculations', (req,res)=>{
    console.log(calculations);
    res.send(calculations)//why cant I send it back to client. 
})


app.post('/calculations', (req, res)=>{
    console.log(req.body);
    
})




app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})