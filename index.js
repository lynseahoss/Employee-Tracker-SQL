const mysql = require("mysql")
const inquirer = require("inquirer")

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
})
//connect to database & run init ()
connection.connect(function(err) {
  if (err) throw err
  initApp()
})


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
      "Update Employee info",
      "Exit"
    ]
  })
  .then(choice => {
    switch (choice.option){
      case "Departments":
      viewDepartments()
      break

      case "Roles":
        viewRoles()
        break

      case "Employees":
        viewEmployees()
        break

      case "Add Department":
        addDepartment()
        break
      
      case "Add Role":
        addRole()
        break
      
      case "Add Employee":
        addEmployee()
        break

      case "Update Employee info":
        updateEmployee()
        break
      
      case "Exit":
        connection.end()
        break
    }
  })
}
//view departments
function viewDepartments(){
  connection.query('SELECT name FROM department', (err, res) =>{
    if(err) throw err
    console.table(res)
    initApp()
  })
} 
//view roles
function viewRoles (){
  connection.query('SELECT department.name, title, salary FROM role LEFT JOIN department ON role.department_id = department.id', (err, res)=>{
    if(err) throw err
    console.table(res)
    initApp()
  })
}
//view employees
function viewEmployees(){
  connection.query('SELECT * FROM employee', (err, res)=>{
    if(err) throw err
    console.table(res)
    initApp()
  })
}
//add Department to db
function addDepartment(){
  inquirer.prompt({
      name: "department",
      message: "Enter Department Name",
      type: "input"
  }).then(answer=>{
      connection.query('INSERT INTO department (name) VALUE (?)',
      { name: answer.department}, err =>{
  if(err) throw err
  })
//Return to initial home page
initApp()
  })
}
//display department info for addRole()
function depChoice (){
  let depArr = []
 
}
//add role to db
function addRole (){
  let departmentChoice = []
  depChoice()
      inquirer.prompt([{
          name: "role",
          message: "Enter Title",
          type: "input"
      },
      {
          name: "salary",
          message: "Enter salary amount",
          type: "input",
          validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          },
      {
          name: "department",
          message: "Choose department",
          type: "list",
          choices: departmentChoice
          }]).then(answer => {
            //assign id 
      let departmentID = parseInt(answer.department.split("")[0])
      connection.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', {
          title: answer.role,
          salary: answer.salary,
          department_id: departmentID
      },
      err => { 
          if(err) throw err 
      })
//Return to initial home page
initApp()
  })
  }
//Global Variable
let jobs = addRole()
//create new employee to db
function addEmployee (){
inquirer
.prompt([{
    name: "firstName",
    message: "What is the employee's first name?",
    type: "input"
},
{
    name: "lastName",
    message: "What is the employee's last name?",
    type: "input"
},
{
    name: "role",
    message: "What is the employee's role?",
    type: "list",
    choices: jobs
}]) 
.then(answer => {
//adding role id to employee 
let empID = jobs.indexOf(answer.role)+1
//adding response to database
connection.query('INSERT INTO employee SET ?',
{
   first_name: answer.firstName,
   last_name: answer.lastName,
   role_id: empID
}, err =>{
    if(err) throw err
})
//Return to initial home page
initApp()
})
}
//global variable
const roleArr = []
//display roles for updateEmployee()
function displayRoles(){
  connection.query('SELECT * FROM role',(err,res) =>{
    if (err) throw err
    for(let i = 0; i < res.length; i++){
      roleArr.push(`${res[i].id}) ${res[i].title}`)
    }
})
} 
//
// update employee info
// function updateEmployee(){
// displayRoles()

// }

