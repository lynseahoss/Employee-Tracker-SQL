DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE  department(
  id INT AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE  role(
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary Decimal,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE  employee(
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);