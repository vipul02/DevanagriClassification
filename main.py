from flask import Flask, render_template, request
from flask_wtf.csrf import CSRFProtect
import os
from predict import predict_class

SECRET_KEY = os.urandom(32)

app = Flask(__name__)
app.config['SECRET_KEY'] = SECRET_KEY
csrf = CSRFProtect(app)

@app.route('/', methods=['POST', 'GET'])
def home():
	error = None
	if request.method == 'POST':
		img = request.POST.get('canvasData')
		predicted_class = predict_class(img)
		return render_template('index.html', predicted_class=predicted_class)
	else:
		error = 'Error while prediction.'
	return render_template('index.html', error=error)