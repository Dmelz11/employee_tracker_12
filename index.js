const inquirer = require("inquirer");
const cTable = require("console.table");
//import connection
const db = require("./config/connection");
//prompt user which action they want to take
const promptUser = () => {
  //array of choices: view all departments, view all roles, view all employees,
  //add a department, add a role, add an employee, and update an employee role
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Please choose an option",
//view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
        choices: [
          "View All Employees",
          "Add Employee",
          "Remove Employee",
          "View All Roles",
          "Add Role",
          "Remove Role",
          "View All Departments",
          "Add Department",
          "Remove Department",
          "Exit",
        ],
      },
    ])
    //use conditional statement (if or switch)
    //choice is view all departments: execute viewAllDepartment function
    .then((answers) => {
      //console.log(answers.choices);
      const { choices } = answers;
      console.log(choices);
      if (choices === "View All Employees") {
        viewAllEmployees();
      } else if (choices === "Add Employee") {
        addEmployee();
      } else if (choices === "Remove Employee") {
        removeEmployee();
      } else if (choices === "View All Roles") {
        viewAllRoles();
      } else if (choices === "Add Role") {
        addRole();
      } else if (choices === "Remove Role") {
        removeRole();
      } else if (choices === "View All Departments") {
        viewAllDepartments();
      } else if (choices === "Add Department") {
        addDepartment();
      } else if (choices === "Remove Department") {
        removeDepartment();
      } else if (choices === "Exit") {
        db.end();
      } else {
        console.log("No selection was matched");
      }
    });

  //function viewAllDepartment() {
  const viewAllDepartments = () => {
    let sql = `SELECT * FROM department`;
    db.query(sql, (err, data) => {
        if (err) throw err;
        console.table(data);
        promptUser()
      });
  };

//function to add department
const addDepartment = () => {
  let sql = `SELECT * FROM department`;
  db.query(sql, (err, data) => {
      if (err) throw err;
      console.table(data);
      promptUser()
    });
};
const removeDepartment = () => {
  //function to remove department
  let sql = `SELECT * FROM department`;
  db.query(sql, (err, data) => {
      if (err) throw err;
      console.table(data);
      promptUser()
    });
};

const viewAllEmployees = () => {
  //console.log("view all employees is called");
  let sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser()
  });
};

const addEmployee = () => {
  //function addEmployee
  let sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser()
  });
};

const removeEmployee = () => {
  //function removeEmployee
  let sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser()
  });
};

const viewAllRoles = () => {
  //function viewAllRoles
  let sql = "SELECT * FROM role";
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser()
  });
};

const addRole = () => {
  //function to add a Role
  let sql = "SELECT * FROM role";
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser()
  });
};

const removeRole = () => {
  //function to remove a Role
  let sql = "SELECT * FROM role";
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser()
  });
};

promptUser();
