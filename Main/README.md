# HW12--SQL-Employee-Tracker

## Employee Tracker

Employee Tracker is a command-line application that allows users to manage departments, roles, and employees within a company. It provides functionalities such as viewing all departments, roles, and employees, adding new departments, roles, and employees, and updating an employee's role.

## Features

 . View all departments: Displays a table of all departments in the company.
 . View all roles: Displays a table of all roles in the company.
 . View all employees: Displays a table of all employees in the company.
 . Add a department: Allows the user to add a new department to the company.
 . Add a role: Allows the user to add a new role to the company, specifying the title, salary, and department.
 . Add an employee: Allows the user to add a new employee to the company, specifying the first name, last name, role, and manager.
 . Update an employee role: Allows the user to update an employee's role.

## Installation

1. Clone the repository to your local machine: git clone https://github.com/nybrasil/HW12--SQL-Employee-Tracker
2. Navigate to the project directory: cd employee-tracker
3. Install dependencies: npm install
4. Configure the database connection: 
   .Open the 'index.js' file.
   .Modify the database configuration object ('pool') with your PostgreSQL database credentials.
5. Run the application: node index.js

## Dependencies

 . inquirer: A collection of common interactive command-line user interfaces.
 . pg: PostgreSQL client for Node.js.
 
## Usage

 . When you run the application, you'll be presented with a list of actions to choose from.
 . Use the arrow keys to navigate and press Enter to select an action.
 . Follow the prompts to perform the selected action.
 . After completing an action, you'll be returned to the main menu to choose another action or exit the application.
 
## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or create a pull request on the GitHub repository.

## License

This project is licensed under the MIT License.



