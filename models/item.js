const mongoose = require("mongoose");
const dbErrors = require("../dbErrorsMessages");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type:String,
        min:[3, dbErrors.fewChars],
        max:[500, dbErrors.manyChars],
        required:[true, dbErrors.required]
    },
    description: String,
    tag: {
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    },
    price: {
        type:Number,
        min:0
    },
    inStock: {
        type: Number,
        min: 0
    }
});

itemSchema.virtual("url")
.get(function(){
    return "/item/" + this._id;
});

module.exports = mongoose.model("Item", itemSchema);