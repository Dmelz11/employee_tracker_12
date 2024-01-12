--deletes any existing database with this name--
DROP DATBASE employees_db IF EXISTS;
--creates new database called employees--
CREATE DATABASE employees_db;
--changes to db employees for new imput route--
USE DATABASE employees_db;
--creates table with coloumns containing numeric id and string firstname headings--
CREATE TABLE employee (
    id INT PRIMARY KEY NOT NULL,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT,
    manager_id INT
);

CREATE TABLE department (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR (30) NOT NULL
);

CREATE TABLE role (
    id  INT PRIMARY KEY NOT NULL,
    title VARCHAR (30),
    salary DECIMAL,
    department_id INT
);
