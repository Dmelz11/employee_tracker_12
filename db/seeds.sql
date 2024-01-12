INSERT INTO department(name)
VALUES ("Management"), 
("Marketing"), 
("Sales"), 
("Accounting"),
("Legal");

INSERT INTO role(title, salary, department_id)
VALUES ("CEO", 350000, 1),
("Sales Manager", 90000, 2),
("Sales Person", 65000, 3),
("Marketing Manager",70000, 3),
("Marketing Assistant", 50000, 2),
("Accounting Manager", 70000, 4),
("Accountant", 55000, 4), 
("Chief Consule", 200000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("John","Brown",1, null),
("Jessie","James",2, 1),
("Bob", "Brown", 3, 2),
("Susie", "Q", 4, 1),
("Jamal","Jordan", 5, 4);

