const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  
    main_link:{
        type:String,
        required:true,
    },
    short_code:{
        type:String,
        required:true,
        unique:true,
    },
    expiry: { 
        type: Date, 
        default: Date.now
    },

});

module.exports = linkSchema;