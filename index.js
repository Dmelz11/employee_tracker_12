const inquirer = require("inquirer");
const cTable = require("console.table");
//import connection
const db = require("./config/connection");
const connection = require("./config/connection");
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
        choices: [
          "View All Employees",
          "Add Employee",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Exit",
        ],
      },
    ])

    //use conditional statement (if or switch)
    //choice is view all departments: execute viewAllDepartment function
    .then((answers) => {;
      const { choices } = answers;
      console.log(choices);
      if (choices === "View All Employees") {
        viewAllEmployees();
      } else if (choices === "Add Employee") {
        addEmployee();
      } else if (choices === "View All Roles") {
        viewAllRoles();
      } else if (choices === "Add Role") {
        addRole();
      } else if (choices === "View All Departments") {
        viewAllDepartments();
      } else if (choices === "Add Department") {
        addDepartment();
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
    promptUser();
  });
};
//function viewAllRoles
const viewAllRoles = () => {
  let sql = "SELECT * FROM role";
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser();
  });
};
//function to view all employees is called");
const viewAllEmployees = () => {
  let sql = "SELECT * FROM employee";
  db.query(sql, (err, data) => {
    if (err) throw err;
    console.log(data);
    promptUser();
  });
};

//function to add department
const addDepartment = () => {
 inquirer
    .prompt({
      type: "input",
      name: "departmentName",
      message: "What is the new department called?",
    })
    .then((answer)=>{
      let query = `INSERT INTO department (department_name) VALUES ("${answer.departmentName}")`
      connection.promise().query(query)
      .then(()=>{
        console.table(`Added ${answer.departmentName} department`);
        promptUser();
      });
    });
};

let roleChoices;
let managerChoices;

  //function addEmployee
const addEmployee = () => {
let query = 'SELECT * FROM employee';
connection.promise().query(query)
.then(([data])=>{
  let deptNames = [];
  data.forEach((department) =>{
    deptNames.push(department.department_name);
  });
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is employee's last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the new employee's role?",
        choices: roleChoices,
      },    
      {
        type: "list",
        name: "manager",
        message: "Who is this employee's manager?",
        choices: managerChoices,
      },
    ])
      .then((answer) => {
       let query = `INSERT INTO employee SET (?, ?, ?, ?)`;
       connection.query(query,
        {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.role_id,
        manager_id: answer.manager_id,
        },
        function (err, res) {
          if (err) throw err;
          console.log(err);
        })
      })
      .then((answer)=>{
        if (answer.newEmployeeName==="Create new employee "){
          this.addEmployee();
        } else {
          addRoleData(response);
        }
      });
    },
      (err, res) => {
        if (err) throw err;
        console.log("A new employee has been added.");
        promptUser();
   });
 };

//function to add a Role
const addRole = () => {
  let sql = "SELECT * FROM role";
  connection.promise().query(sql, (err, data) => {
    if (err) throw err;
    let deptNamesArray = [];
    data.forEach((department) => {
      deptNamesArray.push(department.department_name);
    });
    deptNamesArray.push("Create Department");

    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentName",
          message: "Which department is the new role in?",
          choices: deptNamesArray,
        },
      ])
      .then((answer) => {
        if (answer.departmentName === "Create Department") {
          this.addDepartment();
        } else {
          addRoleData(answer);
        }
      });
      
    const addRoleData = (departmentData) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "newRole",
            message: "What is the new role called?",
      
          },
          {
            type: "input",
            name: "salary",
            message: " What is the salary for this role",
      
          },
        ])
        .then((answer) => {
          let newRole = answer.newRole;
          let departmentId;
          data.forEach((department) => {
            if (departmentData.departmentName === department.department_name) {
              departmentId = department.id;
            }
          });
          let critical = [newRole, answer.salary, departmentId];
          connection.promise().query(sql, critical, (error) => {
            if (error) throw error;
            console.log("Role added.");
            viewAllRoles();
          });
        });

     
        };
      });
  


    }
promptUser();
