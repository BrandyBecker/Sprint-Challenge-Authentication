const request = require('supertest')
const server = require('./server.js')

it('should set the DB ENV to testing', function(){
    expect(process.env.DB_ENV).toBe("testing");
})

describe("server", function(){
    describe("GET /", function(){
        it('should return a 200 OK', function(){
            return request(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
    })
})