// get the DOM elements
const billInput = document.getElementById("bill");
const peopleInput = document.getElementById("people");
const rateButtons = document.querySelectorAll(".rate-btn");
const customRateInput = document.getElementById("num");
const tipDisplay = document.getElementById("tip");
const totalDisplay = document.getElementById("total");
const resetButton = document.querySelector(".btn");
const billError = document.getElementById("bill-error");
const peopleError = document.getElementById("people-error");
 
// set up initial values
let billValue = 0;
let numPeople = 0;
let tipAmount = 0;
let totalAmount = 0;
let rateValue = 0;
 
// function to update values and display them
function updateValues() {
  // check if bill and number of people are valid
  if (billValue > 0 && numPeople > 0) {
    // calculate tip per person
    const tipPerPerson = (billValue * rateValue) / (numPeople * 100);
    tipAmount = tipPerPerson.toFixed(2);
    tipDisplay.textContent = `$${tipAmount}`;
 
    // calculate total per person
    const totalPerPerson = (billValue / numPeople) + tipPerPerson;
    totalAmount = totalPerPerson.toFixed(2);
    totalDisplay.textContent = `$${totalAmount}`;
 
    // enable reset button
    resetButton.disabled = false;
    resetButton.style.backgroundColor = "hsl(172, 67%, 45%)";
  } else {
    // disable reset button
    resetButton.disabled = true;
    resetButton.style.backgroundColor = "grey";
  }
}
 
// function to update the rate value
function updateRate() {
  // get the rate value
  if (this.id === "num") {
    rateValue = parseFloat(this.value) || 0;
  } else {
    rateValue = parseFloat(this.textContent) / 100;
  }
 
  // update the UI
  rateButtons.forEach(button => button.classList.remove("active"));
  this.classList.add("active");
  updateValues();
}
 
// add event listeners to DOM elements
billInput.addEventListener("input", function() {
  // update bill value and show error if necessary
  billValue = parseFloat(this.value) || 0;
  if (billValue <= 0) {
    billError.style.display = "block";
    this.style.outlineColor = "red";
  } else {
    billError.style.display = "none";
    this.style.outlineColor = "";
  }
 
  updateValues();
});
 
peopleInput.addEventListener("input", function() {
  // update number of people and show error if necessary
  numPeople = parseFloat(this.value) || 0;
  if (numPeople <= 0) {
    peopleError.style.display = "block";
    this.style.outlineColor = "red";
  } else {
    peopleError.style.display = "none";
    this.style.outlineColor = "";
  }
 
  updateValues();
});
 
rateButtons.forEach(button => button.addEventListener("click", updateRate));
customRateInput.addEventListener("input", updateRate);
 
resetButton.addEventListener("click", function() {
  // reset values and UI
  billInput.value = "";
  peopleInput.value = "";
  rateButtons.forEach(button => button.classList.remove("active"));
  customRateInput.value = "";
  tipAmount = 0;
  tipDisplay.textContent = "$0.00";
  totalAmount = 0;
  totalDisplay.textContent = "$0.00";
  resetButton.disabled = true;
  resetButton.style.backgroundColor = "grey";
});
