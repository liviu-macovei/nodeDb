/**
 * Created by Live on 26-May-16.
 */
// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    firstname: { type: String},
    lastname:{ type: String},
    email: { type: String},
    username: { type: String, unique: true },
    password: { type: String },
    birthdate: { type: Date},
    gender:{ type: String},
    interestedId:{ type: String},
    occupation:{ type: String},
    hobby:{ type: String},
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

// the schema is useless so far
// we need to create a model using it
var User = module.exports = mongoose.model('User',userSchema,'users');

//Get User

module.exports.getUsers = function (callback , limit) {
    User.find(callback).limit(limit);
};
//Get User
module.exports.getUserById = function (id,callback) {
    User.findOne(id ,callback);
};
//Add user
module.exports.addUser = function(user, callback){
    User.create(user,callback);
};
//Update user
module.exports.updateUserWithId = function(id,user,option,callback){
    var query = {_id:id}
    User.findOneAndUpdate(query, user,option,callback);
};
module.exports.deleteUser = function(id,callback){
    var query = {_id:id};
    User.remove(query,callback);
}