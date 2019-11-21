DELETE FROM users_hash
WHERE user_id = $1;

DELETE FROM users
WHERE user_id = $1;