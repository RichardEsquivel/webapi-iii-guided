const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const hubsRouter = require('./hubs/hubs-router.js');
const morgan = require('morgan');//is a logger 

const server = express();
server.use(helmet());//third party
server.use(express.json());//built-in
function dateLogger(req, res, next) {//three amigos
	console.log(new Date().toISOString());

	next();
}



function gateKeeper(req, res, next) {
	//new way of reading data sent by the client, data can come in the body  in the url params, and the query string, and the headers
	const password = req.headers.password || '';
	if (!password) {
		res.status(400).json({ you: `I need a password!!!` })
	}

	else if (password.toLowerCase() === 'mellon') {
		next();
	} else {
		res.status(401).json({ you: 'cannot pass!!' });
	}

}

//global middleware

server.use(dateLogger());

server.use(morgan('dev'))
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


//no passwords in url temporary tokens in URL or in header
