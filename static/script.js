// ✅ إخفاء صندوق العقد عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contract-box").style.display = "none";
});

// 🕒 عد تنازلي (20 ثانية للتجربة)
const launchDate = new Date("2025-09-1T00:00:00").getTime();
const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector(".launch-box").style.display = "none";
    document.getElementById("contract-box").style.display = "block";
  }
}, 1000);

// ✅ زر نسخ العقد
document.getElementById("copy-btn").addEventListener("click", () => {
  const address = document.getElementById("contract-address").innerText;
  navigator.clipboard.writeText(address).then(() => {
    const msg = document.getElementById("copy-msg");
    msg.classList.add("show");
    setTimeout(() => msg.classList.remove("show"), 2000);
  });
});

// ✅ الرسم البياني
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
  options: {
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            let value = context.raw || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    }
  }
});

// ✅ البحث عن المحفظة (ربط الباك إند)
function checkWallet() {
  const wallet = document.getElementById("walletInput").value.trim();
  const resultBox = document.getElementById("walletResult");

  if (!wallet) {
    resultBox.innerHTML = "⚠️ Please enter a wallet address";
    return;
  }

  fetch("/check_wallet", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet })
  })
  .then(res => res.json())
  .then(data => {
    if (data.found) {
      resultBox.innerHTML = `
        <h3>Wallet: ${data.wallet}</h3>
        <p>🏆 Tokens Won: <strong>${data.tokensWon}</strong></p>
        <div class="rank-badge">Rank #${data.rank}</div>
        <p>${data.message}</p>`;
    } else {
      resultBox.innerHTML = `<p>${data.message}</p>`;
    }
  })
  .catch(() => {
    resultBox.innerHTML = "❌ Server error";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const candlesContainer = document.querySelector(".candles");

  for (let i = 0; i < 7; i++) {  // 🔥 تتحكم بعدد الشموع
    const candle = document.createElement("div");
    candle.classList.add("candle");
    candle.style.left = `${Math.random() * 100}%`;
    candle.style.width = `${Math.random() * 4 + 2}px`;
    candle.style.height = `${Math.random() * 40 + 20}px`;
    candle.style.animationDuration = `${Math.random() * 5 + 3}s`;
    candlesContainer.appendChild(candle);
  }
});

function closeResult() {
    document.getElementById("walletResult").style.display = "none";
}


