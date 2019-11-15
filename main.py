from flask import Flask, render_template, request
from predict import predict_class

app = Flask(__name__)

@app.route('/', method=['POST', 'GET'])
def home(request):
	error = None
	if request.method == 'POST':
		img = request.POST.get('canvasData')
		predicted_class = predict_class(img)
		return render_template('index.html', predicted_class=predicted_class)
	else:
		error = 'Error while prediction.'
	return render_template('index.html', error=error)