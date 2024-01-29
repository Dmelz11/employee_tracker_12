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
  let query = "SELECT * FROM department";
  db.query(query,(err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser();
  });
};
//function viewAllRoles
const viewAllRoles = () => {
  let query = "SELECT * FROM role";
  db.query(query,(err, data) => {
    if (err) throw err;
    console.table(data);
    promptUser();
  });
};

//console.log("view all employees is called");
const viewAllEmployees = () => {
  let query = "SELECT * FROM employee";
  db.query(query,(err, data) => {
    if (err) throw err;
    console.table(data);
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
      connection.promise().query(query)
      .then(() => {
          console.log(`Added ${answer.departmentName} department`);
          promptUser();
        });

    
    });
};
let roleChoices;
let managerChoices;


const addEmployee = () => {

  let query = 'SELECT * FROM role';
  db.query(query,(error, res)=>{
    roleChoices = res.map(role =>({
      name: role.title,
      value: role.id
    }));
    let query = 'SELECT * FROM employee';
    db.query(query,(error, res)=>{
      managerChoices = res.map(employee => ({
       name: employee.first_name.concat (employee.last_name),
       value: employee.id 
     
   
      }));

        inquirer
          .prompt ([
          {
            type: "input",
            name: "first_name",
            message: "What is the new employee's first name?",
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "role_id",
            message: "What is the new employee's role?",
            choices: roleChoices,
          },
          {  
            type: "list",
            name: "managerChoice",
            message: "Who is the new employee's manager?",
            choices: managerChoices,
          },
        ])
        .then((answer) => {
         let query = `INSERT INTO employee SET first_name = '${answer.first_name}',
         last_name = '${answer.last_name}', role_id = '${answer.role_id}', manager_id = '${answer.manager_id}';`
         db.query(query, (err,res) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Added Employee");
          promptUser();
         });
        });
      });
     }); 
  };
  //function to add a Role
const addRole = () => {
  let query = "SELECT * FROM department";
  connection.promise().query(query)
    .then(([data]) => {
      let deptNames = [];
      data.forEach((department) => {
        deptNames.push(department.department_name);
      });
     
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
      let addRoleData = (departmentData) => {
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
              if (
                departmentData.departmentName === department.department_name
              ) {
                departmentId = department.id;
              }
            });
            let addedRole = [newRole, answer.salary, departmentId];
            connection.query('INSERT INTO role SET ?', {
             salary: answer.salary,
             title: answer.newRole,
             department_id: departmentId }, (error => { 
            
               if (error) throw error;
             console.log("Role added.");
             promptUser();


          }));
        });
    };
  });
}

        

promptUser();
