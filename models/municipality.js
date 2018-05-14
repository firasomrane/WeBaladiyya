'use strict';

var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/youthcan');
var searchPlugin = require('mongoose-search-plugin');

var municipalityModel = function(){
  var municipalitySchema = mongoose.Schema({
    gouvernorat: String,
    municname: String,
    promesses: [{
        sport:[{
          titre: String,
          description: String,
          last_update: Date,
          checked: String
        }],
        environnement: [{
          avancement: Number,
          titre: String,
          description: String,
          last_update: Date,
          checked: String
        }],
        rues: [{
          avancement: Number,
          titre: String,
          description: String,
          last_update: Date,
          checked: String
        }],
        associations: [{
          avancement: Number,
          titre: String,
          description: String,
          last_update: Date,
          checked: String
        }]
    }],
    parti: String,
  },{ collection: 'municipality' });

  municipalitySchema.plugin(searchPlugin, {
    fields: ['municname']
  });

  return mongoose.model('Municipality', municipalitySchema);
}

module.exports = new municipalityModel();
