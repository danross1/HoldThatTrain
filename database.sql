CREATE TABLE person (
	id SERIAL PRIMARY KEY,
	username VARCHAR(20) UNIQUE NOT NULL,
	password VARCHAR(200) NOT NULL,
	phone VARCHAR(10) UNIQUE NOT NULL
);

CREATE TABLE directions (
	id INT PRIMARY KEY,
	direction VARCHAR(5) NOT NULL
);

CREATE TABLE routes (
	id INT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

CREATE TABLE stations (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	identifier VARCHAR(4) NOT NULL
);

CREATE TABLE stops (
	id SERIAL PRIMARY KEY,
	route_id INT NOT NULL references routes (id),
	direction INT NOT NULL references directions (id),
	station_id INT NOT NULL references stations (id)
);

CREATE TABLE alerts (
	id SERIAL PRIMARY KEY,
	user_id INT references person (id),
	name VARCHAR(50) NOT NULL,
	stop_id INT NOT NULL references stops (id),
	direction INT NOT NULL references directions (id),
	when_to_alert INT NOT NULL,
	active BOOLEAN NOT NULL DEFAULT true
);