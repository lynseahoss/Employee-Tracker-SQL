const addDepartment= () =>{
    inquirer.prompt({
        name: "department",
        message: "Enter Department Name",
        type: "input"
    }).then(answer=>{
        connection.query('INSERT INTO department SET ?',
        { name: answer.department}, err =>{
    if(err) throw err
    })
//Return to initial home page
initApp()
    })
}