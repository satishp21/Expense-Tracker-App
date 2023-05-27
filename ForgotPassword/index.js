function forgotpassword(e) {
    e.preventDefault();
    console.log(e.target.name);
    const form = new FormData(e.target);

    const userDetails = {
        email: form.get("email"),
    }
    console.log(userDetails)
    axios.post('http://localhost:3000/password/forgotpassword',userDetails).then(response => {
        console.log(response)
        if(response.status === 202){
            document.body.innerHTML += '<div style="color:red;">Mail Successfuly sent <div>'
        } else {
            throw new Error('Something went wrong!!!')
        }
    }).catch(err => {
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    })
}


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