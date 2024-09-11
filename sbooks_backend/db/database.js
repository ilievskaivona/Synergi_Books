/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// postgres://postgres:postgres@127.0.0.1:5432/tmdb_dev"
const db_uri = process.env.PG_DB_CONNECTION.split(":")
uname = db_uri[1].split('//')[1];
pass = db_uri[2].split('@')[0];
host = db_uri[2].split('@')[1];
port = db_uri[3].split('/')[0];
db = db_uri[3].split('/')[1];

module.exports = {
	"development": {
		"username": uname,
		"password": pass,
		"database": db,
		"host": host,
		"port": port,
		"dialect": "postgres"
	}
};
