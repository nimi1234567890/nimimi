const display = document.getElementById('display');
let current = '';
let operator = '';
let operand = '';
let resultShown = false;

function updateDisplay(val) {
    display.textContent = val;
}

function clearAll() {
    current = '';
    operator = '';
    operand = '';
    resultShown = false;
    updateDisplay('0');
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const value = btn.getAttribute('data-value');
        if (btn.id === 'clear') {
            clearAll();
            return;
        }
        if (btn.id === 'equals') {
            if (operator && operand !== '') {
                try {
                    const res = eval(operand + operator + current);
                    updateDisplay(res);
                    current = res + '';
                    operator = '';
                    operand = '';
                    resultShown = true;
                } catch {
                    updateDisplay('오류');
                }
            }
            return;
        }
        if (['+', '-', '*', '/'].includes(value)) {
            if (current === '' && value === '-') {
                current = '-';
                updateDisplay(current);
                return;
            }
            if (current === '' && value !== '-') return;
            if (operator && operand !== '') {
                try {
                    const res = eval(operand + operator + current);
                    operand = res + '';
                    updateDisplay(res);
                } catch {
                    updateDisplay('오류');
                    return;
                }
            } else {
                operand = current;
            }
            operator = value;
            current = '';
            return;
        }
        if (resultShown) {
            current = '';
            resultShown = false;
        }
        if (value === '.') {
            if (current.includes('.')) return;
            if (current === '') current = '0';
        }
        current += value;
        updateDisplay(current);
    });
});

clearAll();
