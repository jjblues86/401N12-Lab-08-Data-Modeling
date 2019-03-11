'use strict';

const uuid = require('uuid/v4');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    quality: { type: String, required: true }
});

productSchema.post('find', function() {
    this.name = this.name.toUpperCase();
    console.log(this);

});


const product = mongoose.model('product', productSchema);




class Products {

    constructor() {
        this.database = [];
    }

    get(_id) {
        let searchObject = _id ? {_id} : {};

        return product(searchObject);

    }

    post(entry) {
        let newEntry = new product(entry);
        return newEntry.save();
    }

    put(_id, entry) {
        return product.findOneAndUpdate(_id, entry, {new:true});
    }

    delete(_id) {
        return product.findOneAndDelete(_id);
    }


}

module.exports = Products;