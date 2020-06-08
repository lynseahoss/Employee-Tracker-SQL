function addRole(){
connection.query('SELECT * FROM department',(err,res) =>{
    if (err) throw err
    inquirer.prompt([{
        name: "role_title",
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
        type: "rawlist",
        choices: ""
        }
        ])
})
}