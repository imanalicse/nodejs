var mongoose = require('mongoose');  
var productSchema = new mongoose.Schema({
  name: String
});
mongoose.model('Product', productSchema);