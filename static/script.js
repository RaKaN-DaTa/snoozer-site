// ✅ وقت الإطلاق (20 ثانية مؤقتاً)
const launchDate = new Date().getTime() + (20 * 1000);

const countdownFunction = setInterval(() => {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("countdown").innerText = ${seconds}s;

    if (distance < 0) {
        clearInterval(countdownFunction);
        document.querySelector(".launch-box").style.display = "none";
        document.getElementById("contract-box").style.display = "block";
    }
}, 1000);

// ✅ نسخ العنوان
document.getElementById("copy-btn").addEventListener("click", () => {
    const contractAddress = document.getElementById("contract-address").innerText;
    navigator.clipboard.writeText(contractAddress).then(() => {
        const msg = document.getElementById("copy-msg");
        msg.style.display = "block";
        setTimeout(() => { msg.style.display = "none"; }, 5000);
    });
});

// ✅ البحث عن المحفظة
function checkWallet() {
    const wallet = document.getElementById("walletInput").value.trim();
    const box = document.getElementById("walletResult");

    if (!wallet) return;

    const tokensWon = 25000;
    const rank = 12;

    box.innerHTML = `
        <button class="close-btn" onclick="document.getElementById('walletResult').style.display='none'">x</button>
        <h3>Wallet: ${wallet}</h3>
        <p>🏆 Tokens Won: <strong>${tokensWon}</strong></p>
        <div class="rank-badge">Rank #${rank}</div>
        <p>🎉 Congrats! You have won some tokens!</p>
    `;
    box.style.display = "block";
}

// ✅ الدائرة
const ctx = document.getElementById('tokenomicsChart').getContext('2d');
const tokenomicsChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Liquidity', 'Team', 'Marketing', 'Airdrops', 'Meme Fund', 'Treasury'],
        datasets: [{
            data: [80, 8, 5, 5, 1, 1],
            backgroundColor: ['#7B68EE', '#8A2BE2', '#9370DB', '#BA55D3', '#DA70D6', '#D8BFD8'],
            borderColor: '#1c0030',
            borderWidth: 2,
            hoverOffset: 20
        }]
    },
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => ${context.label}: ${context.parsed}%
                }
            },
            legend: { display: false }
        },
        cutout: '70%'
    }
});
