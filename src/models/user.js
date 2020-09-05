const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    username:{
        type: String, required: true, index:{unique: true}
    },
    email: {
        type: String, required: true, index:{unique: true}
    },
    password: {
        type: String, required: true
    },
    avatar: {
        type: String
    }
},{ timestamps: true});
// setting timestamps equal to true adds createdAt and updatedAt fields to the model

const User = new model("User", userSchema);

module.exports = User;
