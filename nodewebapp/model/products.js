var mongoose = require('mongoose');  
var productSchema = new mongoose.Schema({
  name: String,
  description: String
});
mongoose.model('Product', productSchema);