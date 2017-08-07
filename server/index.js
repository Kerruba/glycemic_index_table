'use strict';

const app = require('./config.js').app;
const db = require('./config.js').database.connection;
const aliments = require('./routes/alimentsRoutes');
const meals = require('./routes/mealsRoutes');

// Routes
app.use('/aliments', aliments);
app.use('/meals', meals);

// Start application
app.listen(3000, function() {
    'use strict';
    console.log('Example app listening on port 3000!');
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('We are conntected');
});