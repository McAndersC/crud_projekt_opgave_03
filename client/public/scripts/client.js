const client = {};

const showResponse = (message) => {
    
    const statusBar = document.querySelector('.status-bar');

    if(statusBar) {

        statusBar.textContent = message;
        statusBar.classList.add('active');

        setTimeout(() => {
            statusBar.classList.remove('active');
        }, 3000)

    }
}

const updateUser = (e) => {

    e.preventDefault();

    const { email, username } = e.currentTarget.elements;

    console.log('-------------------')
    console.log('Update User')
    console.log('-------------------')
    console.log(username.value)
    console.log(email.value)
    console.log('-------------------')


}

const deleteUser = (e) => {

    e.preventDefault();

    const { email } = e.currentTarget.elements;

    console.log('-------------------')
    console.log('Delete User')
    console.log('-------------------')
    console.log(email.value)
    console.log('-------------------')

    fetch('http://localhost:3000/users/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'email' : email.value})
    })
    .then((response) => response.json()).then((response) => {

        console.log('Response', response);

        showResponse(response.message);
    
    })
    
}

const submitNewUser = (e) => {

    e.preventDefault();

    const { name, email, username, zipcode, city, password, password2 } = e.currentTarget.elements;

    if(password.value === password2.value)
    {
        console.log('-------------------')
        console.log('Submit new User')
        console.log('-------------------')
        console.log(name.value)
        console.log(email.value)
        console.log(username.value)
        console.log(password.value)
        console.log(password2.value)
        console.log(city.value)
        console.log(zipcode.value)
        console.log('-------------------')

        let newUser = {
            name : name.value,
            email : email.value,
            username : username.value,
            password : password.value,
            address : {
                zipcode : zipcode.value,
                city : city.value
            }
        }

        fetch('http://localhost:3000/users/register', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(newUser)
        })
        .then(response => response.json())
        .then( (response) =>  {

            showResponse(response.message);

        } )
    
    } else {
        console.log('Passwords skal være ens.')
    }
}

client.setupUpdateForm = () => {

    const userUpdateForm = document.querySelector('#userUpdateForm');

    if(userUpdateForm)
    {
        userUpdateForm.addEventListener('submit', updateUser)
    }
    
}

client.setupDeleteForm = () => {

    const userDeleteForm = document.querySelector('#userDeleteForm');

    if(userDeleteForm)
    {
        userDeleteForm.addEventListener('submit', deleteUser)
    }

}

client.setupNavBar = () => {

    console.log('Implementér Dynamisk NavBar');

    let navBar = document.querySelector('.nav-bar');

    console.log(navBar);

    navBar.innerHTML = '';
    navBar.insertAdjacentHTML('beforeend', `
        <a href="/">Forside</a>
        <a href="/create">(C)reate</a>
        <a href="/read">(R)ead</a>
        <a href="/update">(U)pdate</a>
        <a href="/delete">(D)elete</a>
    `)
}

client.setupCreateForm = () => {

    const userform = document.querySelector('#userform');

    if(userform)
    {
        userform.addEventListener('submit', submitNewUser)
    }
    
}

client.init = () => {

    client.setupNavBar();

    client.setupCreateForm();
    client.setupUpdateForm();
    client.setupDeleteForm();

}

client.init();