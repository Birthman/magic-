from flask import Flask
from app.routes.wish import wish_bp

app = Flask(__name__, template_folder="templates")

app.register_blueprint(wish_bp)

if __name__ == "__main__":
    app.run(debug=True)
