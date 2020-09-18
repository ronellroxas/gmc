const mongoose = require('mongoose');

/**
 * Schema for band DB
 * _id - generated id provided by mongodb
 * name - name of artist
 * history - history/description of artist
 * types - type of the artist. (band, solo, instrumentals, etc.)
 * images - images of the artist
 * artists - list of artists in the band
 */
const band_schema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    history: { type: String, required: [true, "No history given."] },
    types: { type: [String], required: [true, "None"] },
    images: { type: [String] },
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }]

});

const band_model = mongoose.model('Band', band_schema);

/**
 * Get one instance of band given a filter.
 * Gets the first instance found in DB
 * 
 * Parameters:
 * filter - search filter
 * 
 * Return:
 * callback - callback for found band instance
 */
exports.get_one = function(filter, callback) {
    band_model.findOne(filter, function(err, band) {
        if (err) throw err;

        callback(band.toObject());
    });
}

/**
 * Get all instances of bands given a filter.
 * Gets all instances in DB.
 * 
 * Parameters:
 * filter - search filter
 * 
 * Return:
 * callback - callback for found band instance
 */
exports.get_all = function(filter, callback) {
    band_model.find(filter, function(err, bands) {
        if (err) throw err;
        var band_objects = [];

        bands.forEach(function(band) {
            band_objects.push(band.toObject());
        });

        callback(band_objects);
    });
}