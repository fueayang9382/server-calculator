//create an global empty array: make sure you dont mix up the name.
theCalculationHistory = [];

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5004;
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('server/public'));
app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
})
let finalResult = [];
let twoNumbersObject = []; 
app.post('/sendNumbersObjectToServer',(req, res)=> {
    console.log('In the step to push object into the array.');
    let numberX1 = req.body.numberX1
    let numberX2 = req.body.numberX2
    let operator = req.body.operator


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

    twoNumbersObject = {
        numberX1: numberX1,
        numberX2: numberX2,
        operator: operator,
        result: result
    }

    finalResult.push(twoNumbersObject);

    res.send(201);
})


app.get('/displayResults', (req, res) => {
    res.send(finalResult)
})
//^the function pushed the object into the array and the server
// respond back stating it did the command I told it to do. 





