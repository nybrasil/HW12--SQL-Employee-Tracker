// Require necessary modules
const inquirer = require('inquirer');
const { Pool } = require('pg');

// Database configuration
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "tracker_db",
    password: "Password",
    port: 5432,
});

// Function to start the application
const startApp = async () => {
  // Display initial options to the user
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
    ],
  });

  // Perform actions based on user selection
  switch (action) {
    case 'View all departments':
      viewDepartments();
      break;
    case 'View all roles':
      viewRoles();
      break;
    case 'View all employees':
      viewEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    default:
      console.log('Invalid action selected.');
  }
};

// Function to view all departments
const viewDepartments = async () => {
  const departments = await pool.query('SELECT * FROM departments');
  console.table(departments.rows);
  startApp();
};

// Function to view all roles
const viewRoles = async () => {
  const roles = await pool.query('SELECT * FROM roles');
  console.table(roles.rows);
  startApp();
};

// Function to view all employees
const viewEmployees = async () => {
  const employees = await pool.query('SELECT * FROM employees');
  console.table(employees.rows);
  startApp();
};

// Function to add a department
const addDepartment = async () => {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:',
  });

  await pool.query('INSERT INTO departments (name) VALUES ($1)', [name]);
  console.log('Department added successfully.');
  startApp();
};

// Function to add a role
const addRole = async () => {
  const departments = await pool.query('SELECT * FROM departments');
  const departmentChoices = departments.rows.map((department) => ({
    name: department.name,
    value: department.id,
  }));

  const roleDetails = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:',
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department for the role:',
      choices: departmentChoices,
    },
  ]);

  await pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)', [
    roleDetails.title,
    roleDetails.salary,
    roleDetails.department_id,
  ]);
  console.log('Role added successfully.');
  startApp()
};

// Function to add an employee
const addEmployee = async () => {
  const roles = await pool.query('SELECT * FROM roles');
  const roleChoices = roles.rows.map((role) => ({
    name: role.title,
    value: role.id,
  }));

  const employees = await pool.query('SELECT * FROM employees');
  const managerChoices = employees.rows.map((employee) => ({
    name: `${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const employeeDetails = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role for the employee:',
      choices: roleChoices,
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager for the employee:',
      choices: managerChoices,
     },
   ]);

   await pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [
     employeeDetails.first_name,
     employeeDetails.last_name,
     employeeDetails.role_id,
     employeeDetails.manager_id,
   ]);

   console.log('Employee added successfully.');
   
};

// Function to update an employee role
const updateEmployeeRole = async () => {
   const employees = await pool.query('SELECT * FROM employees');
   const employeeChoices = employees.rows.map((employee) => ({
     name: `${employee.first_name} ${employee.last_name}`,
     value: employee.id,
   }));

   const roles = await pool.query('SELECT * FROM roles');
   const roleChoices = roles.rows.map((role) => ({
     name: role.title,
     value: role.id,
   }));

   const { employee_id, role_id } = await inquirer.prompt([
     {
       type: 'list',
       name: 'employee_id',
       message: 'Select the employee to update:',
       choices: employeeChoices,
     },
     {
       type: 'list',
       name: 'role_id',
       message: 'Select the new role for the employee:',
       choices: roleChoices,
     },
   ]);

   await pool.query('UPDATE employees SET role_id = $1 WHERE id = $2', [role_id, employee_id]);

   console.log('Employee role updated successfully.');
   
};

// Call the startApp function to begin the application
startApp();