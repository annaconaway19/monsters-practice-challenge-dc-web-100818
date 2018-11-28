document.addEventListener('DOMContentLoaded', function() {
  fetchMonsters()
  monsterForm()
  document.querySelector('form').addEventListener('submit', addNewMonster)
  nextPage().addEventListener('click', pageForward)
  lastPage().addEventListener('click', pageBackward)
})

  function fetchMonsters() {
    fetch('http://localhost:3000/monsters/?_limit=50&_page=20')
     .then(response => response.json())
     .then(json => json.forEach(monster => {renderMonsterToDom(monster)})
   )}

  function postFetch(name, age, description) {
    let data = {
      name: name,
      age: age,
      description: description
    }
    fetch ('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {renderMonsterToDom(data)})
  }

  function addNewMonster(event) {
    event.preventDefault()
    let name = document.querySelector('#name-input').value
    let age = document.querySelector('#age-input').value
    let description = document.querySelector('#description-input').value
    postFetch(name, age, description)
  }

  function renderMonsterToDom(monster) {
    let monsterDiv = document.createElement('div')

    let monsterHeader = document.createElement('h3')
    monsterHeader.innerText = monster.name

    let monsterAge = document.createElement('h4')
    monsterAge.innerText = monster.age

    let monsterDesc = document.createElement('p')
    monsterDesc.innerText = monster.description

    monsterDiv.appendChild(monsterHeader)
    monsterDiv.appendChild(monsterAge)
    monsterDiv.appendChild(monsterDesc)
    getMonstCont().appendChild(monsterDiv)
  }

  function monsterForm() {
    let monsterForm = document.createElement('form')

    let nameInput = document.createElement('input')
    nameInput.id = 'name-input'
    nameInput.placeholder = 'name'

    let ageInput = document.createElement('input')
    ageInput.id = 'age-input'
    ageInput.placeholder = 'age'

    let descInput = document.createElement('input')
    descInput.id = 'description-input'
    descInput.placeholder = 'description'

    let button = document.createElement('button')
    button.innerText = 'Create Monster'

    monsterForm.appendChild(nameInput)
    monsterForm.appendChild(ageInput)
    monsterForm.appendChild(descInput)
    monsterForm.appendChild(button)
    createMonstCont().appendChild(monsterForm)
  }

  let page = 1
  function pageForward(event) {
    page ++
    getMonstCont().innerHTML = ''
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
     .then(response => response.json())
     .then(json => json.forEach(monster => renderMonsterToDom(monster))
  )}

  function pageBackward(event) {
    page --
    getMonstCont().innerHTML = ''
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
     .then(response => response.json())
     .then(json => json.forEach(monster => renderMonsterToDom(monster))
  )}

  function lastPage() {
    return document.querySelector('#back')
  }

  function nextPage() {
    return document.querySelector('#forward')
  }

  function getMonstCont() {
    return document.querySelector('#monster-container')
  }

  function createMonstCont() {
    return document.querySelector('#create-monster')
  }
