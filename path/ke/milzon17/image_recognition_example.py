"""
HW17 - Exploring Image Recognition
Example: Facial Recognition on Smartphone

- Example description & benefits/drawbacks in comments
- Simple Keras CNN model for digit recognition (stand-in for facial recognition)
"""

import numpy as np
from tensorflow import keras
from tensorflow.keras import layers

# ------------------------------
# Example Description
# ------------------------------
# Real-world example: Facial Recognition on Smartphones
# How it works:
# - Camera captures an image of the face
# - Image is converted into numerical pixel values
# - A trained deep learning model (usually CNN-based) compares the face features
#   against stored user templates
# - If similarity is above threshold, device unlocks
#
# Benefits:
# - Fast and convenient authentication
# - No need to remember passwords
#
# Drawbacks:
# - Privacy concerns (biometric data storage)
# - Can be fooled by photos or 3D masks if system is weak

# ------------------------------
# Sample Model (Image Recognition)
# ------------------------------

# Load MNIST digits dataset (28x28 grayscale)
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

# Normalize pixel values to 0–1
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

# Add channel dimension (CNN expects shape: height, width, channels)
x_train = np.expand_dims(x_train, -1)
x_test = np.expand_dims(x_test, -1)

num_classes = 10

# One-hot encode labels
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

# Build CNN model
model = keras.Sequential([
    layers.Conv2D(32, kernel_size=(3, 3), activation="relu", input_shape=(28, 28, 1)),
    layers.MaxPooling2D(pool_size=(2, 2)),
    layers.Flatten(),
    layers.Dense(64, activation="relu"),
    layers.Dense(num_classes, activation="softmax")
])

# Compile
model.compile(optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"])

# Train
model.fit(x_train, y_train, batch_size=128, epochs=3, validation_split=0.1)

# Evaluate
test_loss, test_acc = model.evaluate(x_test, y_test, verbose=0)
print(f"Test Accuracy: {test_acc:.4f}")

# Predict on a random sample
idx = np.random.randint(0, len(x_test))
sample = np.expand_dims(x_test[idx], 0)
pred_class = np.argmax(model.predict(sample), axis=1)
print(f"Predicted class: {pred_class}, True class: {np.argmax(y_test[idx])}")
