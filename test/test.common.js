const server = require('../server');

const chai = require('chai'),
	chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('404', () => {
	it("It should send 404 if api doesn't exists", (done) => {
		chai
			.request(server)
			.get("/api/v1/login")
			.end((err, res) => {
				res.status.should.be.equal(404);
				done();
			})
	})
})
describe('200', () => {
	it("It should send 200", (done) => {
		chai
			.request(server)
			.get("/")
			.end((err, res) => {
				res.status.should.be.equal(200);
				done();
			})
	})
})