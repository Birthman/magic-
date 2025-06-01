from flask import Flask

def create_app():
    app = Flask(__name__)

    # Import and register Blueprints
    from .routes.wish import wish_bp
    app.register_blueprint(wish_bp)

    return app
