let jobs = addRole()

//create new employee to db
const addEmployee = () => {
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