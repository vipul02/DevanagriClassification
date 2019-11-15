from keras.models import load_model

# for image processing
import numpy as np
import cv2
from io import BytesIO
from PIL import Image, ImageOps
import base64
import re

def processImage(image):
	image = re.search(r'base64,(.*)', image).group(1)
	image = Image.open(BytesIO(base64.b64decode(image)))
	# converting white background to black and black text to white like the devanagri dataset
	image = ImageOps.invert(image) 
	image = np.array(image)
	image /= 255
	image = image.reshape(1, 32, 32, 1).astype('float32')
	return image

def predict_class(image):
	model = load_model('cnn_hindi.h5')
	image = processImage(image)
	return model.predict_classes(image)[0]
