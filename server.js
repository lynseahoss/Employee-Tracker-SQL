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
      "Update Employee role",
      "Exit"
    ]
  })
  .then(choice => {
    switch (choice.option){
      case "View Departments":
      viewDepartments()
      break

      case "View Roles":
        viewRoles()
        break

      case "View Employees":
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

      case "Update Employee role":
        updateEmployee()
        break
      
      case "Exit":
        connection.end()
        break
    }
  })
}
//view departments
const viewDepartments= () => {
  connection.query("SELECT * FROM department", (err, res) =>{
    if(err) throw err
    console.table(res)
     //Return to home page
    initApp()
  })
} 
//view roles
const viewRoles= () => {
    const query = "SELECT * FROM role"
    connection.query(query, (err, res) =>{
        if(err) throw err
        console.table(res)
         //Return to home page
        initApp()
})
}
//view employees
const viewEmployees = () => {
    const query = "SELECT * FROM employee"
    connection.query(query, (err, res) =>{
        if(err) throw err
        console.table(res)
         //Return to home page
        initApp()
      })
}
//add Department to db
const addDepartment = () => {
    inquirer.prompt({
        name: "department",
        message: "Enter Department Name",
        type: "input"
    }).then(answer=>{
        const query ="INSERT INTO department SET ?"
        connection.query(query,
        { name: answer.department}, err =>{
    if(err) throw err
    })
  //Return to home page
  initApp()
    })
  }

//add role to db
const addRole = () => {
    const query = "SELECT * FROM department"
   connection.query(query, (err,res)=>{
    if(err) throw err
    inquirer.prompt([{
        name: "title",
        message: "Enter role title",
        type: "input"
    },
    {
        name: "salary",
        message: "Enter salary amount",
        type: "input",
        validate: function(value) {  //enusures user is entering valid number
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
        choices: ()=>{ //displays all departments
            let depOption = []
            for(let i =0; i< res.length; i++){
                depOption.push(`${res[i].id} ${res[i].name}`)
            }
            return depOption
        }
    }]).then(answer =>{
        let roleTitle = answer.title
        let roleSalary = answer.salary
        let departmentID = parseInt(answer.department.split("")[0])
        const query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)"
        connection.query(query, [roleTitle ,roleSalary, departmentID],
        err => { 
            if(err) throw err 
        })
        //Return to home page
        initApp()
    })
   })
  }
  //retrieve all roles
  // const retrieveRoles = () =>{
  //   let newRole = []
  //   connection.query('SELECT title FROM role', (err, res)=>{
  //     if(err) throw err
  //     console.log(res)
  //     for(let i = 0; i < res.length; i++){
  //       newRole.push(res[i].title)
  //     }
  //     return newRole
  //   })
  // }
  //add employee to db
  const addEmployee = () => {

    const newRole =[]
    connection.query('SELECT title FROM role', (err, res)=>{
      if(err) throw err

      for(let i = 0; i < res.length; i++){
        newRole.push(res[i].title)
      } 
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
          choices: res.map(role=>({name: role.title, value: role.id}))
      }]) 
      .then(answer => {
      //adding role id to employee 
      let firstName = answer.firstName
      let lastName = answer.lastName
      let role_id = answer.role
      const query = "INSERT INTO employee (first_name, last_name, role_id) VALUE (?,?,?)"
      //adding response to database
      connection.query(query, [firstName, lastName, role_id]
      , err =>{
          if(err) throw err
      })
      //Return to home page
      initApp()
      })
    })
    }
  
//update employee role in db
const updateEmployee = () => {
  const updateRole =[]
  connection.query('SELECT title FROM role', (err, res)=>{
    if(err) throw err

    for(let i = 0; i < res.length; i++){
      updateRole.push(res[i].title)
    } 
    
    const query = "SELECT * FROM employee"
    connection.query(query, (err,res)=>{
             if(err) throw err 
    inquirer.prompt([{
        name:"employee",
        message: "Enter employee that needs to be updated",
        type: "list",
        choices: ()=>{ //displays all employees
            let arrEmp = []
            for(let i =0; i< res.length; i++){
                arrEmp.push(`${res[i].id} ${res[i].first_name} ${res[i].last_name}`)
            }
            return arrEmp
        }
    },
    {
        name: "newTitle",
        message: "Enter the updated role of employee",
        type: "list",
        choices: res.map(role=>({name: role.title, value: role.id}))
        
    }]).then(answer =>{
        let emp_id = parseInt(answer.employee.split("")[0])
        let role_id = answer.role_id
        const query = "UPDATE employee SET role_id = ? WHERE id =?"
        connection.query(query,[emp_id, role_id],err =>{
            if(err) throw err
            initApp()
        })
    })
    

    })
  })}