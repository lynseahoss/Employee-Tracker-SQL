function addEmployee(){
inquirer
.prompt({
    name: "firstName",
    message: "What is the employee's first name?",
    type: "input"
},
{
    name: "lastName",
    message: "What is the employee's last name?",
    type: "input"
}) 
.then(function(){
    
})
}