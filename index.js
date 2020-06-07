const mysql = require("mysql")
cosnt inquirer = require("inquirer")

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "employee_db"
})

connection.connect(function(err) {
  if (err) throw err
  console.log("connected as id " + connection.threadId)
  connection.end()
})

//function to prompt user what action they want to do
function init(){
  inquirer
  .prompt({
    name: "option",
    message: "Choose ",
    type: "list",
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
  .then()
}