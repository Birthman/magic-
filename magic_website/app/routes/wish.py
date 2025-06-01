from flask import Blueprint, render_template, request, jsonify

wish_bp = Blueprint('wish', __name__)

# Show the HTML page
@wish_bp.route('/')
def home():
    return render_template('index.html')

# Handle wish POST
@wish_bp.route('/api/wish', methods=['POST'])
def make_wish():
    data = request.get_json()
    wish_text = data.get('wish')
    if not wish_text:
        return jsonify({'message': 'No wish provided'}), 400

    # Here you'd save it to a database if desired
    print(f"New wish received: {wish_text}")

    return jsonify({'message': f'Wish "{wish_text}" received by the Jinni!'})

