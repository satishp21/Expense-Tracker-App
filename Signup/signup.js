async function signup(e) {
    try{
        e.preventDefault();
        console.log(e.target.email.value);

        const signupDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value

        }
        console.log(signupDetails)
        await axios.post('http://localhost:3000/user/signup',signupDetails)
        window.location.href = "../Login/login.html" // change the page on successful login
            
    }catch(err){
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    }
}