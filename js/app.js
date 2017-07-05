// focus name field on page load
$(function() {
  $('#name').focus();
});

// create form field
$('.basic-info').append('<input type="text" id="other-input" placeholder="Please list a job">');
$('#other-input').hide();

// display input field if input is selected
$('#title').change(function(){
  if($('#title option:selected').val() === "other") {
    $('#other-input').show();
  } else {
    $('#other-input').hide();
  }
});

// No color options appear in the “Color” menu until the user chooses a T-Shirt theme. The “Color” menu reads “Please select a T-shirt theme” until a theme is selected from the “Design” menu.
$('#color').hide();
$('#colors-js-puns').append('<p class="text">Please select a T-shirt theme</p>');

//T-shirt color options are revealed based on the design selected.
$('#design').change(function(){
  if ($('#design option:selected').val() === "js puns") {
    $('#color').show();
    $('.text').hide();
    $('#color').html('<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option><option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option> <option value="gold">Gold (JS Puns shirt only)</option> ')
  } else if($('#design option:selected').val() === "heart js") {
    $('#color').show();
    $('.text').hide();
    $('#color').html('<option value="tomato">Tomato (I &#9829; JS shirt only)</option><option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option><option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option> ')
  } else {
    $('#color').hide();
    $('.text').show();
  }
});


// User cannot select two activities that are at the same time
// Total cost of selected activities is calculated and displayed below the list of activities
const jsFrameworks = $('input[name="js-frameworks"]');
const jsLibs = $('input[name="js-libs"]');
const express = $('input[name="express"]');
const node = $('input[name="node"]');
const buildTools = $('input[name="build-tools"]');
const npm = $('input[name="npm"]');

totalCost = 0;
$('.activities').append('<div class="total"></div>');

const addTotal = (cost) => {
  totalCost += cost;
  $('.total').html("Total: $" + totalCost);
}

$('input[name="all"]').change(function(){
  if($(this).prop("checked")) {
    addTotal(200);
  } else {
    addTotal(-200);
  }
});

jsFrameworks.change(function(){
  if($(this).prop("checked")) {
    addTotal(100);
    express.attr("disabled", true);
  } else {
    addTotal(-100);
    express.attr("disabled", false);
  }
});

jsLibs.change(function(){
  if($(this).prop("checked")) {
    addTotal(100);
    node.attr("disabled", true);
  } else {
    addTotal(-100);
    node.attr("disabled", false);
  }
});

express.change(function(){
  if($(this).prop("checked")) {
    addTotal(100);
    jsFrameworks.attr("disabled", true);
  } else {
    addTotal(-100);
    jsFrameworks.attr("disabled", false);
  }
});

node.change(function(){
  if($(this).prop("checked")) {
    addTotal(100);
    jsLibs.attr("disabled", true);
  } else {
    addTotal(-100);
    jsLibs.attr("disabled", false);
  }
});

buildTools.change(function(){
  if($(this).prop("checked")) {
    addTotal(100);
  } else {
    addTotal(-100);
  }
});

npm.change(function(){
  if($(this).prop("checked")) {
    addTotal(100);
  } else {
    addTotal(-100);
  }
});

// When a user chooses a payment option, the chosen payment section is revealed and the other payment sections are hidden
$('#credit-card, #paypal, #bitcoin').hide();

$('#payment').change(function(){
  if($('#payment option:selected').val() === "credit card") {
    $('#credit-card').fadeIn('fast');
    $('#bitcoin').fadeOut('fast');
    $('#paypal').fadeOut('fast');
  } else if($('#payment option:selected').val() === "paypal") {
    $('#paypal').fadeIn('fast');
    $('#credit-card').fadeOut('fast');
    $('#bitcoin').fadeOut('fast');
  } else if($('#payment option:selected').val() === "bitcoin") {
    $('#bitcoin').fadeIn('fast');
    $('#credit-card').fadeOut('fast');
    $('#paypal').fadeOut('fast');
  } 
});

$('form').submit(function(e){
  e.preventDefault();


  let errorMessage = "";
  
  const emailAddress = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  const creditCard = /\b\d{4}(| |-)\d{4}\1\d{4}\1\d{4}\b/g;
  const zipCode = /^\d{5}(?:[-\s]\d{4})?$/;


  if($('#name').val() === "") {
    errorMessage += "Please provide a name";
    $('label[for="name"]').html('<span class="error-message"> ' + errorMessage + '</span>');
    $('#name').addClass('error');
    $('#name').focus();
  } else if(!emailAddress.test($('#mail').val())) {
    errorMessage += "Please provide an Email";
    $('label[for="mail"]').html('<span class="error-message"> ' + errorMessage + '</span>');
    $('#mail').addClass('error');
    $('#mail').focus();
  } else if($(".activities > label > input:checked").length === 0 ) {
    errorMessage += "Please choose at least one activity";
    $('.activities > legend').html('<span class="error-message"> ' + errorMessage + '</span>');
    $('.activities').addClass('error');
    $('.activities').focus();
  } else if($('#payment option:selected').val() === "credit card" && !creditCard.test   ($("#cc-num").val())) {
    errorMessage += "Please provide a valid credit card number";
    $('label[for="cc-num"]').html('<span class="error-message"> ' + errorMessage + '</span>');
    $('#cc-num').addClass('error');
    $('#cc-num').focus();
  } else if($('#payment option:selected').val() === "credit card" && !zipCode.test($("#zip").val())) {
    errorMessage += "Please provide a valid zip code";
    $('label[for="zip"]').html('<span class="error-message"> ' + errorMessage + '</span>');
    $('#zip').addClass('error');
    $('#zip').focus();
  } else if($('#payment option:selected').val() === "credit card" && $('#cvv').val().length < 3) {
    errorMessage += "Please provide a valid CVV";
    $('label[for="cvv"]').html('<span class="error-message"> ' + errorMessage + '</span>');
    $('#cvv').addClass('error');
    $('#cvv').focus();
  } else {
    alert("Thanks for registering for Full Stack Conf!");
  }
});




