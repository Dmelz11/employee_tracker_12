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
    .then((answers) => {
      //console.log(answers.choices);
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

//console.log("view all employees is called");
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
    .then((answer) => {
      let query = `INSERT INTO department (department_name) VALUES ("${answer.departmentName}")`;
      connection
        .promise()
        .query(query)
        .then(() => {
          console.log(`Added ${answer.departmentName} department`);
          promptUser();
        });

    
    });
};
let roleChoices;
let managerChoices;
const addEmployee = () => {
  let query = `SELECT role.id, role.title FROM role`;
  connection
    .promise()
    .query(query)
    .then(([data]) => {
      roleChoices = data.map(({ id, title }) => ({
        value: id,
        name: `${title}`,
      }));
    })
    .then(() => {
      let query = "SELECT * FROM employee";
      connection
        .promise()
        .query(query)
        .then(([data]) => {
          managerChoices = data.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`,
          }));
          console.log(managerChoices, roleChoices);
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
            name: "roleID",
            message: "What is the new employee's role.",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "managerId",
            message: "What is the new employee's managers id.",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
          let query = `INSERT INTO employee SET (?, ?, ?, ?)`;
          connection.query(
            query,
            {
              first_name: answer.firstName,
              last_name: answer.lastName,
              role_id: answer.role_id,
              manager_id: answer.manager_id,
            },
            function (err, res) {
              if (err) throw err;
              console.log(err);

              console.table(res);
              console.log(res.insertedRows + "Employee successfully added.");
              promptUser();
            },
          );
        });
    })
};

//function to add a Role
const addRole = () => {
  let query = "SELECT * FROM department";
  connection
    .promise()
    .query(query)
    .then(([data]) => {
      let deptNames = [];
      data.forEach((department) => {
        deptNames.push(department.department_name);
      });
      // deptNames.push('Create Department');

      // (err, data) => {

      //   if (err) throw err;
      // })
      inquirer
        .prompt([
          {
            type: "list",
            name: "departmentName",
            message: "Which department is the new role in?",
            choices: deptNames,
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
              validate: validate.validateString,
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
              if (
                departmentData.departmentName === department.department_name
              ) {
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
};

promptUser();
