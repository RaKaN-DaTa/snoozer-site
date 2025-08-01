// ✅ إخفاء صندوق العقد عند فتح الصفحة
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contract-box").style.display = "none";
});

// ✅ تحديد وقت الإطلاق
const launchDate = new Date("August 15, 2025 00:00:00").getTime();

const countdownFunction = setInterval(() => {
  const now = new Date().getTime();
  const distance = launchDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(countdownFunction);
    document.querySelector(".launch-box").style.display = "none";
    document.getElementById("contract-box").style.display = "block";
  }
}, 1000);

// ✅ نسخ العنوان
document.getElementById("copy-btn").addEventListener("click", () => {
  const contractAddress = document.getElementById("contract-address").innerText;
  navigator.clipboard.writeText(contractAddress)
    .then(() => {
      const msg = document.getElementById("copy-msg");
      msg.classList.add("show");
      setTimeout(() => msg.classList.remove("show"), 2000);
    });
});

// ✅ رسم الدائرة
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
      borderWidth: 4,
      hoverOffset: 15
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.parsed}%`;
          }
        }
      }
    }
  }
});

// 🔥 تحديد تاريخ الفتح (بعد أسبوعين من 15 أغسطس)
const unlockDate = new Date("August 29, 2025 00:00:00").getTime();
const claimBtn = document.getElementById("claimButton");

const checkUnlock = setInterval(() => {
  const now = new Date().getTime();

  if (now >= unlockDate) {
    claimBtn.disabled = false;
    claimBtn.classList.add("active");

    // 🔥 عند الضغط يفتح قروب التلغرام
    claimBtn.addEventListener("click", () => {
      window.open("https://t.me/SnoozerCoinz", "_blank");
    });

    clearInterval(checkUnlock);
  }
}, 1000);

// عداد الجوائز
let totalRewards = 0;
const target = 50000000;
const counter = document.getElementById("total-rewards");

const animateCounter = setInterval(() => {
  if (totalRewards < target) {
    totalRewards += 100000;
    counter.textContent = totalRewards.toLocaleString();
  } else {
    clearInterval(animateCounter);
  }
}, 10);

// التنقل بين الصفحات
const dashboard = document.getElementById("dashboard");
const checkScreen = document.getElementById("check-screen");

function showSection(hideEl, showEl) {
  hideEl.classList.remove("active");
  showEl.classList.add("active", "fade-slide");
  setTimeout(() => {
    showEl.classList.remove("fade-slide");
  }, 600);
}

document.getElementById("check-btn").addEventListener("click", () => {
  showSection(dashboard, checkScreen);
});

document.getElementById("back-btn").addEventListener("click", () => {
  showSection(checkScreen, dashboard);
});

// بيانات الفائزين
const winners = [
  { wallet: "wallet1xxx", tokens: 25000, rank: 12 },
  { wallet: "wallet2yyy", tokens: 100000, rank: 5 }
];

// البحث وإظهار النتيجة
document.getElementById("search-btn").addEventListener("click", () => {
  const input = document.getElementById("wallet-input").value.trim();
  const resultDiv = document.getElementById("result");
  const statusMsg = document.getElementById("status-msg");
  const progressBar = document.getElementById("progress-bar");
  const progressContainer = document.getElementById("progress-container");
  const rank = document.getElementById("rank");

  const winner = winners.find(w => w.wallet === input);
  resultDiv.classList.remove("hidden");

  if (winner) {
    statusMsg.textContent = 🎉 Congrats! You won ${winner.tokens} $ZZZ;
    progressContainer.classList.remove("hidden");
    
    // تعبئة البار تدريجي
    progressBar.style.width = "0";
    setTimeout(() => {
      progressBar.style.width = ${(winner.tokens / 50000000) * 100}%;
      progressBar.textContent = ${winner.tokens};
    }, 100);

    rank.textContent = 🏅 Your rank: #${winner.rank};
  } else {
    statusMsg.textContent = "😢 You didn't win this time.";
    progressContainer.classList.add("hidden");
    rank.textContent = "Stay active for the next airdrop!";
  }
});
