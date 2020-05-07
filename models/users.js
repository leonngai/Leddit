var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

require('mongoose-type-email').loadType(mongoose);
var Email = mongoose.Types.Email;

var User = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: Email,
        required: true,
        unique: true
    },
    admin: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
        usePushEach: true
    });

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', user);