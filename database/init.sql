
CREATE TABLE if not exists users (
    user_id SERIAL PRIMARY KEY,
    is_admin BOOLEAN NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

insert into users (is_admin, name, email, password) values (true, 'jua', 'jua@gmail.com', 'pepe1234');
