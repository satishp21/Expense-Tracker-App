async function forgotpassword(e) {
    try{
    e.preventDefault();
    console.log(e.target.name);
    const form = new FormData(e.target);

    const userDetails = {
        email: form.get("email"),
    }
    console.log(userDetails)
    const response = await axios.post('http://localhost:3000/password/forgotpassword',userDetails)

        console.log(response)
        document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
    }

    catch (err){
        console.log(err,"inside catch block at front end")
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    }
}