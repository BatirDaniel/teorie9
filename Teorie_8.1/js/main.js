const addPersoana = document.getElementById('add-persoana')
const persoaneList = document.getElementById('persoane')
let persoane = JSON.parse(localStorage.getItem('persoane'))??[]
const deleteAll = document.querySelector('.delete-all')
const formEdit = document.getElementById('formEdit')

//Functii
const getDataToLS = (key) =>{
    return JSON.parse(localStorage.getItem(key))
}

const setDataToLS = (key,data) =>{
    return localStorage.setItem(key,JSON.stringify(data))
}

const afisarePersoane = (data)=>{
    persoaneList.innerHTML=""
    data.forEach(p => {
        persoaneList.innerHTML +=
        `<li id='${p.id}'>
            <span>${p.nume} ${p.prenume}</span>
            <div class='btns'>
                 <button class='btn-delete'>Delete</button>
                 <button class='btn-edit'>Edit</button>
            </div>
        </li>`
    })
}

const getRandomId = (min,max)=> {
    return Math.floor(Math.random() * (max-min)) + min;
}

const deletePerson = () =>{
    const deleteBtn = document.querySelectorAll('.btn-delete')
    deleteBtn.forEach(dbtn =>{
        dbtn.addEventListener('click',()=>{
            const newPerson = persoane.filter(p =>{
                return p.id != dbtn.parentNode.parentNode.id
            })
            setDataToLS('persoane',newPerson)
            persoane = getDataToLS('persoane')
            afisarePersoane(newPerson)
            deletePerson()
            editPerson()
        })
    })
}

const editPerson = () =>{
    const editBtn = document.querySelectorAll('.btn-edit')
    editBtn.forEach(ebtn => {
        ebtn.addEventListener('click',()=>{
            const editarePersoana = new bootstrap.Modal('#editarePersoana')
            editarePersoana.show()

            const persoanaEd = persoane.filter(p =>{
                return p.id == ebtn.parentNode.parentNode.id
            })
            formEdit.idEdit.value = persoanaEd[0].id
            formEdit.numeEdit.value = persoanaEd[0].nume
            formEdit.prenumeEdit.value = persoanaEd[0].prenume

            formEdit.addEventListener('click',(e)=>{
                e.preventDefault()
                const newPerson = {
                    id:         formEdit.idEdit.value,
                    nume:       formEdit.numeEdit.value,
                    prenume:    formEdit.prenumeEdit.value
                }
                persoane.forEach(pers =>{
                    console.log(newPerson)
                    if(pers.id == newPerson.id)
                    {
                        pers.id = newPerson.id
                        pers.nume = newPerson.nume
                        pers.prenume = newPerson.prenume
                    }
                })
                setDataToLS('persoane',persoane)
                afisarePersoane(persoane)
                deletePerson()
                editPerson()
            })
        })
    })
}

afisarePersoane(persoane)
deletePerson()
editPerson()
//end zona functii

addPersoana.addEventListener('submit',(e) =>{
    e.preventDefault()

    const persoana ={
        id : getRandomId(1000000,9999999),
        nume : addPersoana.nume.value,
        prenume : addPersoana.prenume.value
    }
    addPersoana.reset()
    persoane.push(persoana)
    setDataToLS('persoane',persoane)
    afisarePersoane(persoane)
    deletePerson()
    editPerson()
})

deleteAll.addEventListener('click',()=>{
    localStorage.clear()
    persoaneList.innerHTML=""
    persoane = []
})