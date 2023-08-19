(function() {
    function calculateExpression(expression) {
      const tokens = expression.match(/(\d+|\+|\-|\*|\/|\^|sqrt)/g);
  
      if (!tokens) {
        return "Invalid expression";
      }
  
      const precedence = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2,
        "^": 3,
        "sqrt": 4,
      };
  
      const outputQueue = [];
      const operatorStack = [];
  
      for (const token of tokens) {
        if (!isNaN(token)) {
          outputQueue.push(parseFloat(token));
        } else if (token in precedence) {
          while (
            operatorStack.length > 0 &&
            precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
          ) {
            outputQueue.push(operatorStack.pop());
          }
          operatorStack.push(token);
        }
      }
  
      while (operatorStack.length > 0) {
        outputQueue.push(operatorStack.pop());
      }
  
      const evaluationStack = [];
      for (const token of outputQueue) {
        if (typeof token === "number") {
          evaluationStack.push(token);
        } else if (token === "sqrt") {
          const a = evaluationStack.pop();
          evaluationStack.push(Math.sqrt(a));
        } else {
          const b = evaluationStack.pop();
          const a = evaluationStack.pop();
          switch (token) {
            case "+":
              evaluationStack.push(a + b);
              break;
            case "-":
              evaluationStack.push(a - b);
              break;
            case "*":
              evaluationStack.push(a * b);
              break;
            case "/":
              evaluationStack.push(a / b);
              break;
            case "^":
              evaluationStack.push(Math.pow(a, b));
              break;
          }
        }
      }
  
      if (evaluationStack.length === 1) {
        return evaluationStack[0];
      } else {
        return "Invalid expression";
      }
    }
  
    var inputExpression = prompt("Mathematical Expression (use symbols +, -, *, /, ^, and sqrt()) For example:\n1+1=2\n2-1=1\n2*3=6\n6/2=3\nsqrt(9)=3\n3^2=9");
    var result = calculateExpression(inputExpression);
    alert(`${inputExpression} = ${result}`);
  })();