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

//function to prompt user what option they would like to choose from
function init(){
  inquirer
  .prompt({
    name: "option",
    message: "Choose ",
    type: "rawlist",
    choices: [
      "Departments",
      "Roles",
      "Employees",
      "Add Department",
      "Add Role",
      "Add Employee",
      "Update Employee info",
      "Exit"
    ]
  })
  .then(choice =>{
    switch (choice.option){
      case "Departments":
      departments()
      break

      case "Roles":
        roles()
        break

      case "Employees":
        employees()
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
      
      case "Exit":
        connection.end()
        break
    }
  })
}