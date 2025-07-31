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
    app.run(debug=True)