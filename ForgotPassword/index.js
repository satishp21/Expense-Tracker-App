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
        console.log(arr)
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    }
}

// if send in blue not works properly which happens sometimes use below code which serves the same purpose it will redirect to the update password like which we get in mail this is not recoomended in production
// function forgotpassword(e) {
//     e.preventDefault();
//     console.log(e.target.name);
//     const form = new FormData(e.target);

//     const userDetails = {
//         email: form.get("email"),
//     }
//     console.log(userDetails)
//     axios.post('http://localhost:3000/password/forgotpassword',userDetails).then(response => {

//         console.log('mail sent successfully redirecting to the reset password page',response)

//         // window.location.href = `axios.get('http://localhost:3000/password/resetpassword/${response.data.id}')`

//         const url = `http://localhost:3000/password/resetpassword/${response.data.id}`;

//         // Open the URL in a new tab
//         window.open(url, '_blank')

//     })
//     .catch(err => {
//         document.body.innerHTML += `<div style="color:red;">${err} <div>`;
//     })
// }