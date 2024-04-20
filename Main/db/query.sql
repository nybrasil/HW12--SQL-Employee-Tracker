SELECT 
    e.id AS employee_id,
    e.first_name,
    e.last_name,
    r.title AS role_title,
    d.name AS department_name
FROM 
    employees e
INNER JOIN 
    roles r ON e.role_id = r.id
INNER JOIN 
    departments d ON r.department_id = d.id;