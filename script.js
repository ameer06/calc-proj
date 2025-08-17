let outputScreen = document.getElementById("op-screen");
let historyList = document.getElementById("history-list");
let historyPanel = document.getElementById("history-panel");
let calculationHistory = [];

function display(num) {
    outputScreen.value += num;
}

function calculate() {
    try {
        let expression = outputScreen.value;
        let result = eval(expression);
        if (isNaN(result) || !isFinite(result)) {
            alert("Invalid calculation");
            return;
        }
        outputScreen.value = result;
        // Store the calculation in history
        calculationHistory.push({ expression, result });
        updateHistory();
    } catch (err) {
        alert("Invalid");
    }
}

function Clr() {
    outputScreen.value = "";
}

function Del() {
    outputScreen.value = outputScreen.value.slice(0, -1);
}

function updateHistory() {
    historyList.innerHTML = "";
    calculationHistory.forEach((calc, index) => {
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