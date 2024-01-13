
const inquirer = require("inquirer");
//import connection
const db = require('./config/connection')
//prompt user which action they want to take
const promptUser=()=>{
//array of choices: view all departments, view all roles, view all employees, 
//add a department, add a role, add an employee, and update an employee role
inquirer.prompt([
}
   name: "options",
   type: "list",
   message:"Please choose an option",
   choices:[
    "View All Employees",
    "View Employees By Department",
    "Update Employee Manager",
    "Update Employee Role",
    "Update Employee Salary",
    "Add Employee",
    "Remove Employee",
    "View All Roles",
    "Add Role",
    "Remove Role",
    "View All Departments",
    "View Department Budgets",
    "View Department Employees",
    "Add Department",
    "Remove Department",
    "Exit"
   ]
]
}


//use conditional statement (if or switch)
//choice is view all departments: execute viewAllDepartment function

//function viewAllDepartment() {
    //db.query
