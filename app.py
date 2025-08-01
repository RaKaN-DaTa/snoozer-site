# 📌 استدعاء المكتبات
from flask import Flask, render_template, request, jsonify
import json
import os

# 🟣 إنشاء تطبيق Flask
app = Flask(__name__)

# 📄 الصفحة الرئيسية
@app.route("/")
def index():
    return render_template("index.html")  # ✅ يفتح واجهة الموقع

# 🔍 البحث عن محفظة
@app.route("/check_wallet", methods=["POST"])
def check_wallet():
    wallet_address = request.json.get("wallet")  # يأخذ العنوان من الطلب

    # 📂 فتح ملف JSON
    with open("winner.json", "r") as f:
        data = json.load(f)["wallets"]

    # 🔑 إيجاد المحافظ المطابقة (بحيث الحروف الكبيرة والصغيرة ما تفرق)
    matching_wallets = [w for w in data if w["address"].lower() == wallet_address.lower()]

    # 🚫 إذا ما فيه محافظ
    if not matching_wallets:
        return jsonify({"found": False, "message": "😴 Keep trying! You haven't won yet."})

    # ✅ حساب المجموع وأخذ أقل ترتيب
    total_tokens = sum(w["tokensWon"] for w in matching_wallets)
    best_rank = min(w["rank"] for w in matching_wallets)

    return jsonify({
        "found": True,
        "wallet": wallet_address,
        "tokensWon": total_tokens,
        "rank": best_rank,
        "message": "🎉 Congrats! You have won some tokens!"
    })

# ▶️ تشغيل السيرفر
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)