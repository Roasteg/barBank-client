import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import session from 'express-session';
import sessionFileStore from 'session-file-store';

const FileStore = sessionFileStore(session)
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const {json} = require('body-parser');

polka() // You can also use Express
	.use(
		compression({threshold: 0}),
		json(),
		sirv('static', {dev}),
		session({
			secret: 'conduit',
			resave: false,
			saveUnitialized: true,
			cookie: {
				maxAge: 31536000
			},
			store: new FileStore({
				path: process.env.NOW ? '/tmp/sessions' : '.sesions'
			}),
		}),
		sapper.middleware({
			session: req => ({
				user: req.session && req.session.user,
				token: req.session && req.session.token
			})
		})
	)
	.listen(PORT, err => {
		if (err) console.log('error', err);
	});
