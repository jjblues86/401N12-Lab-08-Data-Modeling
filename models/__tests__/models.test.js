const supergoose = require('./supergoose');
const Category = require('../categories')
const category = new Category();

describe('Categories Model', () => {
    test('can post() a new category', () => {
        let obj = {name:'Test category'};
        return category.post(obj)
            .then(record => {
                Object.keys(obj).forEach(val => {
                    expect(record[0][val]).toEqual(obj[val]);
                });
            })
            .catch(err => console.error('Error', err));
    });

    test('can get() a new category', () => {
        let obj = {name:'Test category'};
        return category.post(obj)
            .then(record => {
                return category.get(record.id)
                    .then(item => {
                        Object.keys(obj).forEach(val => {
                            expect(item[0][val]).toEqual(obj[val]);
                        });
                    });
            });
    });

    test('can put() a new category', () => {
        let obj = {name:'Test category'};
        return category.post(obj)
            .then(record => {
                return category.put(record.id)
                    .then(item => {
                        Object.keys(obj).forEach(val => {
                            expect(item[0][val]).not.toEqual(obj[val]);
                        });
                    });
            });
    });
})