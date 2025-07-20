import * as tf from '@tensorflow/tfjs';

// Initialize TensorFlow.js
let modelLoaded = false;
let model = null;

// Load a pre-trained MobileNet model for feature extraction
export const initializeModel = async () => {
  if (modelLoaded) return model;
  
  try {
    // Load MobileNet model for feature extraction
    model = await tf.loadLayersModel('https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/feature_vector/3/default/1', {
      fromTFHub: true
    });
    modelLoaded = true;
    console.log('TensorFlow.js model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading TensorFlow.js model:', error);
    // Fallback to a simpler approach if model loading fails
    return null;
  }
};

// Preprocess image for the model
const preprocessImage = (imageElement) => {
  return tf.tidy(() => {
    // Convert image to tensor
    const tensor = tf.browser.fromPixels(imageElement);
    
    // Resize to 224x224 (MobileNet input size)
    const resized = tf.image.resizeBilinear(tensor, [224, 224]);
    
    // Normalize pixel values to [0, 1]
    const normalized = resized.div(255.0);
    
    // Add batch dimension
    const batched = normalized.expandDims(0);
    
    return batched;
  });
};

// Extract features from an image using the CNN model
export const extractImageFeatures = async (imageFile) => {
  try {
    // Ensure model is loaded
    if (!model) {
      await initializeModel();
    }
    
    if (!model) {
      // Fallback to simple hash if model fails
      return await getImageHash(imageFile);
    }
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = async () => {
        try {
          // Preprocess the image
          const preprocessed = preprocessImage(img);
          
          // Extract features using the model
          const features = await model.predict(preprocessed).data();
          
          // Clean up tensors
          preprocessed.dispose();
          
          // Convert to array for easier comparison
          resolve(Array.from(features));
        } catch (error) {
          console.error('Error extracting features:', error);
          // Fallback to hash
          const hash = await getImageHash(imageFile);
          resolve(hash);
        }
      };
      
      img.onerror = async () => {
        console.error('Error loading image for feature extraction');
        // Fallback to hash
        const hash = await getImageHash(imageFile);
        resolve(hash);
      };
      
      // Create object URL for the image
      const objectURL = URL.createObjectURL(imageFile);
      img.src = objectURL;
    });
  } catch (error) {
    console.error('Error in feature extraction:', error);
    // Fallback to simple hash
    return await getImageHash(imageFile);
  }
};

// Calculate cosine similarity between two feature vectors
export const calculateSimilarity = (features1, features2) => {
  if (!features1 || !features2) return 0;
  
  // If features are strings (hashes), compare directly
  if (typeof features1 === 'string' && typeof features2 === 'string') {
    return features1 === features2 ? 1.0 : 0.0;
  }
  
  // If features are arrays (CNN features), calculate cosine similarity
  if (Array.isArray(features1) && Array.isArray(features2)) {
    if (features1.length !== features2.length) return 0;
    
    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;
    
    for (let i = 0; i < features1.length; i++) {
      dotProduct += features1[i] * features2[i];
      norm1 += features1[i] * features1[i];
      norm2 += features2[i] * features2[i];
    }
    
    if (norm1 === 0 || norm2 === 0) return 0;
    
    const similarity = dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
    return Math.max(0, Math.min(1, similarity)); // Clamp between 0 and 1
  }
  
  return 0;
};

// Fallback: Simple image hash for comparison
const getImageHash = async (imageFile) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Resize to small size for hashing
        canvas.width = 8;
        canvas.height = 8;
        ctx.drawImage(img, 0, 0, 8, 8);
        
        // Get image data and create simple hash
        const imageData = ctx.getImageData(0, 0, 8, 8);
        const data = imageData.data;
        
        let hash = '';
        for (let i = 0; i < data.length; i += 4) {
          // Use RGB values (ignore alpha)
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          hash += avg > 128 ? '1' : '0';
        }
        
        resolve(hash);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(imageFile);
  });
};

// Compare multiple image pairs
export const compareImageSets = async (sellerImages, buyerImages) => {
  const results = [];
  
  for (let i = 0; i < Math.min(sellerImages.length, buyerImages.length); i++) {
    if (sellerImages[i]?.file && buyerImages[i]?.file) {
      try {
        const sellerFeatures = await extractImageFeatures(sellerImages[i].file);
        const buyerFeatures = await extractImageFeatures(buyerImages[i].file);
        
        const similarity = calculateSimilarity(sellerFeatures, buyerFeatures);
        
        results.push({
          index: i,
          similarity: similarity,
          sellerFile: sellerImages[i].file.name,
          buyerFile: buyerImages[i].file.name
        });
      } catch (error) {
        console.error(`Error comparing images at index ${i}:`, error);
        results.push({
          index: i,
          similarity: 0,
          error: error.message
        });
      }
    }
  }
  
  return results;
};