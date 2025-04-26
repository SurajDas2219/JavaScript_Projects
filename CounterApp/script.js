const counterElement = document.getElementById("counter");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

let counterCnt = 0;

function updateCounter() {
  counterElement.textContent = counterCnt;

  if (counterCnt > 0) {
    counterElement.style.color = "#2ecc71";
  } else if (counterCnt < 0) {
    counterElement.style.color = "#e74c3c";
  } else {
    counterElement.style.color = "#3498db";
  }
}

incrementBtn.addEventListener("click", () => {
  counterCnt++;
  updateCounter();
});

decrementBtn.addEventListener("click", () => {
  if (counterCnt > 0) {
    counterCnt--;
    updateCounter();
  }
});
resetBtn.addEventListener("click", () => {
  counterCnt = 0;
  updateCounter();
});

updateCounter();
