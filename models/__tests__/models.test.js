const supergoose = require('./supergoose');
const Category = require('../categories')
const category = new Category();

const Products = require('../products');
const products = new Products();

beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

// Jerome - category testing
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
    });

    // Jerome - Products model testing

    describe('Products Model', () => {
        test('can post() a new product', () => {
            let prod = {name:'Shoes', brand: 'BALENCIAGA', quality: 'Authentic' };
            return products.post(prod)
                .then(record => {
                    Object.keys(prod).forEach(val => {
                        expect(record[val]).toEqual(prod[val]);
                    });

                });
        });
    });


    test('can get() a product', () => {
        let prod = {name:'Shoes', brand: 'BALENCIAGA', quality: 'Authentic' };
        // let products2 = products;
        return products.post(prod)
            .then(record => {
                return products.get(record._id)
                    .then(product => {
                         prod.category = 'New shoe';
                        Object.keys(prod).forEach(val => {
                            expect(product[0][val]).toEqual(prod[val]);
                        })
                    }).catch(error => console.error(error));
            }).catch(error => console.error(error));
    });

    test('can put() a new Product', () => {
        let prod = {name:'Shoes', brand: 'BALENCIAGA', quality: 'Authentic' };
        return products.post(prod)
            .then(record => {
                let newProd = {name:'Watch', brand:'APPLE', quality:'Durable'};
                return products.put(record._id,newProd)
                    .then(output => {
                        expect(output.name).toBe('Watch');
            })
        })
    });

    test('can delete() a Product', () => {
        let prod = {name:'Shoes', brand: 'BALENCIAGA', quality: 'Authentic' };
        return products.post(prod)
            .then(record => {
                return products.delete(record._id)
                    .then(output => {
                        return products.get(record._id)
                            .then(item => {
                                expect(item[0]).toBe(undefined);
                            })
                    }).catch(error => console.error(error));
            }).catch(error => console.error(error));
    })

})