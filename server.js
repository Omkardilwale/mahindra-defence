const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/railway_incidents', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const incidentSchema = new mongoose.Schema({
  incidentType: String,
  subtype: String,
  gender: String,
  description: String,
  location: String,
  itemsRobbed: [String],
});
const Incident = mongoose.model('Incident', incidentSchema);

app.post('/api/incidents', async (req, res) => {
  try {
    const newIncident = new Incident(req.body);
    await newIncident.save();
    res.status(201).json(newIncident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/incidents', async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.status(200).json(incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
