#!/usr/bin/env python3
"""
Automated setup script for the Revnew website clone
This script will install dependencies, create placeholder images, and start the server
"""

import subprocess
import sys
import os
import webbrowser
import time

def run_command(command, description):
    """Run a shell command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True, timeout=60)
        if result.returncode == 0:
            print(f"✅ {description} completed successfully!")
            return True
        else:
            print(f"❌ {description} failed:")
            print(result.stderr)
            return False
    except subprocess.TimeoutExpired:
        print(f"⏰ {description} timed out!")
        return False
    except Exception as e:
        print(f"❌ Error during {description}: {e}")
        return False

def check_python():
    """Check if Python is available and version is compatible"""
    try:
        version = sys.version_info
        if version.major >= 3 and version.minor >= 7:
            print(f"✅ Python {version.major}.{version.minor}.{version.micro} is compatible!")
            return True
        else:
            print(f"❌ Python {version.major}.{version.minor} is too old. Requires Python 3.7+")
            return False
    except Exception as e:
        print(f"❌ Could not check Python version: {e}")
        return False

def main():
    """Main setup function"""
    print("=" * 60)
    print("🚀 REVNEW WEBSITE CLONE - AUTOMATED SETUP")
    print("=" * 60)
    print("This script will:")
    print("  1. Check Python compatibility")
    print("  2. Install required packages")
    print("  3. Create placeholder images")
    print("  4. Start the development server")
    print("  5. Open the website in your browser")
    print("=" * 60)
    
    # Check Python version
    if not check_python():
        print("\n❌ Setup failed: Incompatible Python version")
        input("Press Enter to exit...")
        return
    
    # Install dependencies
    print("\n📦 Installing Python packages...")
    packages = ["Flask", "Pillow", "Werkzeug"]
    for package in packages:
        success = run_command(f"python -m pip install {package}", f"Installing {package}")
        if not success:
            print(f"\n❌ Setup failed: Could not install {package}")
            input("Press Enter to exit...")
            return
    
    # Create placeholder images
    print("\n🎨 Creating placeholder images...")
    if os.path.exists("create_placeholders.py"):
        success = run_command("python create_placeholders.py", "Creating placeholder images")
        if not success:
            print("\n⚠️ Warning: Could not create placeholder images, but continuing...")
    else:
        print("⚠️ Warning: create_placeholders.py not found, skipping...")
    
    # Check if all required files exist
    required_files = ["index.html", "styles.css", "script.js", "server.py"]
    missing_files = [f for f in required_files if not os.path.exists(f)]
    
    if missing_files:
        print(f"\n❌ Setup failed: Missing required files: {', '.join(missing_files)}")
        input("Press Enter to exit...")
        return
    
    print("\n🎉 Setup completed successfully!")
    print("\n" + "=" * 60)
    print("🌐 STARTING DEVELOPMENT SERVER")
    print("=" * 60)
    print("📍 Local URL: http://localhost:5000")
    print("🔧 Press Ctrl+C to stop the server")
    print("📱 The website is fully responsive and mobile-friendly")
    print("✨ Features: Interactive navigation, smooth animations, modal dialogs")
    print("=" * 60)
    
    # Wait a moment then open browser
    print("\n🚀 Starting server in 3 seconds...")
    time.sleep(3)
    
    try:
        # Start the server
        print("Starting Flask development server...")
        print("Opening browser in 5 seconds...")
        
        # Open browser after a delay
        import threading
        def open_browser():
            time.sleep(5)
            try:
                webbrowser.open("http://localhost:5000")
                print("🌐 Browser opened automatically!")
            except:
                print("⚠️ Could not open browser automatically. Please visit: http://localhost:5000")
        
        browser_thread = threading.Thread(target=open_browser)
        browser_thread.daemon = True
        browser_thread.start()
        
        # Start server (this will block)
        subprocess.run(["python", "server.py"])
        
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
        print("Thank you for trying the Revnew website clone!")
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        print("Try running manually: python server.py")
    
    input("\nPress Enter to exit...")

if __name__ == "__main__":
    main() 