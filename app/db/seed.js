
import Database from "better-sqlite3";
const db = new Database('db.sqlite', { fileMustExist:false });

db.exec(`CREATE TABLE IF NOT EXISTS Users (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	surname TEXT NOT NULL,
	email TEXT NOT NULL,
	phone TEXT NOT NULL
);

INSERT INTO Users (name,surname,email,phone) VALUES ('aa','AA','aa@com.kz','123');
INSERT INTO Users (name,surname,email,phone) VALUES ('bb','BB','bb@com.kz','456');
INSERT INTO Users (name,surname,email,phone) VALUES ('cc','CC','cc@com.kz','789');
INSERT INTO Users (name,surname,email,phone) VALUES ('dd','DD','dd@com.kz','555');
`)