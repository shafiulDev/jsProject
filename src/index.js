
const BASE_URL = 'http://localhost:3000/contacts'





window.onload = function () {
    let tbody = document.getElementById('tbody')
    axios.get(BASE_URL)
        .then(res => {
            res.data.forEach(contact => {
                createTDElement(contact, tbody)
            })
        })
        .catch(err => console.log(err))
}

//This is a contact button add event listener.............
let saveContactbtn = document.getElementById('saveContactbtn')
saveContactbtn.addEventListener('click', function (e) {
    e.preventDefault()
    let nameFild = document.getElementById('nameFild')
    let emailFild = document.getElementById('emailFild')
    if (nameFild.value && emailFild.value) {
        createNewContact()
    } else {
        alert('Enter your Name and Email')
    }

})

// create a new function ..............
function createNewContact() {
    let nameFild = document.getElementById('nameFild')
    let phoneFild = document.getElementById('phoneFild')
    let emailFild = document.getElementById('emailFild')

    let contact = {
        name: nameFild.value,
        phone: phoneFild.value,
        email: emailFild.value
    }

    axios.post(BASE_URL, contact)
        .then(res => {
            let tbody = document.getElementById('tbody')
            createTDElement(res.data, tbody)

            nameFild.value = ''
            phoneFild.value = ''
            emailFild.value = ''
        })
        .catch(err => console.log(err))
}








// Creating a tr element  and appendding her parent element===================
function createTDElement(contact, parentElement) {

    const TR = document.createElement('tr')


    const tdName = document.createElement('td')
    tdName.innerHTML = contact.name
    TR.appendChild(tdName)

    const tdPhone = document.createElement('td')
    tdPhone.innerHTML = contact.phone ? contact.phone : 'N / A'
    TR.appendChild(tdPhone)


    const tdEmail = document.createElement('td')
    tdEmail.innerHTML = contact.email ? contact.email : 'N / A'
    TR.appendChild(tdEmail)


    const tdAction = document.createElement('td')

    const tdEditbtn = document.createElement('button')
    tdEditbtn.className = 'btn btn-warning mr-1 mb-1'
    tdEditbtn.innerHTML = 'Edit'
    tdEditbtn.addEventListener('click', function (e) {
        e.preventDefault()
        let mainModal = $('#contactEditModal')
        mainModal.modal('toggle')
        let editName = document.getElementById('editName')
        let editPhone = document.getElementById('editPhone')
        let editEmail = document.getElementById('editEmail')

        editName.value = contact.name
        editPhone.value = contact.phone
        editEmail.value = contact.email

        let saveContact = document.getElementById('saveContact')
        saveContact.addEventListener('click', function () {
            axios.put(`${BASE_URL}/${contact.id}`, {
                name: editName.value,
                phone: editPhone.value,
                email: editEmail.value
            })
            .then(eve =>{
                tdName.innerHTML = eve.data.name
                tdPhone.innerHTML = eve.data.phone
                tdEmail.innerHTML = eve.data.email
                mainModal.modal('hide')
            })
            .catch(err=>console.log(err))

        })

    })
    tdAction.appendChild(tdEditbtn)


    const tdDeletebtn = document.createElement('button')
    tdDeletebtn.className = 'btn btn-danger mb-1'
    tdDeletebtn.innerHTML = 'Delete'
    tdDeletebtn.addEventListener('click', function (e) {
        e.preventDefault()
        axios.delete(`${BASE_URL}/${contact.id}`)
            .then(res => {
                parentElement.removeChild(TR)
            })
            .catch(err => console.log(err))

    })
    tdAction.appendChild(tdDeletebtn)

    TR.appendChild(tdAction)
    parentElement.appendChild(TR)
}