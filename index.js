const customSwitch = document.getElementById('customRadio');
const customInput = document.getElementById('customInput');
const collection = document.querySelectorAll('[name=tip__percent]');

// calculate and reset button
const splitBtn = document.getElementById('splitBtn');
const resetBtn = document.getElementById('resetBtn');
// display text
const totalTip = document.getElementsByClassName('totalTip')[0];
const splittedAmoutPerPerson = document.getElementsByClassName('splittedAmoutPerPerson')[0];


// getting the reference of input feilds
const totalBill = document.getElementById('totalBill');
const totalNumberOfPeopleInput = document.getElementById('totalNumberOfPeople');


// variables for calculation with predefined values
let totalBillAmount = 0;
let totalNumberOfPeople = 0;
let tipValue = 0;



// This function validated and handles the enebleing and disabling of split button.
function validate() {
    // enebling the split button if all three variables are greated than 0 (means all have valid value that can be calculated);
    if (totalBillAmount > 0 && totalNumberOfPeople > 0 && tipValue > 0) {
        splitBtn.classList.remove('disabled');
        splitBtn.disabled = false;
      
    }
    // disabling teh split button if any of the variable turns into inValid (means if any value of any of three variable becoms 0 or less then 0);
    else if (totalBillAmount <= 0 || totalNumberOfPeople <= 0 || tipValue <= 0) {
        splitBtn.classList.add('disabled');
        splitBtn.disabled = true;
    }
}


// utility function to hiding the custom input by adding the class hide and adding the calss block on the relative element also setting the value to null'
const switchBack = () => {
    customInput.classList.add('hide');
    customInput.value = null;
    customSwitch.style.display = 'block';
}




// calculation and display the output
splitBtn.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    // calculating the tip amount
    const totalTipAmout = totalBillAmount * tipValue / 100;
    // calculating the tip per person
    const payPerPerson = Number((totalBillAmount + totalTipAmout) / totalNumberOfPeople).toFixed(2);

    // displaying the results
    totalTip.innerText = `$${totalTipAmout}`
    splittedAmoutPerPerson.innerText = `$${payPerPerson}`;

    // after displaying the result hiding the split button by adding the class "remove" and showing the reset button by removing the class" remove"
    splitBtn.classList.add('remove');
    resetBtn.classList.remove('remove');
})


// reset the screen
resetBtn.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    // cleaning up the screen
    totalTip.innerText = '$0.00'
    splittedAmoutPerPerson.innerText = '$0.00';
    document.getElementById('totalBill').value = null;
    document.getElementById('totalNumberOfPeople').value = null;
    tipValue = 0;

    // calling the utility function the switching back to the custom buton inerface
    switchBack();


    // after cleanig the screen hiding the reset button and showing the slpit button by adding and removing class "remove"
    resetBtn.classList.add('remove');
    splitBtn.classList.remove('remove');

    // also ckecking if the validation is false disable the split button
    validate();
})


// custom input switch [START]
for (let init = 0; init < collection.length; init++) {
    // adding the eventlistner to all the radio inputs 
    collection[init].addEventListener('click', (e) => {

        // when clicked disabling the custom input by calling teh switchBack function
        // which will add the hide class to custom input adn reset the value from it.
        switchBack();

        // also updating teh value of tipValue variable
        tipValue = Number(e.target.value);
        // cheecking the validatio 
        validate();
    })
}



// enabling the custom tip input bar by adding the removing the calss hide from it and adding the display=none to the relative element
customSwitch.addEventListener('click', (e) => {
    e.target.previousElementSibling.classList.remove('hide');
    customSwitch.style.display = 'none';
    tipValue = 0;
    validate();
})





// eventListner to cheecking if any input turns inValid.
totalBill.addEventListener('input', (e) => {
    totalBillAmount = Number(e.target.value);
    validate();
});
totalNumberOfPeopleInput.addEventListener('input', (e) => {
    totalNumberOfPeople = Number(e.target.value);
    validate();
})
customInput.addEventListener('input', (e) => {
    tipValue = Number(e.target.value);
    validate();
})




