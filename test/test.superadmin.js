const server = require('../server'),
	testScript = require('./testScripts');

const chai = require('chai'),
	chaiHttp = require('chai-http'),
	faker = require('faker');

chai.use(chaiHttp);
chai.should();

describe('LOGIN', () => {
	var email = "";
	before(async () => {
		email = await testScript.getAdminEmail();
	})
	it("It should not allow admin to login if valid parameters are not provided", (done) => {
		let requestData = {
			email: "asdasd",
			password: ""
		};
		chai
			.request(server)
			.post("/api/v1/login")
			.send(requestData)
			.end((err, res) => {
				res.status.should.be.equal(400);
				res.body.message.should.be.equal("Invalid parameters");
				done();
			})
	})
	it("It should not allow admin to login if email doesn't exists on DB ", (done) => {
		let requestData = {
			email: faker.internet.email(),
			password: "test"
		};
		chai
			.request(server)
			.post("/api/v1/login")
			.send(requestData)
			.end((err, res) => {
				res.status.should.be.equal(400);
				res.body.message.should.be.equal("Email doesn't exists");
				done();
			})
	})
	it("It should not allow admin to login if password is wrong ", (done) => {
		let requestData = {
			email: email,
			password: "test"
		};
		chai
			.request(server)
			.post("/api/v1/login")
			.send(requestData)
			.end((err, res) => {
				res.status.should.be.equal(400);
				res.body.message.should.be.equal("Invalid password");
				done();
			})
	})
	it("It should allow admin to login if valid credentials is provided ", (done) => {
		let requestData = {
			email: email,
			password: "Test@123"
		};
		chai
			.request(server)
			.post("/api/v1/login")
			.send(requestData)
			.end((err, res) => {
				console.log(res.status)
				res.status.should.be.equal(200);
				done();
			})
	})
})