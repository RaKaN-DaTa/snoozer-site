// ✅ يخفي صندوق العقد أول ما تشتغل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  const contractBox = document.getElementById("contract-box");
  if (contractBox) {
    contractBox.style.display = "none"; // ✅ يضمن أن الصندوق مخفي بالبداية
  }
});

// تحديد وقت الإطلاق (5 ثواني للتجربة)
const launchDate = new Date().getTime()+(4*1000);

// تشغيل العد التنازلي
const countdownFunction = setInterval(() => {
  const now = new Date().getTime(); // الوقت الحالي
  const distance = launchDate - now; // الفرق بين وقت الإطلاق والوقت الحالي

  // حساب اوقت المتبقي
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // عرض الوقت في الصندوق
  const countdownElem = document.getElementById("countdown");
  if (countdownElem) {
    countdownElem.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // عند انتهاء العد
  if (distance < 0) {
    clearInterval(countdownFunction);

    // إخفاء الصندوق بالكامل
    const launchBox = document.querySelector(".launch-box");
    if (launchBox) {
      launchBox.style.display = "none";
    }

    // إظهار صندوق العقد
    const contractBox = document.getElementById("contract-box");
    if (contractBox) {
      contractBox.style.display = "block";
    }
    // 🔓 تفعيل زر Claim بعد أسبوع من الإطلاق
const claimButton = document.getElementById("claim-btn");

// حساب الوقت بالمللي ثانية (7 أيام بعد الإطلاق)
const claimUnlockTime = launchDate + (7 * 24 * 60 * 60 * 1000);

const checkClaimAvailability = setInterval(() => {
  const now = new Date().getTime();

  if (now >= claimUnlockTime) {
    claimButton.disabled = false;       // يفعّل الزر
    claimButton.classList.add("active"); // يضيف شكل الزر المتفعل
    claimButton.style.cursor = "pointer";
    clearInterval(checkClaimAvailability); // يوقف الفحص
  }
}, 1000);
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
  <button class="close-btn" onclick="closeResult()">×</button>
  <h3>Wallet: ${wallet}</h3>
  <p>🏆 Tokens Won: <strong>${tokensWon}</strong></p>
  <div class="rank-badge">Rank #${rank}</div>
  <p>${message}</p>
`;
}
function closeResult() {
  document.getElementById("walletResult").innerHTML = "";
}

// 🔥 إنشاء الشموع تلقائيًا
document.addEventListener("DOMContentLoaded", () => {
  const candlesContainer = document.querySelector(".candles");

  for (let i = 0; i < 4; i++) {  // 🔥 عدد الشموع (زيد أو نقص حسب رغبتك)
    const candle = document.createElement("div");
    candle.classList.add("candle");

    // توليد مواقع وأحجام عشوائية
    candle.style.left = `${Math.random() * 100}%`;
    candle.style.width = `${Math.random() * 4 + 2}px`;
    candle.style.height = `${Math.random() * 40 + 20}px`;
    candle.style.animationDuration = `${Math.random() * 5 + 3}s`;

    candlesContainer.appendChild(candle);
  }
});