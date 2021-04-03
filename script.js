var batmanDarkKnight = {
    name: 'Batman (Cavalheiro das Trevas)',
    image: './assets/BatmanDarkKnight.png',
    attributes: {
        'força': 50,
        'defesa': 77,
        'resistência': 43,
        'habilidade': 96,
        'inteligência': 99,
        'velocidade': 88
    }
}

var batmanBeyond = {
    name: 'Batman (do Futuro)',
    image: './assets/BatmanBeyond.png',
    attributes: {
        'força': 57,
        'defesa': 74,
        'resistência': 55,
        'habilidade': 91,
        'inteligência': 79,
        'velocidade': 90
    }
}

var deathstroke = {
    name: 'Exterminador',
    image: './assets/Deathstroke.png',
    attributes: {
        'força': 52,
        'defesa': 75,
        'resistência': 40,
        'habilidade': 96,
        'inteligência': 99,
        'velocidade': 90
    }
}

var jokerClown = {
    name: 'Coringa (Palhaço)',
    image: './assets/JokerClown.png',
    attributes: {
        'força': 36,
        'defesa': 43,
        'resistência': 38,
        'habilidade': 62,
        'inteligência': 96,
        'velocidade': 80
    }
}

var jokerCriminal = {
    name: 'Coringa (Criminoso)',
    image: './assets/JokerCriminal.png',
    attributes: {
        'força': 40,
        'defesa': 45,
        'resistência': 38,
        'habilidade': 82,
        'inteligência': 99,
        'velocidade': 80
    }
}

var cards = [batmanDarkKnight, batmanBeyond, deathstroke, jokerClown, jokerCriminal]
var playerCard
var machineCard

function raffleCard() {
    displayCards(playerCard, 'Sua carta', 'clear')

    var machineCardNumber = parseInt(Math.random() * 5)
    machineCard = cards[machineCardNumber]

    var userCardNumber = parseInt(Math.random() * 5)
    while (userCardNumber == machineCardNumber) {
        userCardNumber = parseInt(Math.random() * 5)
    }
    playerCard = cards[userCardNumber]

    document.getElementById('btnRaffle').disabled = true
    document.getElementById('btnPlay').disabled = false

    displayCards(playerCard, 'Sua carta', 'inner')
}

function displayCards(neutralCard, title, status) {
    var cardContainer = document.getElementById('cardContainer')

    if (status == 'clear') {
        cardContainer.innerHTML = ''
    } else {
        var cardTitle = `<h2>${title}</h2>`
        var cardCharacterName = `<h3>${neutralCard.name}</h3>`
        var cardImage = `<img src="${neutralCard.image}">`
        var input = ''
        var value = ''

        for (var attribute in neutralCard.attributes) {
            input += `<input type="radio" name="attribute" value="${attribute}"><p>${attribute}</p><br>`
            value += `<p>${neutralCard.attributes[attribute]}</p>`
        }

        var optionValue = `<div class="optionValue">${value}</div>`
        var optionText = `<div class="optionText">${input}</div>`
        var optionDiv = `<div class="optionDiv">${optionText}${optionValue}</div>`
        var optionContainer = `<div class="optionContainer">${optionDiv}</div>`
        var character = `<div class="character">${cardCharacterName}${cardImage}</div>`
        var card = `<div class="card" id="card">${character}${optionContainer}</div>`
        var cardSet = `<div class="cardSet">${cardTitle}${card}</div>`

        cardContainer.innerHTML += cardSet
    }
}

function playGame() {
    var selectedAttribute = getSelectedAttribute()

    if (selectedAttribute == undefined) {
        alert('Guerreiro! Selecione um atributo de seu personagem para ir à batalha')
    } else {
        displayCards(machineCard, 'Carta do adversário', 'inter')

        if (playerCard.attributes[selectedAttribute] > machineCard.attributes[selectedAttribute]) {
            alert('Parabéns! A sua carta foi a vencedora dessa batalha')
        } else if (playerCard.attributes[selectedAttribute] < machineCard.attributes[selectedAttribute]) {
            alert('Infelizmente sua carta perdeu, mas não desanime, guerreiro, tente novamento puxando outra carta')
        } else {
            alert('O resultado dessa batalha foi um empate glorioso!')
        }

        document.getElementById('btnPlay').disabled = true
        document.getElementById('btnRaffle').disabled = false
    }
}

function getSelectedAttribute() {
    var radioAttribute = document.getElementsByName('attribute')

    for (var i = 0; i < radioAttribute.length; i++) {
        if (radioAttribute[i].checked) {
            return radioAttribute[i].value
        }
    }
}