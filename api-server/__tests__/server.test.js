
const {server} = require('../src/app.js');// JEROME - This is called destructuring
const supergoose = require('./supergoose');
const supertest = require('supertest');
const mockRequest = supertest(server);// JEROME - Creating an instance of superTest with the server i created


beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

// Jerome - Test category routes
describe('CATEGORY TEST ROUTES', () => {
    test('can POST() a new /category route', () => {

        return mockRequest // JEROME- This is a JS promise
            .post('/categories') // INPUT
            .send({name:'Test Category'})
            .then(record => {
                expect(record.body.name).toEqual('Test Category')
                expect(record.status).toBe(200)
            });
    });

    test('can GET() a new /category:id route', () => {

        return mockRequest // JEROME- This is a JS promise
            .post('/categories') // INPUT
            .send({name:'Test Category'})
            .then(record => {
                return mockRequest
                    .get(`/categories/${record.body.id}`)
                    .then(records => {
                        console.log(records.body)
                        expect(records.body[0].name).toBe('Test Category')
                        expect(records.status).toBe(200)
                    });
            });
    });

    test('can GET() a new /category', () => {

        return mockRequest // JEROME- This is a JS promise
            .post('/categories') // INPUT
            .send({name:'Test Category'})
            .then(record => {
                return mockRequest
                            .get('/categories')
                            .then(record2 => {
                                console.log(record2.body)
                                expect(record2.body.results[0].name).toBe('Test Category')
                                expect(record2.body.results[0].name).toBe('Test Category')
                                expect(record2.status).toBe(200)
                            });
            });
    });


    test('can PUT() a new /category route', () => {

        return mockRequest // JEROME- This is a JS promise
            .post('/categories') // INPUT
            .send({name:'Test Category'})
            .then(record => {
                return mockRequest
                    .put(`/categories/${record.body.id}`)
                    .send({name:'Test Category'})
                    .then(record1 => {
                        expect(record1.body.name).toBe('Test Category')
                        expect(record1.status).toBe(200)
                    });
            });
    });

    test('can DELETE() a /category id', () => {

        return mockRequest // JEROME- This is a JS promise
            .post('/categories') // INPUT
            .send({name:'Test Category'})
            .then(record => {
                return mockRequest
                    .delete(`/categories/${record.body.id}`)
                    .then(record1 => {
                                expect(record1.status).toBe(200)
                    });
            });
    });

});

// Jerome- Test Products Routes
describe('PRODUCTS TEST ROUTES', () => {
    test('can POST() a /products route', () => {

        return mockRequest // JEROME- This is a JS promise
            .post('/products') // INPUT
            .send({name:'Shoes', brand: 'BALENCIAGA', quality: 'Authentic'})
            .then(record => {
                expect(record.body.name).toBe('Shoes')
                expect(record.status).toBe(200)
            });
    });

    test('can GET() a /products:id route', () => {

        return mockRequest // JEROME- This is a JS promise
            .post('/products') //INPUT
            .send({name:'Shoes', brand: 'BALENCIAGA', quality: 'Authentic'})
            .then(record => {
                return mockRequest
                    .get(`/products/${record.body.id}`)
                    .then(records => {
                        console.log(records.body)
                        expect(records.body[0].name).toBe('Shoes')
                        expect(records.status).toBe(200)
                    });

            });
    });

    test('can PUT() a new /product route', () => {
        return mockRequest // JEROME- This is a JS promise
            .post('/products')// INPUT
            .send({name:'Shoes', brand: 'BALENCIAGA', quality: 'Authentic'})
            .then(record => {
                return mockRequest
                    .put(`/products/${record.body.id}`)
                    .then( records => {
                        expect(records.body.name).toBe('Shoes');
                        expect(records.status).toBe(200);
                    });
            });

    });

    test('can DELETE() a /product route', () => {

        return mockRequest // JEROME- This is a JS promise
            .post('/products') // INPUT
            .send({name:'Shoes', brand: 'BALENCIAGA', quality: 'Authentic'})
            .then(record => {
                return mockRequest
                    .delete(`/products/${record.body.id}`)
                    .then( records => {
                        expect(records.status).toBe(200);
                    });
            });


    });
})
