const scrn = document.getElementById("screen");
const btns = document.querySelectorAll('.btn');
let expr = "";

function updateScreen() {
  scrn.textContent = expr === "" ? '0' : expr;
}

function isOperator(ch) {
  return ['+', '-', '*', '/'].includes(ch);
}

function getLastNumber() {
  const parts = expr.split(/(?=[+\-*/])|(?<=[+\-*/])/); // split but keep ops
  const filtered = parts.filter((s) => s !== '');
  if (filtered.length === 0) return '';
  return filtered.pop().replace(/[+\-*/]/g, '');
}

btns.forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.textContent.trim();

    if (["1","2","3","4","5","6","7","8","9","0"].includes(val)) {
      if (expr === '0') 
        expr = val; 
      else 
        expr += val;
      updateScreen();
      return;
    }

    if (val === '.') {
      const lastNum = getLastNumber();
      if (!lastNum.includes('.')) {
        if (lastNum === '') expr += '0.'; else expr += '.';
      }
      updateScreen();
      return;
    }

    if ( ["+","-","-","x"].includes(val)) {
      const op = val === 'x' ? '*' : val;
      const last = expr.slice(-1);
      if (expr === '' && op !== '-') {
        return;
      }
      if (isOperator(last)) {
        if (op === '-' && last !== '-') { // allow negative after operator
          expr += op;
        } else {
          expr = expr.slice(0, -1) + op; // replaces last op with new op
        }
      } else {
        expr += op;
      }
      updateScreen();
      return;
    }

    if (val === '=') {
      if (expr === '') { 
        updateScreen(); 
        return; 
      }
      while (isOperator(expr.slice(-1))) expr = expr.slice(0, -1);
      try {
        const result = eval(expr);
        expr = String(result);
      } catch (err) {
        expr = '';
        scrn.textContent = 'Error';
        return;
      }
      updateScreen();
      return;
    }
    
    if (val === 'AC') {
      expr = '';
      updateScreen();
      return;
    }

    if (val === 'DC') {
      if (expr.length > 0) expr = expr.slice(0, -1);
      updateScreen();
      return;
    }
  });
});

updateScreen();