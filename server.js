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
const viewDepartments = () => {
  connection.query('SELECT * FROM department', (err, res) =>{
    if(err) throw err
    console.table(res)
    initApp()
  })
} 
//view roles
const viewRoles = () =>{
    connection.query('SELECT id, title FROM role', (err, res) =>{
        if(err) throw err
        console.table(res)
        initApp()
})
}

