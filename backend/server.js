require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product');  

// Create an Express application
const app = express();

app.use(cors()); 
app.use(express.json());  

console.log("Connecting to MongoDB at:", process.env.MONGODB_URL);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Get all products, remove duplicate
app.get('/products', async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $group: {
          _id: "$image",  
          doc: { $first: "$$ROOT" }  
        }
      },
      {
        $replaceRoot: { newRoot: "$doc" }  
      }
    ]);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err });
  }
});

// Get product by ID 
app.get('/products/:id', (req, res) => {
  const id = req.params.id;

  if (mongoose.Types.ObjectId.isValid(id)) {
    // Try finding as ObjectId first
    Product.findById(id)
      .then(product => {
        if (product) return res.json(product);

        // If not found as ObjectId, try as string _id
        return Product.findOne({ _id: id }).then(stringProduct => {
          if (!stringProduct) return res.status(404).json({ message: 'Product not found' });
          res.json(stringProduct);
        });
      })
      .catch(err => {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error', error: err });
      });
  } else {
    // Try directly as a string _id
    Product.findOne({ _id: id })
      .then(product => {
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
      })
      .catch(err => {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error', error: err });
      });
  }
});

// Create a new product
app.post('/products', (req, res) => {
  const { name, price, description, image } = req.body;  // Get product data from the request body

  // Create a new Product object
  const newProduct = new Product({ name, price, description, image });

  newProduct.save()  // Save the new product to the database
    .then(() => res.status(201).json(newProduct))
    .catch(err => res.status(500).json({ message: 'Failed to create product', error: err }));
});

app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Listen for incoming requests
const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => console.log(`Server running on port ${port}`));

//Delete 
app.delete('/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', product: deleted });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
});
