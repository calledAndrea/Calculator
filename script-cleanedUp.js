const calculator = document.querySelector('.container');


const display = calculator.querySelector('.result');

const keys = calculator.querySelector('.button_wrapper');

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

        if ((
            action === 'add' ||
            action === 'minus' ||
            action === 'multiply' ||
            action === 'divide') && (previous !== 'operator' && previous !== 'calculate')) {

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
              
                calculator.dataset.firstValue = displayedNum;

                console.log(keyContent);

            }

            
            key.classList.add('pressed');

          
            calculator.dataset.previousKeyType = 'operator';

           
            calculator.dataset.operator = action;

            
            display.textContent = displayedNum + keyContent;


        }

        if ((
            action === 'add' ||
            action === 'minus' ||
            action === 'multiply' ||
            action === 'divide') && (previous === 'operator' || previous === 'decimal')) {

            display.textContent = displayedNum;

            console.log('invalid: operator pressed ' + keyContent);
        }

        if ((
            action === 'add' ||
            action === 'minus' ||
            action === 'multiply' ||
            action === 'divide') && (previous === 'calculate')) {

          
            calculator.dataset.firstValue = displayedNum;

           
            calculator.dataset.operator = action;

            
            display.textContent = displayedNum + keyContent;

            console.log(keyContent);

            calculator.dataset.previousKeyType = 'operator';

        }



        
        if (action === 'calculate' && previous === 'operator') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;
         

            console.log(keyContent);
            console.log(firstValue, operator, secondValue);

            
            if (firstValue) {
                display.textContent = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.previousKeyType = 'calculate';
        }

        if (action === 'calculate' && (previous === 'number' || previous === 'backspace')) {

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

            calculator.dataset.previousKeyType = 'calculate';
        }

        if (action === 'calculate' && previous === 'calculate') {
           
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





