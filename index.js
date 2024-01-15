
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
  }
])
//use conditional statement (if or switch)
//choice is view all departments: execute viewAllDepartment function
.then((answers)=>{
    const{choices}= answers;

    if(choices==="View All Employees"){
        viewAllEmployees();
    if(choices ==="View Employees By Department"){
        viewEmployeesByDepartment();
    }
    if(choices ==="Update Employee Role"){
        updateEmployeeRole();
    }
    if(choices ==="Update Employee Salary"){
        updateEmployeeSalary();
    }
    if(choices ==="Add Employee"){
        addEmployee();
    }
    if(choices ==="Remove Employee"){
        removeEmployee();
    }
    if(choices ==="View All Roles"){
        viewAllRoles();
    }
    if(choices ==="Add Role"){
        addRole();
    }
    if(choices ==="Remove Role"){
        removeRole();
    }
    if(choices ==="View All Departments"){
        viewAllDepartments();
    }
    if(choices ==="View All Department Budgets"){
        viewAllDepartmentBudgets();
    }
    if(choices ==="View All Department Employees"){
        viewAllDepartmentEmployees();
    }
    if(choices ==="Add Department"){
        addDepartment();
    }
    if(choices ==="Remove Department"){
        removeDepartment();
    }
    if(choices ==="Exit"){
        connection.end();
    }
  });





//function viewAllDepartment() {
    //db.query
