function saveToLocalStorage(event){
    event.preventDefault();
    const name=event.target.username.value;
    const email=event.target.emailId.value;
    const phonenumber=event.target.phonenumber.value;

    localStorage.setItem("name",name);
    localStorage.setItem("email",email);
    localStorage.setItem("phonenumber",phonenumber);
//storing details in single line in local storage 
    const obj={
        name,
        email,
        phonenumber
    }
   localStorage.setItem("userdetails",JSON.stringify(obj))

//storing details of multiple users
localStorage.setItem(obj.email,JSON.stringify(obj))
showuseronscreen(obj)
}

function showuseronscreen(obj){
   const parenteliment=document.getElementById("listofitems") 
   const childelem=document.createElement("li")
   childelem.textContent=obj.name+"-"+obj.email+"-"+obj.phonenumber

// creating delete button which deletes data from screen as well as local storage.  

    const deletebutton=document.createElement("input")
    deletebutton.type="button"
    deletebutton.value="Delete"
    deletebutton.onclick = () => {
        localStorage.removeItem(obj.email)
        parenteliment.removeChild(childelem)
    }

//creating edit button just after delete button
        const editbutton=document.createElement("input")
        editbutton.type="button"
        editbutton.value="Edit"
        editbutton.onclick = () => {
            localStorage.removeItem(obj.email)
            parenteliment.removeChild(childelem)
            document.getElementById('usernameInputTag').value=obj.name
            document.getElementById('emailInputTag').value=obj.email
            document.getElementById('phonenumberInputTag').value=obj.phonenumber
    }
    childelem.appendChild(deletebutton)
    childelem.appendChild(editbutton)
    parenteliment.appendChild(childelem)
}