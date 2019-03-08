const supergoose = require('./supergoose');
const Category = require('../categories')
const category = new Category();

describe('Categories Model', () => {
    test('can post() a new category', () => {
        let obj = {name:'Test category'};
        return category.post(obj)
            .then(record => {
                Object.keys(obj).forEach(val => {
                    expect(record[val]).toEqual(obj[val]);
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
                let categoryObj = {name:'Test id'};
                return category.put(record.id,categoryObj)
                    .then(item => {
                            expect(item.name).toBe('Test id');

                    });
            });
    });

    test('can delete() a category', () => {
        let obj = {name:'Test category'};
        return category.post(obj)
            .then(record => {
                return category.delete(record.id)
                    .then(outcome => {
                return category.get(record.id)
                    .then(item => {
                        expect(item[0]).toBe(undefined);
                    })

                    })
            })
    })
})