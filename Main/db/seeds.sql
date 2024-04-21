-- Insert departments
INSERT INTO departments (name) 
VALUES ('Marketing'), ('Engineering'), ('Sales');

-- Insert roles
INSERT INTO roles (title, salary, department_id) 
VALUES 
('Marketing Manager', 60000, 1), 
('Software Engineer', 80000, 2), 
('Sales Representative', 50000, 3);

-- Insert employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES 
('John', 'Doe', 1, NULL), 
('Jane', 'Smith', 2, NULL), 
('Alice', 'Johnson', 2, NULL), 
('Bob', 'Brown', 3, NULL);
