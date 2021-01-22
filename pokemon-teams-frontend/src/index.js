const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

getTrainers()
let main = document.querySelector('main')


function getTrainers() {
    fetch (TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)))
}

function renderTrainer(trainer){
    let div = document.createElement('div')
    let p = document.createElement('p')
    let ul = document.createElement('ul')

    trainer.pokemons.forEach(pokemon => {
        let li = document.createElement('li')
        li.textContent = pokemon.nickname + ` (${pokemon.species})`
        let deleteBtn = document.createElement('button')
        deleteBtn.dataset.id = pokemon.id
        deleteBtn.textContent = 'Release'
        deleteBtn.addEventListener('click', (e) => deletePokemon(pokemon.id))

        li.append(deleteBtn)
        ul.appendChild(li)
    })

    let addBtn = document.createElement('button')
    addBtn.textContent = 'Add Pokemon'
    addBtn.addEventListener('submit', handleSubmit)


    div.className = 'card'
    div.dataset.id = trainer.id
    p.textContent = trainer.name
    

   
    div.append(p,addBtn,ul)
    main.appendChild(div)

}

function addPokemon(pokemon) {
    fetch (POKEMONS_URL,{
    method:'POST',
    headers: 
    {
      "Content-Type": "application/json",
       Accept: "application/json"
    },
    body: JSON.stringify(pokemon)
  })
  .then(res => res.json())
  .then(trainer => renderTrainer(trainer))

}

function handleSubmit(e) {
    e.preventDefault()

    let pokemon = {
        nickname: e.target.nickname.value,
        species: e.target.species.value,
        trainerId: e.target.trainerId.value
    }
    addPokemon(pokemon)
}

function deletePokemon(pokemonId) {
    fetch (`${POKEMONS_URL}/${pokemonId}`,{
    method:'DELETE',
  })
  .then(res => res.json())
  .then(() => {
    let oldPokemon = document.getElementById(id)
    oldPokemon.remove()
  })
}