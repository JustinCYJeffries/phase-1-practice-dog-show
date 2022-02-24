

document.addEventListener('DOMContentLoaded', () => {

    const tableBody = document.querySelector('#table-body')
    const dogForm = document.querySelector("#dog-form")

    getAllDogs()

dogForm.addEventListener("submit", e => {
    e.preventDefault()
    
    const updatedDog = {
        name:e.target.name.value,
        breed:e.target.breed.value,
        sex:e.target.sex.value
    }
    const dogId = e.target.dataset.id
    
    
       
    

    function updateDog(e, updatedDog){
        return fetch(`http://localhost:3000/dogs/${e}` , {
            method:"PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(updatedDog)
        })
            .then(r => r.json())
            .then(actualUpdatedDog => {
                const dogRow = document.querySelector(`tr[data-id="${dogId}"]`)
                dogRow.innerHTML = `
            <td>${actualUpdatedDog.name}</td>
            <td>${actualUpdatedDog.breed}</td>
            <td>${actualUpdatedDog.sex}</td>
            <td><button>Edit</button></td>
        `})

        }
       
        updateDog(dogId, updatedDog) 
            
})

//initial fetch and render
function getAllDogs(){
fetch('http://localhost:3000/dogs')
.then(r => r.json())
.then (arrayofDogs => {
    arrayofDogs.forEach(dog => renderDog(dog))
})
}
function renderDog(dog){
    const dogRow = document.createElement("tr")
    dogRow.dataset.id = dog.id
    dogRow.innerHTML = `
        <td>${dog.name}</td>
        <td>${dog.breed}</td>
        <td>${dog.sex}</td>
        <td><button>Edit</button></td>
    `
    tableBody.append(dogRow)
    const button = dogRow.querySelector("button")
    button.addEventListener("click", e => {
        populateDogForm(dog)
    })
}
function populateDogForm(dog){
    dogForm.name.value = dog.name
    dogForm.breed.value = dog.breed
    dogForm.sex.value = dog.sex
    dogForm.dataset.id = dog.id
    console.log(dog.id)
}


})