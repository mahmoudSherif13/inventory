const mongoose = require("mongoose");
const Item = require("./models/item");
const Tag = require("./models/tag");

const dbUrl = "mongodb+srv://root:root@cluster0.npoou.mongodb.net/inventory?retryWrites=true&w=majority"
mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on("error", console.error.bind(console, 'MongoDB connection error:'));

const items = [];
const tags = [];

function createItem(name, description, tag, price, inStock){
    const item = new Item({
        name,
        description,
        tag,
        price,
        inStock
    });

    return item.save()
    .then((item)=>{
        console.log("added a new item " + item);
        items.push(item);
    })
    .catch((err)=>{
        console.log("an Error happened while trying to add a new item " + err);
    });
}
function createTag(name, description){
    
    const tag = new Tag({
        name,
        description
    });

    return tag.save()
    .then((tag)=>{
        console.log("added a new tag " + tag);
        tags.push(tag);
    })
    .catch((err)=>{
        console.log("an Error happened while trying to add a new tag " + err);
    });
}

function populateTags(){
    return createTag("Indie","")
    .then(_=>createTag("Action",""))
    .then(_=>createTag("Adventure", ""))
    .then(_=>createTag("Casual", ""))
    .then(_=>createTag("Simulation", ""));
}

function populateItems(){
    return createItem("Skul: The Hero Slayer", "good game", tags[0], 12, 100)
    .then(_=>createItem("DRAGON BALL Z: KAKAROT", "non", tags[1], 35, 400))
    .then(_=>createItem("Beyond: Two Souls", "who cares", tags[2], 18, 5))
}

populateTags()
.then(populateItems);