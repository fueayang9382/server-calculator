
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
        console.log('In the step to push object into the array.');
        let numberX1 = req.body.numberX1
        let numberX2 = req.body.numberX2
        let operator = req.body.operator
        let result;
        switch (operator){
            case "+":
                result= Number(numberX1) + Number(numberX2);
                break;
            case "-":
                result= Number(numberX1) - Number(numberX2);
                break;
            case "/":
                result= Number(numberX1) / Number(numberX2);
                break;
            case "*":
                result= Number(numberX1) * Number(numberX2);
                break;
        }
    
       let  twoNumbersObject = {
            numOne: numberX1,
            numTwo: numberX2,
            operator: operator,
            result: result
        }
    
        calculations.push(twoNumbersObject);
        res.sendStatus(201);
})




app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})