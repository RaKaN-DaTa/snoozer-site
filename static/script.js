// ✅ إخفاء صندوق العقد عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contract-box").style.display = "none";
});

// ✅ مؤقت (20 ثانية فقط للاختبار)
const launchDate = new Date().getTime() + (20 * 1000);

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".launch-box").style.display = "none";
    document.getElementById("contract-box").style.display = "block";
  }
}, 1000);

// ✅ نسخ العقد
document.getElementById("copy-btn").addEventListener("click", () => {
  const contractAddress = document.getElementById("contract-address").innerText;
  navigator.clipboard.writeText(contractAddress)
    .then(() => {
      const msg = document.getElementById("copy-msg");
      msg.classList.add("show");
      setTimeout(() => msg.classList.remove("show"), 2000);
    });
});

// ✅ الدائرة (Chart.js)
const ctx = document.getElementById('tokenomicsChart').getContext('2d');
new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Liquidity', 'Team', 'Marketing', 'Airdrops', 'Meme Fund', 'Treasury'],
    datasets: [{
      data: [80, 8, 5, 5, 1, 1],
      backgroundColor: ['#7B68EE', '#8A2BE2', '#9370DB', '#BA55D3', '#DA70D6', '#D8BFD8'],
      borderColor: '#1c0030',
      borderWidth: 3
    }]
  },
  options: { cutout: '70%', plugins: { legend: { display: false } } }
});

// ✅ البحث عن المحفظة (ديمو)
function checkWallet() {
  const wallet = document.getElementById("walletInput").value.trim();
  const resultBox = document.getElementById("walletResult");

  if (!wallet) {
    resultBox.innerHTML = "⚠️ Please enter a wallet address";
    return;
  }

  const tokensWon = 25000;
  const rank = 12;
  const message = tokensWon > 0 
      ? "🎉 Congrats! You have won some tokens!" 
      : "😴 Keep trying!";

  resultBox.innerHTML = `
    <h3>Wallet: ${wallet}</h3>
    <p>🏆 Tokens Won: <strong>${tokensWon}</strong></p>
    <div class="rank-badge">Rank #${rank}</div>
    <p>${message}</p>
  `;
}