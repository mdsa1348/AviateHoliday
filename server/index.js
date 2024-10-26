const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const demo = require('./routes/auth'); // Import your dataRoutes
const country = require('./routes/country'); // Import your dataRoutes
const countryDetails = require('./routes/countrydetails'); // Import your dataRoutes
const InExCluDetails = require('./routes/inexcludetails'); // Import your dataRoutes
const inExClusion = require('./routes/inExclusions'); // Import your dataRoutes
const booking = require('./routes/booking'); // Import your dataRoutes
const FormData = require('./routes/dataRoutes'); // Import your dataRoutes

const path = require('path'); // Ensure path module is imported
const connection = require('./config');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit to 50MB or more if needed
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(bodyParser.json());


// Serve static files from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/countrydetails', express.static(path.join(__dirname, 'countrydetails')));
app.use('/packageImage', express.static(path.join(__dirname, 'packageImage')));



// Use your dataRoutes
app.use('/api', demo); // This will prefix all your dataRoutes with '/api'
app.use('/api', country); // This will prefix all your dataRoutes with '/api'
app.use('/api', countryDetails);
app.use('/api', InExCluDetails);
app.use('/api', inExClusion);
app.use('/api', booking);
app.use('/api', FormData);

async function startServer() {
  try {
    await connection.getConnection();
    console.log('Connected to MySQL database');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

startServer();
