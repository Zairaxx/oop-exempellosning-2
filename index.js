class Employee {
    constructor(name, lastName, age, company){
        this.name = name;
        this.lastName = lastName;
        this.age = age;
        this.company = company;
        this.email = `${name}.${lastName}@${company}.se`.toLocaleLowerCase();
    }
}

class Admin extends Employee {
    
    constructor(name, lastName, age, company){
        super(name,lastName,age, company)
    }

    deleteDB(){
        // Ta bort alla li-taggar som inte innehåller admins
        let allEmployees = document.querySelectorAll("#employeeList li");
        allEmployees.forEach(li => {
            if (!li.querySelector(".admin-btn")) {
                li.remove();
            }
        });
        console.log("Alla användare är borta! Endast admins kvarstår");
    }
}


let addEmployee = () => {
    // Hämta värden från inputs
    let name = document.querySelector("#name").value;
    let lastName = document.querySelector("#lastName").value;
    let age = document.querySelector("#age").value;
    let company = document.querySelector("#company").value;
    let isAdmin = document.querySelector("#admin").checked;

    // Skapa upp en instans
    let newEmployee = isAdmin ? new Admin(name, lastName, age, company) : new Employee(name, lastName, age, company);
    // Uppdaterar DOM:en 
    let li = document.createElement("li");
    li.innerHTML = `<div>
    <p>Namn: ${newEmployee.name}</p>
    <p>Efternamn: ${newEmployee.lastName}</p>
    <p>Ålder:${newEmployee.age}</p>
    <p>Företag:${newEmployee.company}</p>
    <p>Email:${newEmployee.email}</p>
    ${ newEmployee instanceof Admin ? `<button class="admin-btn">Admin-knapp!</button>` : ""}
    </div>`;
    console.log(newEmployee);
    document.querySelector("#employeeList").append(li);

    // Add event listener for the admin button
    if (newEmployee instanceof Admin) {
        li.querySelector(".admin-btn").addEventListener("click", () => newEmployee.deleteDB());
    }
}