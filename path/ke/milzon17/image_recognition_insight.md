# Training Insight – Keras Image Recognition (MNIST)

## Purpose

Show a simple example of image recognition using a CNN on the MNIST dataset (handwritten digits), similar in concept to facial recognition but with number objects.

---

## Training Results

- **Train Accuracy (Epoch 3):** 98.17%
- **Validation Accuracy:** 98.45%
- **Test Accuracy:** 98.04%
- **Train–Val gap:** Very small → good generalization, no significant overfitting.

---

## Sample Prediction

- **Input:** Digit “9” image from the test dataset
- **Predicted:** `[9]` ✅ correct

---

## Interpretation

- The model converged quickly (within 3 epochs) due to a simple and well-preprocessed dataset.
- CNNs are effective at detecting spatial patterns (such as shapes and edges), which is the same principle used in facial recognition systems.

---

## Possible Improvements

- Increase epochs for a small accuracy boost
- Apply data augmentation for better noise robustness
- Test with real-world datasets to evaluate performance in practical applications (e.g., face unlock)

---

## CNN Architecture Diagram

```plaintext
Input Image (28x28 pixels)
        │
        ▼
[Conv2D] → Extract features (edges, curves, patterns)
        │
        ▼
[MaxPooling2D] → Reduce spatial size & retain important features
        │
        ▼
[Conv2D] → Learn more complex patterns
        │
        ▼
[MaxPooling2D]
        │
        ▼
[Flatten] → Convert 2D feature maps into 1D vector
        │
        ▼
[Dense Layer] → Fully connected neural network
        │
        ▼
[Output Layer] → 10 neurons (digits 0–9), Softmax activation
```
