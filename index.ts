import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS middleware
import cricketRoutes from './server/routes/routes'; // Add the `.js` extension for ES modules

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({ origin: '*' })); // Allow all origins
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

// Routes
app.use('/backend/cricket', cricketRoutes);

app.get('/', (req, res) => {
  res.send('Cricket Scoring Application');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
