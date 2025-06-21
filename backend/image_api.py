from flask import Flask, request, jsonify
from flask_cors import CORS
import tempfile
import os
from deep_image_analyzer import main as analyze_image
import json

app = Flask(__name__)
CORS(app)

@app.route('/analyze-image', methods=['POST'])
def analyze_image_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as tmp:
        file.save(tmp.name)
        tmp_path = tmp.name
    try:
        # Chama a função principal do deep_image_analyzer e captura o JSON
        from io import StringIO
        import sys
        old_stdout = sys.stdout
        sys.stdout = mystdout = StringIO()
        analyze_image(tmp_path)
        sys.stdout = old_stdout
        result_json = mystdout.getvalue()
        result = json.loads(result_json)
    except Exception as e:
        os.unlink(tmp_path)
        return jsonify({'error': str(e)}), 500
    os.unlink(tmp_path)
    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3001, debug=True) 