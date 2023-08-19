(function() {
  function calculateExpression(expression) {
    const tokens = expression.match(/(\d+|\+|\-|\*|\/|\^)/g);

    if (!tokens) {
      return "Error: Invalid expression";
    }

    const precedence = {
      "+": 1,
      "-": 1,
      "*": 2,
      "/": 2,
      "^": 3
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
      return "Error: Invalid expression";
    }
  }

  var inputExpression = prompt("Mathematical Expression (use symbols such as * instead of X and / instead of ÷):");
  var result = calculateExpression(inputExpression);
  alert(`${inputExpression} = ${result}`);
})();