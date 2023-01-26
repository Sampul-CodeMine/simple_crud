// Ajax Request for inserting new record 
const getByID = (element)=>{
    return document.getElementById(element);
};
const tbody_html = getByID('tbody');
const form_select = document.querySelectorAll('#gender option');

// Get a message 
const get_message = (msg, className)=>{
    const div = document.createElement('div');
    div.className = `alert ${className} mt-3 mb-3`;
    div.appendChild(document.createTextNode(msg));
    const container = getByID('msg');
    container.appendChild(div);
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 5000);
}

// Function to delete a user from the database
const remove_record = (element)=>{
    // When the delete button is clicked.
    if (confirm('Do you want to delete this record (y/n) ?')){
        const id = element.getAttribute('data-sid');
        const data = {sid: id};
        const param = JSON.stringify(data);

        const xhrObj = new XMLHttpRequest();

        // Initialize the AJAX Object 
        xhrObj.open('POST', './assets/php/remove.php', true);
        xhrObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhrObj.send(param);
        
        // Handle AJAX Response     
        xhrObj.onload = function(){
            if (xhrObj.status == 200 && xhrObj.readyState == 4){
                //Response handling code 
                let reply = xhrObj.response;
                if (reply == 'success'){
                    get_message('Record was successfully deleted.', 'alert-success');
                    retrieve_records();
                } else {
                    get_message(`${reply}`, 'alert-danger');
                }
            } else {
                get_message(`A record deletion problem occurred.`, 'alert-danger');
            }
        }
    }   
};

// Function to retrieve all records in the database 
const retrieve_records = ()=>{
    // creating AJAX Object 
    const xhrObj = new XMLHttpRequest();

    tbody_html.innerHTML = '';

    // Initialize the AJAX Object 
    xhrObj.open('GET', './assets/php/retrieve.php', true);
    xhrObj.responseType = 'json';
    xhrObj.send();

    // Handle AJAX Response     
    xhrObj.onload = function(){
        if (this.status == 200 && this.readyState == 4){
            
            //Response handling code 
            if ( this.response){
                records = this.response;
            } else {
                records = '';
                tbody_html.innerHTML = '<tr><td colspan="5" style="text-align: center;">No Records Available</td></tr>';
            }
            for(i = 0; i < records.length; i++){
                tbody_html.innerHTML += `
                <tr>
                    <td style="text-align: left;">${records[i].u_lastname}, ${records[i].u_firstname}</td>
                    <td>${records[i].u_email}</td>
                    <td>${records[i].u_age}</td>
                    <td>${records[i].u_gender.charAt(0).toUpperCase()}${records[i].u_gender.slice(1)}</td>
                    <td>
                        <button onclick="update_record(this);" class="btn btn-warning btn-sm btn-edit" data-sid="${records[i].u_id}">Edit</button>
                        <button onclick="remove_record(this);" class="btn btn-danger btn-sm btn-delete" data-sid="${records[i].u_id}">Delete</button>
                    </td>
                </tr>`;
            }
        } 
        
    }
};

// Function to add/save a new record 
const add_record = (evt)=>{
    // prevents default form submission  
    evt.preventDefault();

    // Gets the value of the form data 
    let firstname = getByID('firstname').value;
    let lastname = getByID('lastname').value;
    let email = getByID('emailID').value;
    let age = getByID('age').value;
    let gender = getByID('gender').value;
    let stu_id = getByID('stu_id').value;

    // create an object with the data form submitted
    const param = {
        stu_id: stu_id,
        firstname: firstname,
        lastname: lastname,
        email: email,
        age: age,
        gender: gender
    };

    // convert the javascript object to a JSON string 
    const data = JSON.stringify(param);

    // creating AJAX Object 
    const xhrObj = new XMLHttpRequest();

    // Initialize the AJAX Object 
    xhrObj.open('POST', './assets/php/insert.php', true);
    xhrObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhrObj.send(data);

    // Handle AJAX Response     
    xhrObj.onload = function(){
        if (this.status == 200 && this.readyState == 4){
            // Response handling code 
            const reply = this.responseText;
            const display = getByID('msg');
            if (reply === 'inserted' ) {                
                get_message('Record was successfully saved.', 'alert-success');
                document.getElementById('myform').reset();
                retrieve_records();
            } else if (reply === 'updated' ) {
                get_message('Record was successfully updated.', 'alert-success');
                document.getElementById('myform').reset();
                retrieve_records();
            } else {
                get_message(`${reply}`, 'alert-danger');
            }
        } 
    }
};

// Function to update a user's record
const update_record = (element)=>{
    // When the delete button is clicked.
    if (confirm('Do you want to update this record (y/n) ?')){
        const id = element.getAttribute('data-sid');
        const data = {sid: id};
        const param = JSON.stringify(data);
        const display = getByID('msg');

        //get the input fields of the form
        let fname = getByID('firstname');
        let lname = getByID('lastname');
        let email = getByID('emailID');
        let age = getByID('age');
		let gender = getByID('gender');
        let stu_id = getByID('stu_id');

        const xhrObj = new XMLHttpRequest();

        // Initialize the AJAX Object 
        xhrObj.open('POST', './assets/php/update.php', true);
        xhrObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhrObj.responseType = 'json';
        xhrObj.send(param);
        
        // Handle AJAX Response     
        xhrObj.onload = function(){
            if (xhrObj.status == 200 && xhrObj.readyState == 4){
                const response = this.response;
                stu_id.value = response.u_id;
                fname.value = response.u_firstname;
                lname.value = response.u_lastname;
                age.value = response.u_age;
                email.value = response.u_email;
                for(let i = 0; i < form_select.length; i++){
                    if(form_select[i].value == response.u_gender){
                        form_select[i].selected = true;
                    }
                }                
                
            } else {
                get_message(`A record update problem occurred.`, 'alert-danger');
            }
        }
    }   
};


// Retrieve all Data
retrieve_records();


// When the save button is clicked.
const save_button = getByID('btnSave');
save_button.addEventListener('click', add_record);