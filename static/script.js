// ✅ إخفاء صندوق العقد عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contract-box").style.display = "none";
});

// ✅ تحديد وقت الإطلاق (20 ثانية مؤقت)
const launchDate = new Date().getTime() + (20 * 1000);

const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // ✅ عرض العد التنازلي
  document.getElementById("countdown").innerHTML =
    ${days}d ${hours}h ${minutes}m ${seconds}s;

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.querySelector(".launch-box").style.display = "none";
    document.getElementById("contract-box").style.display = "block";
  }
}, 1000);

// ✅ نسخ العنوان مع رسالة مؤقتة
document.getElementById("copy-btn").addEventListener("click", () => {
  const contractAddress = document.getElementById("contract-address").innerText;
  navigator.clipboard.writeText(contractAddress)
    .then(() => {
      const msg = document.getElementById("copy-msg");
      msg.classList.add("show");
      setTimeout(() => msg.classList.remove("show"), 5000);
    });
});

// ✅ رسم الدائرة Tokenomics
const ctx = document.getElementById('tokenomicsChart').getContext('2d');
const tokenomicsChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: [
      'Liquidity',
      'Team & Dev',
      'Marketing & Influencers',
      'Airdrops & Competitions',
      'Koala Meme Fund',
      'Community Treasury / Backup'
    ],
    datasets: [{
      data: [80, 8, 5, 5, 1, 1],
      backgroundColor: [
        '#7B68EE',
        '#8A2BE2',
        '#9370DB',
        '#BA55D3',
        '#DA70D6',
        '#D8BFD8'
      ],
      borderColor: '#1c0030',
      borderWidth: 3,
      hoverOffset: 12
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return ${context.label}: ${context.parsed}%;
          }
        }
      }
    }
  }
});

// 🔥 زر Claim يفتح بعد أسبوعين من الإطلاق
const unlockDate = new Date("August 29, 2025 00:00:00").getTime();
const claimBtn = document.getElementById("claimButton");

const checkUnlock = setInterval(() => {
  const now = new Date().getTime();

  if (now >= unlockDate) {
    claimBtn.disabled = false;
    claimBtn.classList.add("active");

    claimBtn.addEventListener("click", () => {
      window.open("https://t.me/SnoozerCoinz", "_blank");
    });

    clearInterval(checkUnlock);
  }
}, 1000);

// ✅ البحث عن المحفظة
function checkWallet() {
  const wallet = document.getElementById("walletInput").value.trim();
  const resultBox = document.getElementById("walletResult");

  if (!wallet) {
    resultBox.style.display = "block";
    resultBox.innerHTML = "⚠️ Please enter a wallet address";

    // إخفاء الرسالة بعد 5 ثواني
    setTimeout(() => { resultBox.style.display = "none"; }, 5000);
    return;
  }

  // مثال: نتيجة البحث
  const tokensWon = 25000;
  const rank = 12;
  const message = tokensWon > 0
    ? "🎉 Congrats! You have won some tokens!"
    : "😴 Keep trying! Next time you might win.";

  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <button class="close-btn" onclick="this.parentElement.style.display='none'">✖</button>
    <h3>Wallet: ${wallet}</h3>
    <p>🏆 Tokens Won: <strong>${tokensWon}</strong></p>
    <div class="rank-badge">Rank #${rank}</div>
    <p>${message}</p>
  `;
}
