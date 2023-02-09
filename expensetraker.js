function saveToLocalStorage(event){
    event.preventDefault();
    const amount=event.target.expenseamount.value;
    const Description=event.target.Description.value;
    const Catagory=event.target.Catagory.value;

    // localStorage.setItem("expense amount",amount);
    // localStorage.setItem("Description",Description);
    // localStorage.setItem("Catagory",Catagory);
//storing details in single line in local storage 
    const obj={
        amount,
        Description,
        Catagory
    }
//    localStorage.setItem("expensedetails",JSON.stringify(obj))
//storing details of multiple users
localStorage.setItem(obj.Description,JSON.stringify(obj))
showuseronscreen(obj)
}

function showuseronscreen(obj){
   const parenteliment=document.getElementById("listofitems") 
   const childelem=document.createElement("li")
   childelem.textContent=obj.amount+"-"+obj.Description+"-"+obj.Catagory

// creating delete button which deletes data from screen as well as local storage.  

    const deletebutton=document.createElement("input")
    deletebutton.type="button"
    deletebutton.value="Delete"
    deletebutton.onclick = () => {
        localStorage.removeItem(obj.Description)
        parenteliment.removeChild(childelem)
    }

//creating edit button just after delete button
        const editbutton=document.createElement("input")
        editbutton.type="button"
        editbutton.value="Edit"
        editbutton.onclick = () => {
            localStorage.removeItem(obj.Description)
            parenteliment.removeChild(childelem)
            document.getElementById('expenseInputTag').value=obj.amount
            document.getElementById('DescriptionInputTag').value=obj.Description
            document.getElementById('CatagoryInputTag').value=obj.Catagory
    }
    childelem.appendChild(deletebutton)
    childelem.appendChild(editbutton)
    parenteliment.appendChild(childelem)
}