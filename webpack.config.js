const path = require('path');

module.exports = {
    entry: './js/script.js', // Replace with your entry file
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
