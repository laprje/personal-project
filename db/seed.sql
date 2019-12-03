DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users_hash;
drop TABLE IF EXISTS users;

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