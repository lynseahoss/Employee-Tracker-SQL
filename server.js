const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "sprinkles",
  database: "employee_db"
});
//connect to database & run init ()
connection.connect(function(err) {
  if (err) throw err;
  initApp();
});

//function to prompt user what option they would like to choose from
const initApp = () => {
  inquirer
    .prompt({
      name: "option",
      message: "Choose action",
      type: "rawlist",
      choices: [
        "View Departments",
        "View Roles",
        "View Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee role",
        "Exit"
      ]
    })
    .then(choice => {
      switch (choice.option) {
        case "View Departments":
          viewDepartments();
          break;

        case "View Roles":
          viewRoles();
          break;

        case "View Employees":
          viewEmployees();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee role":
          updateEmployee();
          break;

        case "Exit":
          connection.end();
          break;
      }
    });
};
//view departments
const viewDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    //Return to home page
    initApp();
  });
};
//view roles
const viewRoles = () => {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    //Return to home page
    initApp();
  });
};
//view employees
const viewEmployees = () => {
  const query = "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    //Return to home page
    initApp();
  });
};
//add Department to db
const addDepartment = () => {
  inquirer
    .prompt({
      name: "department",
      message: "Enter Department Name",
      type: "input"
    })
    .then(answer => {
      const query = "INSERT INTO department SET ?";
      connection.query(query, { name: answer.department }, err => {
        if (err) throw err;
      });
      //Return to home page
      initApp();
    });
};

//add role to db
const addRole = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "title",
          message: "Enter role title",
          type: "input"
        },
        {
          name: "salary",
          message: "Enter salary amount",
          type: "input",
          validate: function(value) {
            //enusures user is entering valid number
            if (isNaN(value) === false) {
              return true;
            }
            return "Enter Valid Value";
          }
        },
        {
          name: "department",
          message: "Choose department",
          type: "list",
          choices: () => {
            //displays all departments
            let depOption = [];
            for (let i = 0; i < res.length; i++) {
              depOption.push(`${res[i].id} ${res[i].name}`);
            }
            return depOption;
          }
        }
      ])
      .then(answer => {
        let roleTitle = answer.title;
        let roleSalary = answer.salary;
        let departmentID = parseInt(answer.department.split("")[0]);
        const query =
          "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
        connection.query(query, [roleTitle, roleSalary, departmentID], err => {
          if (err) throw err;
        });
        //Return to home page
        initApp();
      });
  });
};
//add employee to db
const addEmployee = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.log(res);
    inquirer
      .prompt([
        {
          name: "first_name",
          message: "What is the employee's first name?",
          type: "input"
        },
        {
          name: "last_name",
          message: "What is the employee's last name?",
          type: "input"
        },
        {
          name: "role_id",
          message: "What is the employee's role?",
          type: "list",
          choices: res.map(role => ({ name: role.title, value: role.id }))
        }
      ])
      .then(answer => {
        console.log(answer);
        const query = "INSERT INTO employee SET ?";
        //adding response to database
        connection.query(query, answer, err => {
          if (err) throw err;
        });
        //Return to home page
        initApp();
      });
  });
};

//update employee role in db
const updateEmployee = () => {
  connection.query("SELECT * FROM role", (err, results) => {
    const query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        inquirer
          .prompt([
            {
              name: "employee",
              message: "Enter employee that needs to be updated",
              type: "list",
              choices: () => {
                //displays all employees
                let arrEmp = [];
                for (let i = 0; i < res.length; i++) {
                  arrEmp.push(
                    {name:`${res[i].first_name} ${res[i].last_name}`, value: res[i].id}
                  );
                }
                return arrEmp;
              }
            },
            {
              name: "newTitle",
              message: "Enter the updated role of employee",
              type: "list",
              choices: results.map(role => ({
                name: role.title,
                value: role.id
              }))
            }
          ])
          .then(answer => {
            console.log(answer);
            const query = "UPDATE employee SET role_id = ? WHERE id =?";
            connection.query(query, [answer.newTitle, answer.employee], err => {
              if (err) throw err;
              initApp();
            });
          });
      });
    });
  }
