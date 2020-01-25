// removed all comments from draft file because code 
// may change a lot. 

//refactoring is basically cleaning up code. 
// Following a tutorial claiming Javascript Best Practices

const calculator = document.querySelector('.container');

const display = calculator.querySelector('.result');

const keys = calculator.querySelector('.button_wrapper');


// Avoid too much reassignment when you can. Using
// early returns, which returns the result of a conditional
// statement can be returned as soon as a result is available, 
// rather than wait until the rest of the function is run
// this also allows us to get rid of else if's
const calculate = (n1, operator, n2) => {
   // parse your values before going into if statments
   // so you don't have to parse every time.
   firstNum = parseFloat(n1);
   secondNum = parseFloat(n2);

    if (operator === 'add') { return (firstNum) + (secondNum); }
        
    if (operator === 'minus') { return (firstNum) - (secondNum); } 
        
    if (operator === 'multiply') { return (firstNum) * (secondNum); }
    
    if (operator === 'divide') {return (firstNum) / (secondNum); }
}


// This eventListener function is HUGE. Going to try refactoring by
// splitting it into pure and inpure function
keys.addEventListener('click', e => {
    
    if (e.target.matches('button')) {

        const key = e.target;

        const action = key.dataset.action;

        const keyContent = key.textContent;

        const displayedNum = display.textContent;

        const previous = calculator.dataset.previousKeyType;

        const includeCheck = ['+', '-', '*', '/'];

        let checked = includeCheck.some(o => displayedNum.includes(o));

                     
        Array.from(key.parentNode.children).forEach(k => k.classList.remove('pressed'));
          
        // Try to condense if statemnts below so theres only 1 main one for each action.

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
    
        }

        if (
            action === 'add' ||
            action === 'minus' ||
            action === 'multiply' ||
            action === 'divide') {
            
            if (previous !== 'operator' && previous !== 'calculate') {

             const firstValue = calculator.dataset.firstValue;
             const operator = calculator.dataset.operator;
            
             const secondValue = displayedNum.split(/[+\*\/ -]/).pop();

                if (firstValue && operator) {
                    const currentResult = calculate(firstValue, operator, secondValue);


                    console.log(firstValue + operator + secondValue);
                    console.log(currentResult);
                    console.log(keyContent);
                    
                    calculator.dataset.firstValue = currentResult;



                } else {
                    
                    // this is the display BEFORE the operator was pressed,
                    // because we haven't updated it yet
                    calculator.dataset.firstValue = displayedNum;

                    console.log(keyContent);

                } 
                
                calculator.dataset.previousKeyType = 'operator';


                calculator.dataset.operator = action;


                display.textContent = displayedNum + keyContent;
            }

            if (previous === 'calculate') {


                calculator.dataset.firstValue = displayedNum;


                calculator.dataset.operator = action;


                display.textContent = displayedNum + keyContent;

                console.log(keyContent);

                calculator.dataset.previousKeyType = 'operator';

            }

            if (previous === 'operator' || previous === 'decimal') {

                display.textContent = displayedNum;

                console.log('invalid: operator pressed ' + keyContent);
            }
            
            key.classList.add('pressed');

        }
       
       
        if (action === 'calculate'){
            if (previous === 'operator') {
                
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
         

            console.log(keyContent);
            console.log(firstValue, operator, secondValue);
            
            display.textContent = calculate(firstValue, operator, secondValue);
            
            if (firstValue) {
                display.textContent = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.previousKeyType = 'calculate';
           }

           if (previous === 'number' || previous === 'backspace') {

            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;


            console.log(keyContent);

            if (firstValue) {
                const secondValue = displayedNum.split(/[+\*\/ -]/).pop();
                display.textContent = calculate(firstValue, operator, secondValue);


                currentResult = calculate(firstValue, operator, secondValue);
                console.log(currentResult);


                calculator.dataset.previousKeyType = 'calculate';

                calculator.dataset.modValue = secondValue;


                display.dataset.runningTotal = currentResult;


            } else { console.log('invalid key pressed, nothing to calc yet') }

          }
          if  (previous === 'calculate') {

            display.dataset.runningTotal = displayedNum;


            const firstValue = display.dataset.runningTotal;
            const operator = calculator.dataset.operator;
            const secondValue = calculator.dataset.modValue;

            console.log(keyContent);
            console.log(firstValue + operator + secondValue);
            display.textContent = calculate(firstValue, operator, secondValue);
            console.log(display.textContent);


            calculator.dataset.previousKeyType = 'calculate';
            }
        }

        if (action === 'clear') {
            console.log('clear key was pressed');
            if (previous) {

               
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
                
                calculator.dataset.firstValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.modValue = '';
                display.dataset.runningTotal = '';
                calculator.dataset.previousKeyType = '';

                display.textContent = '0';

            } else if (displayedNum.slice(-2) === '0.') {
                display.textContent = displayedNum.slice(0, -2);

            } else {
                display.textContent = displayedNum.slice(0, -1);
            }

            calculator.dataset.previousKeyType = 'backspace';
        }
    }
});





