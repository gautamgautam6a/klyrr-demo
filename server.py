from flask import Flask, render_template, send_from_directory, jsonify
import os

app = Flask(__name__, static_folder='.', static_url_path='')

@app.route('/')
def index():
    """Serve the main HTML file"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files (CSS, JS, images)"""
    return send_from_directory('.', filename)

@app.route('/assets/<path:filename>')
def serve_assets(filename):
    """Serve assets with proper MIME types"""
    return send_from_directory('assets', filename)

@app.route('/api/contact', methods=['POST'])
def handle_contact():
    """Handle contact form submissions (placeholder)"""
    return jsonify({
        'status': 'success',
        'message': 'Thank you for your interest! This is a demo website.'
    })

@app.route('/api/newsletter', methods=['POST'])
def handle_newsletter():
    """Handle newsletter subscriptions (placeholder)"""
    return jsonify({
        'status': 'success',
        'message': 'Successfully subscribed to newsletter! (Demo)'
    })

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return send_from_directory('.', 'index.html')

if __name__ == '__main__':
    print("🚀 Starting Revnew Website Demo Server...")
    print("📍 Server will run at: http://localhost:5000")
    print("🔧 Press Ctrl+C to stop the server")
    print("\n✨ Website Features:")
    print("   - Responsive design")
    print("   - Interactive navigation")
    print("   - Smooth scrolling")
    print("   - Animated elements")
    print("   - Modal dialogs")
    print("   - Tab functionality")
    print("   - Mobile-friendly")
    print("\n" + "="*50)
    
    app.run(debug=True, host='0.0.0.0', port=5000) 