var mongoose = require('mongoose');


var reviewSchema = new mongoose.Schema({
  name: String,
  text: String
});

var beerSchema = new mongoose.Schema({
    name: String,
    style: String,
    image_url: String,
    abv: Number,
    id: String,
    ratings: [Number],
    average: Number,
    review: [reviewSchema]
});



beerSchema.post('find', function (result) {

    for (var i = 0; i < result.length; i++) {
        if (result[i].ratings) {
            var sum = 0
            for (var j = 0; j < result[i].ratings.length; j++) {
                sum += result[i].ratings[j]
            }
            result[i].average = Math.round(sum / result[i].ratings.length)
        }
    }

});


beerSchema.post('findOneAndUpdate', function (result) {
    if (result.ratings) {
        var sum = 0
        for (var i = 0; i < result.ratings.length; i++) {
            sum += result.ratings[i]
        }
        result.average = Math.round(sum / result.ratings.length)
    }
});

var Beer = mongoose.model('beer', beerSchema)


module.exports = Beer