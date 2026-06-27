import cv2
import numpy as np

# Load the satellite image
img = cv2.imread('/Users/ram/Desktop/Campus Tour - SMRU/public/campus-guide/images/campus-satellite.jpg')
if img is not None:
    print("Satellite image loaded, dimensions:", img.shape)
else:
    print("Could not load image")
