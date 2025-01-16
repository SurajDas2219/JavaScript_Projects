function calculateTip() {
  const billAmount = parseFloat(document.getElementById("billAmount").value);
  const tipPercent = parseFloat(document.getElementById("tipPercentage").value);

  if (
    isNaN(billAmount) ||
    isNaN(tipPercent) ||
    billAmount <= 0 ||
    tipPercent <= 0
  ) {
    alert("Please enter the valid input");
    return;
  }

  const tipAmount = (billAmount * tipPercent) / 100;
  const totalAmount = billAmount + tipAmount;

  document.getElementById(
    "tip-amount"
  ).textContent = `Tip Amount :$${tipAmount.toFixed(2)}`;
  document.getElementById(
    "total-amount"
  ).textContent = `Total Amount:$${totalAmount.toFixed(2)}`;
}
