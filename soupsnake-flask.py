# Don't touch this file unless you know what you are doing. You've been warned.
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template("soupsnake-index.html")

@app.route('/help')
def help():
    return render_template("soupsnake-help.html")

@app.route('/stablediffusion')
def stablediffusion():
    return render_template("soupsnake-sd.html")

@app.route('/genoptions')
def genoptions():   
    return render_template("soupsnake-genoptions.html")

# Uncomment the line below if you want to open the app to your local network.
# app.run(host='0.0.0.0') 
