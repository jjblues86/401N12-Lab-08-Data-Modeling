'use strict';

const uuid = require('uuid/v4');

const schema = {
    id: {required:true},
    name: {required:true},
};

class Categories {

    constructor() {
        this.database = [];
    }

    get(id) {
        let outcome = id ? this.database.filter((record) => record.id === id ) : this.database;
        return Promise.resolve(outcome);
    }

    post(record) {
        record.id = uuid();
        let records = this.sanitize(record);
        if(record.id) { this.database.push(record); }
        return Promise.resolve(records);
    }

    put(id, record) {
        let records = this.sanitize(record);
        if(records.id) { this.database.map((item) => (item.id === id) ? record : item);}
        return Promise.resolve(records);
    }

    delete(id) {
    }

    sanitize(record) {

        let valid = true;
        let records = {};

        Object.keys(schema).forEach( field => {
            if(schema[field].required) {
                if(record[field]) {
                    records[field] = record[field];
                } else {
                    valid = false;
                }
            }
            else {
                records[field] = record[field];
            }
        });

        return valid ? record : undefined;
    }

}

module.exports = Categories;