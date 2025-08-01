# 📌 استدعاء المكتبات المطلوبة
from flask import Flask, render_template

# 🟣 إنشاء تطبيق Flask
app = Flask(__name__)

# 🟣 الصفحة الرئيسية
@app.route("/")
def index():
    return render_template("index.html")

# 🟣 تشغيل السيرفر
if __name__ == "__main__":
    import os  # نستورد مكتبة os عشان نجيب رقم البورت
    port = int(os.environ.get("PORT", 5000))  # إذا ما فيه رقم بورت يستخدم 5000
    app.run(host="0.0.0.0", port=port, debug=True)  # نخلي الموقع يشتغل على 0.0.0.0