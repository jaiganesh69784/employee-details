document.getElementById('addEmployeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    fetch('/addEmployee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
            alert(data);
            event.target.reset();
        })
        .catch(error => {
            console.error('Error adding employee:', error);
        });
});

document.getElementById('viewEmployeeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const id = event.target.id.value;

    fetch(`/getEmployee/${id}/${name}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('employeeDetails').innerHTML = `
                <p>Name: ${data.name}</p>
                <p>ID: ${data.id}</p>
                <p>City: ${data.city}</p>
                <p>Date of Birth: ${new Date(data.dob).toLocaleDateString()}</p>
                <p>Age: ${data.age}</p>
                <p>Current Working Year: ${data.currentWorkingYear}</p>
                <p>Position: ${data.position}</p>
            `;
            } else {
                document.getElementById('employeeDetails').innerHTML = 'Employee not found';
            }
        })
        .catch(error => {
            console.error('Error fetching employee:', error);
        });
});
