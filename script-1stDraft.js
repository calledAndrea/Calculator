// BIG PROBLEM DISCOVERED AND FIXED: Bad practice to use 'button'
// as a variable name. Not exactly sure why yet, but it caused code not to work!!!!

// Selecting our container div and setting it equal to variable 'calculator'
const calculator = document.querySelector('.container');

// Selecting result div and setting eqaul to variable 'display'
const display = calculator.querySelector('.result');

// Cannot use querySelectorAll becuase that returns a Node List, 
// which is more difficult to work with. 

// adding the '.keys' class to all calc keys
// allows us to use this line and have the selector work correctly
// const keys = calculator.querySelector('.keys');

//NOPE, nevermind, adding '.keys class messed up the grid. 
// In order to not edit EVERYTHING in CSS file right now, going to use this line:
// UPDATE: had to add .key_wrapper class to make selectors work!
const keys = calculator.querySelector('.button_wrapper');

// code ABOVE selections all divs WITH AND WITHIN the .container class (basically, it and all its children).
// although this line also points to container and result divs, those divs aren't buttons so they don't get 
// referred to in all the code below

// must define function before calling it below.
const calculate = (n1, operator, n2) => {
    let result = '';
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2);
    } else if (operator === 'minus') {
        result = parseFloat(n1) - parseFloat(n2);
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2);
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2);
    }

    return result;
}
// comes back to this line of code EVERYTIME key is clicked 
keys.addEventListener('click', e => {
    // add comments in cleaned up code after reviewing each
    if (e.target.matches('button')) {

        const key = e.target;

        const action = key.dataset.action;

        const keyContent = key.textContent;

        const displayedNum = display.textContent;

        const previous = calculator.dataset.previousKeyType;

        const includeCheck = ['+','-','*','/'];

        let checked = includeCheck.some(o => displayedNum.includes(o));

        // this line really only affects CCS styles, might add more later              
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressed'));


        if (!action) {
            if (displayedNum === '0' || previous === 'calculate') {
                display.textContent = keyContent;
            }
            else {
                display.textContent = displayedNum + keyContent;
            }
            console.log(keyContent);
            calculator.dataset.previousKeyType = 'number';
        }
        
    
        if (action === 'decimal') {
            
            if (previous === 'decimal' || previous === 'calculate') {
                // does not update display
                display.textContent = displayedNum;
                
                console.log('point clicked, invalid key');               
            
            } else if (displayedNum === '0' || previous === 'number' || previous === 'backspace') {
                display.textContent = displayedNum + '.'; 
                console.log('point');
                calculator.dataset.previousKeyType = 'decimal';
            
            } else if (previous === 'operator') {
                display.textContent = displayedNum + '0.';
                console.log('0.');
                calculator.dataset.previousKeyType = 'decimal';
            
            
            }
            // actually don't need this code (according to a few tests), all cases above takes care of it.
            // } else if (displayedNum.includes('.') && !checked ) {
            //     // does not update display
            //     display.textContent = displayNum;
            //     console.log('point clicked, invalid key'); 
            //     console.log(checked);               
            // }                           
            
        }
        
        if ((
            action === 'add' ||
            action === 'minus' ||
            action === 'multiply' ||
            action === 'divide' ) && (previous !== 'operator' && previous !== 'calculate'))
           {

            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            // .pop lets the split return substring after the operator

            // still review pop and regex 
            const secondValue = displayedNum.split(/[+\*\/ -]/).pop();

            if (firstValue && operator) {
                const currentResult = calculate(firstValue, operator, secondValue);
                

                console.log(firstValue+operator+secondValue);
                console.log(currentResult);
                console.log(keyContent);
                // code above WILL ONLY BE DONE IF firstValue and operator ALREADY EXIST
                
                // FIND WAY TO SAVE PREVIOUSLY CALCULATED VALUE 

                // UPDATE: found a way possibly? make new custom dataset
                // for running total:
                // if calculation is being done                
                // then, add custom dataset 'runningTotal' to currentResult
                calculator.dataset.firstValue = currentResult;

                

            } else {
                // 'else' happens if firstValue and operator haven't been set yet.
                // aka if there's nothing to calculate yet.

                // adding custom dataset 'firstValue'
                // to current displayedNum
                // (aka the number entered before the operator)
                calculator.dataset.firstValue = displayedNum;

                console.log(keyContent);
                
            }
            
            // only affects CSS styles
            key.classList.add('pressed');

            // leting the computer know that the last key pressed
            // was of the data type 'operator'
             calculator.dataset.previousKeyType = 'operator';

            // adding custom dataset 'operator' to key that was just pressed
            // (aka whatever operator pressed)
            calculator.dataset.operator = action;            

            // update display with operator just pressed
            display.textContent = displayedNum + keyContent;  
            
      
        }

        if ((
            action === 'add' ||
            action === 'minus' ||
            action === 'multiply' ||
            action === 'divide') && (previous === 'operator' || previous === 'decimal')) {
            
            // Doesn't update display, 
            display.textContent = displayedNum;
            
            console.log('invalid: operator pressed ' + keyContent);
        } 
        
        if ((
            action === 'add' ||
            action === 'minus' ||
            action === 'multiply' ||
            action === 'divide') && (previous === 'calculate')) {
            
            // if operator clicked DIRECTLY AFTER equals key,
            // don't do any calculation
        
            // add dataset firstValue to displayed number (result of previous calculation)
            calculator.dataset.firstValue = displayedNum;

            // add dataset operator to just operator clicked
            calculator.dataset.operator = action;  
            
            // update display with operator clicked
            display.textContent = displayedNum + keyContent;
            
            console.log(keyContent);

            calculator.dataset.previousKeyType = 'operator';

            }
     
     
        
        // this block takes care of (2+=, 2*=, etc)
        if (action === 'calculate' && previous === 'operator'){
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
            // here, secondValue gets saved to whatever number and
            // operator were just clicked (8* , 9+ , 4/ , etc)

            // calculate function still works because we run parseFloat
            // on this value.

            // if parseFloat encounters anything other
            // than a +, -, number, decimal, or exponent, 
            // it returns the value up that character
            // ignoring the invalid character and characters following

            // Don't know EXACTLY why yet, but although it doesn't
            // ignore + or -, the returned string will not include these chars.
            // maybe cause it only returns part of string that can
            // be converted to a number?
            
            console.log(keyContent);
            console.log(firstValue, operator, secondValue);

            // review: figure out why this block is needed
            if (firstValue) {
             display.textContent = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.previousKeyType = 'calculate';
        }

        if (action === 'calculate' && (previous === 'number' || previous === 'backspace')) {
                   
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            // const secondValue = displayedNum.split(/[+\*\/ -]/).pop();

            console.log(keyContent);
            // console.log(firstValue + operator + secondValue);

            // adding if(firstValue exists) takes care of case
            // where equals key is pressed before any operator is pressed.
            // this block of code won't run if firstValue is not set up,
            // which happens when operator is pressed
            if (firstValue){
            const secondValue = displayedNum.split(/[+\*\/ -]/).pop();
            display.textContent = calculate(firstValue, operator, secondValue);
            
            // don't think I need this line. Saving current result is necessary
            // in some cases, but after calc is pressed 
            currentResult = calculate(firstValue, operator, secondValue);
            console.log(currentResult);

           
            calculator.dataset.previousKeyType = 'calculate';

            // adding custom dataset modValue to secondValue
            // (should equal text content of last number pressed)
            calculator.dataset.modValue = secondValue;
            
            // review: is this line needed? 
            display.dataset.runningTotal = currentResult;

            // if firstValue is not set yet, (meaning operator key
            // hasn't been clicked yet, do nothing and console log invalid msg)
            } else { console.log('invalid key pressed, nothing to calc yet')}

            calculator.dataset.previousKeyType = 'calculate';
        }

        if (action === 'calculate' && previous === 'calculate') {
            // if calculation is done, and calc key is pressed again,
            // set displayedNum with runningTotal dataset ()
            display.dataset.runningTotal = displayedNum;
          
            // if calculation is done, and calc key is pressed again,
            // firstValue = result of previous calculation ( = 4 in 5 - 1 = 4)
            const firstValue = display.dataset.runningTotal;
            const operator = calculator.dataset.operator;
            const secondValue = calculator.dataset.modValue;

            console.log(keyContent);
            console.log(firstValue + operator + secondValue);
            display.textContent = calculate(firstValue, operator, secondValue);
            console.log(display.textContent);
            
           
            calculator.dataset.previousKeyType = 'calculate';
        }

      
        if (action === 'clear') {
            console.log('clear key was pressed');
            if (previous) {
            
            // clear all custom datasets
            calculator.dataset.firstValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.modValue = '';
            display.dataset.runningTotal = '';
            calculator.dataset.previousKeyType = '';

            display.textContent = '0';
            }
            calculator.dataset.previousKeyType = 'clear';
           
        }

        if (action === 'backspace') {
            console.log('backspace key was pressed');
            
            if (displayedNum === '0') {
                display.textContent = displayedNum;

            } else if (previous === 'operator') {
                display.textContent = displayedNum.slice(0, -1);
                calculator.dataset.operator = '';
            }
            
            else if (previous === 'calculate') {
                // if previous key was equals, treat backspace like
                // clear key and clear all custom datasets and set
                // display to 0
                calculator.dataset.firstValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.modValue = '';
                display.dataset.runningTotal = '';
                calculator.dataset.previousKeyType = '';

                display.textContent = '0';

            } else if(displayedNum.slice(-2) === '0.') {
                display.textContent = displayedNum.slice(0, -2);

            } else {
                display.textContent = displayedNum.slice(0, -1);
            }
          
            calculator.dataset.previousKeyType = 'backspace';
        }
    }
});    





