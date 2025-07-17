const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://myminton_user:yourPassword123@mymintoncluster.vioenjg.mongodb.net/MyMintonDB?retryWrites=true&w=majority&appName=MyMintonCluster')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

