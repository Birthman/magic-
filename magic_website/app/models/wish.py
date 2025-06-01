from flask import Blueprint, request, jsonify
import random

wish_bp = Blueprint("wish", __name__)

# ✅ Only this replies list should exist
replies = [
    'Wish "{wish}" received by the Jinni!',
    'The Jinni hears: "{wish}" — perhaps it shall be granted.',
    '"{wish}" floats into the stars... wait and watch.',
    '✨ "{wish}" is now carried by the winds of fate.',
    'The Book of Wishes has accepted: "{wish}".'
]

@wish_bp.route("/api/wish", methods=["POST"])
def interpret_wish():
    data = request.get_json()
    wish = data.get("wish", "").strip()

    print("Received wish:", repr(wish))  # debug log

    if not wish:
        return jsonify({"message": "No wish provided."}), 400

    response = random.choice(replies).format(wish=wish)
    return jsonify({"message": response})
