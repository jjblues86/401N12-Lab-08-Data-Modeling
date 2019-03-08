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

productSchema.post('init', function() {
    this.quality = this.quality.toUpperCase();
    console.log(this);
});

productSchema.post('save', function(){
    this.brand = this.brand.toUpperCase();
    console.log(this);
});

const product = mongoose.model('product', productSchema)


class Products {

    constructor() {
        this.database = [];
    }

    get(_id) {
        let searchObject = _id ? {_id} : {};
        return productSchema(searchObject);
    }

    post(entry) {
        let newEntry = new product(entry);
        return newEntry.save();
    }

    put(id, entry) {
    }

    delete(id) {
    }

    sanitize(entry) {
    }

}

module.exports = Products;