//const { response } = require("express");

console.log('is JQ loaded?');//yes it is loaded.

$(document).ready(mathInputCompute);
let operator = "";
//this is the rendering function.
function mathInputCompute() {
    $('#submitTwoNumbers').on('click', theSubmitTwoNums);//make button click. // YES it is working
    $('#clearTheResult').on('click', clearTheResult);//make the clear button click. YEs it is working
    $('#add').on('click', function () {
        operator = '+'
        console.log('this is my operator', operator);
    })
   $ ('#subtract').on('click', function () {
        operator = '-'
        console.log('this is my operator', operator);
    })
    $('#divide').on('click', function () {
        operator = '/'
        console.log('this is my operator', operator);
    })
    $('#multiply').on('click', function () {
        operator = '*'
        console.log('this is my operator', operator);
    })

    fetchAndRenderCalculation()
    // $('#submitTwoNumbers').on('click', resultGetRoute);
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
    if(!inputOne || !inputTwo || !operator){
        alert('Please try again. Make sure to enter mathematical equation')
        return;
    }
    //the capture values will be assign as object: numberX1 and numberX2.
    let twoNumberObject ={
    numberX1: inputOne,
    numberX2: inputTwo,
    operator: operator
    }//these values in the object will be post on the server side.
    //They will wait for further instruction. 
    // this is a POST route;therefore,result/get will be on the GET route.
    // Nothing will append here. 
    $.ajax({
    url: '/calculations',
    method: 'POST', //sending the object to the server
    data: twoNumberObject
    }).then((res)=>{
    console.log(res);
    })
}

function checkForSubmitionDenied() {
    if (numberX1 === '' || numberX2 === '' || operator === '') {
        alert('Please try again. Make sure to enter mathematical equation')
        return; 
    }
}
// this function make sure users have correct full math equation.
//get data from / calculation , then render
// it on the dom
function fetchAndRenderCalculation() {
    $.ajax({
        method: 'GET',
        url: '/calculations'
    }).then((response)=>{
        console.log(response);
        $('#recentHistory').empty();
        for (let aCal of response){
        $('#recentHistory').append(`
        <li>${aCal.numOne} ${aCal.operator} ${aCal.numTwo} = ${aCal.result}</li>
        
        `)}
    })
}