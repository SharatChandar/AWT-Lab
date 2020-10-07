let mongoose = require('mongoose');

let dataSchema = mongoose.Schema({
    id:{
      type: String,
      required: true
    },
    item:{
      type: String,
      required: true
    },
    qta:{
      type: String,
      required: true
    },
    price:{
      type: String,
      required: true
    }
});

let Data = module.exports = mongoose.model('data', dataSchema);
