INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 250000, 1), ('CTO', 250000, 1), ('UI/UX', 85000, 2), ('Back-End Dev', 150000, 3), ('Project Manager', 120000, 2), ('HR Manager', 80000, 3);

INSERT INTO department (name)
VALUES ('Dev Team'), ('QA'), ('Accounting'), ('Creative'), ('HR');

INSERT INTO employee (first_name, last_name, role_id)
Values ('Sprinkles', 'Lawson', 1), ('Akash', 'Lawson', 2), ('Nahdri', 'Lawson', 3)