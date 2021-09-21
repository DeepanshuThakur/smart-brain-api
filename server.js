import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js'
import { handleImage,  handleAPICall } from './controllers/image.js';

const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  port : 5432,
	  user : 'deepanshu',
	  password : '1234',
	  database : 'smart_brain'
	}
      });

// db.select('*').from('users').then(data => {
// 	console.log(data);
// });

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.options('*', cors());


app.get('/', (req, res) => {
	res.send('success');
})

app.get('/profile/:id', (req, res) => handleProfileGet(req, res, db))

app.post('/signin', (req, res) => handleSignIn(req, res, db, bcrypt))

app.post('/register', (req, res) => handleRegister(req, res, db, bcrypt) )

app.put('/image', (req, res) => handleImage(req, res, db))

app.post('/imageurl', (req, res) => handleAPICall(req, res))



// Load the hash from your password DB
// bcrypt.compare("bacon", hash, function(err, res) {
// 	// res == true
// })
// bcrypt.compare("bacon", hash, function(err, res) {
// 	// res == false
// })

app.listen(3000, () => {
	console.log('app is running on port 3000');
})
