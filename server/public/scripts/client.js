console.log('is JQ loaded?');//yes it is loaded.

$(document).ready(mathInputCompute);
let operator = "";
//this is the rendering function.
function mathInputCompute() {
    $('#submitTwoNumbers').on('click', theSubmitTwoNums);//make button click. // YES it is working
    $('#clearTheResult').on('click', clearTheResult);//make the clear button click. YEs it is working
    $('.button').on('click', function() {
        Operator = $(this).html();
    })
    $('#submitTwoNumbers').on('click', resultGetRoute);
    // $('#addingTwoNums').on('click', theAdditionButton)
    //the clear button might need a 'body instead. maybe not since server 
    //might clear it from there. 
}


//capture value, assign value to object, post 
function theSubmitTwoNums() {
    console.log('We are in the submit button!');
//have the submit button capture those two numbers as value. 
let inputOne = $('#numOne').val();
let inputTwo = $('#numTwo').val();
//the capture values will be assign as object: num1 and num2.
let twoNumberObject ={
    numberX1: inputOne,
    numberX2: inputTwo,
    operator: operator
}//these values in the object will be post on the server side.
//They will wait for further instruction. 
// this is a POST route;therefore,result/get will be on the GET route.
// Nothing will append here. 
$.ajax({
    url: '/sendNumbersObjectToServer',
    method: 'post', //sending the object to the server
    data: twoNumberObject
}).then((res)=>{
    console.log(res);
})
}

function resultGetRoute() {
    $.ajax({
  url: '/displayResult',
  method: 'GET'
}).then((Response) => {
  console.log('server sent us:', Response);
  $('#recent').empty()
  for (let solution of Response) {
    $('#result').empty()
    $('#result').append(`${solution.result}`)
    $('#recent').append(`
   <tr>
      <td>${solution.numberX1} ${solution.operator} ${solution.numberX2} = ${solution.result}</td>
   </tr>
    `)
  }
})
}


    //needs to be send to the server side. from there the math 
    //function can take place. 
    //


function submissionDenied() {
    if (numberX1 === '' || numberX2 === '' || operator === '') {
        console.log('Please try again. Make sure to enter mathematical equation');
        return; 
    }
}// this function make sure users have correct full math equation.




//send a post object to the server.  -Done
//create an empty global array on the server side. -Done
// when the object is in the server side, push the object into the empty global array. -Done
// make the server send a post respond to indicate that it received the instruction. -Done
// ^^^ the steps above are done. 

//Make a  GET route that will retrieve the array back and append as history( string)
//The same GET route should also retrieve the math result, append on the DOM. 
//The clear button should empty the result. 


//HINT: this is possible to just have ONE POST route and ONE GET ROUTE: dont make this more 
//confusing than it needs to be.
//the submit button should do most of the work. the clear button should empty the result 
// The history can only go away if the server is restarted. 