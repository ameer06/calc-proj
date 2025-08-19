let outputScreen = document.getElementById("op-screen");
let historyList = document.getElementById("history-list");
let historyPanel = document.getElementById("history-panel");
let calculationHistory = [];

function display(num) {
    const operators = ['+', '-', '*', '/', '%'];
    const lastChar = outputScreen.value.slice(-1);

    if (operators.includes(num)) {
        if (operators.includes(lastChar) || outputScreen.value === '') {
            return;
        }
    }

    if (num === '.') {
        const lastNumber = outputScreen.value.split(/[+\-*/%]/).pop();
        if (lastNumber.includes('.')) {
            return;
        }
    }

    outputScreen.value += num;
    adjustInputSize();
}

function adjustInputSize() {
    const chars = outputScreen.value.length;

    if (chars > 15) {
        outputScreen.style.fontSize = "20px";
    } else if (chars > 10) {
        outputScreen.style.fontSize = "25px";
    } else {
        outputScreen.style.fontSize = "32px";
    }
}

function calculate() {
    try {
        let expression = outputScreen.value;
        const operators = ['+', '-', '*', '/', '%'];
        if (expression === '' || operators.includes(expression.slice(-1))) {
            alert("Invalid expression");
            return;
        }

        let result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
            alert("Invalid calculation");
            return;
        }

        result = Math.round(result * 1000000) / 1000000;
        outputScreen.value = result;
        calculationHistory.push({ expression, result });
        updateHistory();
        adjustInputSize();
    } catch (err) {
        alert("Invalid expression");
    }
}

function Clr() {
    outputScreen.value = "";
    adjustInputSize();
}

function Del() {
    outputScreen.value = outputScreen.value.slice(0, -1);
    adjustInputSize();
}

function updateHistory() {
    historyList.innerHTML = "";
    calculationHistory.forEach((calc) => {
        let li = document.createElement("li");
        li.textContent = `${calc.expression} = ${calc.result}`;
        historyList.appendChild(li);
    });
}

function toggleHistory() {
    historyPanel.style.display = historyPanel.style.display === "none" ? "block" : "none";
}

function clearHistory() {
    calculationHistory = [];
    updateHistory();
}
