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
        ]
      
      }
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
  };
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
    console.log(`Current Employees`);
    promptUser()
  });
 }; 

const addEmployee = () => {
  //function addEmployee
  inquirer.prompt([
    {
      type:'input',
      name:'firstName',
      message:"What is the employee's first name?",
      validate: addFirstName =>{
        if (addFirstName){
          return true;
        } else {
          console.log('Enter a first name.');
          return false;
        }
      }
    },
    {
      type:'input',
      name:'lastName',
      message: "What is employee's last name?",
      validate: addLastName =>{
        if (addLastName){
          return true;
        } else {
          console.log('Enter a last name.');
          return false;
        }
      }
    }
  ])
.then(answer =>{
  const critical = [answer.firstName, answer.lastName]
  const roleSql = `SELECT * FROM role`;
  connection.promise().query(roleSql,(error, data)=>{
     if (error) throw error;
     const roles = data.map (({id,title})=>({name: title,value:id}));

     inquirer.prompt([
      {
      type: 'list',
      name: 'role',
      message: "What is the new employee's role?",
      choices: roles
      }
     ])
    .then(roleChoice =>{
      const role = roleChoice.role;
      critical.push(role);
      const managerSql = `SELECT * FROM employee`;
      connection.promise().query(managerSql,(error, data)=>{
        if (error) throw error;
        const managers = data.map(({id, first_name, last_name})=>({name: first_name +""+ last_name, value: id}));
        console.log("A new employee has been added.");
        viewAllEmployees();
      });
      });
    });
  });
}
const removeEmployee = () => {
  //function removeEmployee
  let sql = "SELECT * FROM employee"
  inquirer.prompt([
    {
      type:'input',
      name: 'firstName',

    }
  ])
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
