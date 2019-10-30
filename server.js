const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');


const server = express();

function dateLoggerAndMethod(req, res, next) {//three amigos
	console.log(new Date().toISOString());
	console.log(`${req.baseURL}`)
	console.log(`${req.method}`);
	next();
}
//global middleware
server.use(helmet());//third party
server.use(express.json());//built-in
server.use(dateLoggerAndMethod);

//middlware only used in certain cases, restricting scope
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {//req, res the homies
	const nameInsert = (req.name) ? ` ${req.name}` : '';

	res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
