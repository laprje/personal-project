DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users_hash;
drop TABLE IF EXISTS users;
DROP TABLE IF EXISTS active_users;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR,
    profile_img TEXT,
    cars VARCHAR(255)
);

CREATE TABLE users_hash (
    hash_id SERIAL PRIMARY KEY,
    hash TEXT,
    user_id INT REFERENCES users(user_id)
);

CREATE TABLE active_users (
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    user_id INT REFERENCES users(user_id)
)

CREATE TABLE cars (
    make VARCHAR(20),
    model VARCHAR(20),
    release_date VARCHAR(40),
    price NUMERIC,
    drive_type VARCHAR(10),
    engine VARCHAR(20),
    body_type VARCHAR(20)
)