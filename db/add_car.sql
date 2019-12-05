UPDATE users 
SET cars = concat('{"make": "', $1, '", "model": "', $2, '", "year": "', $3, '"}')
WHERE email = $4;
-- "{\"make\": $1, \"model\": $2, \"year\": $3}"
