const characterModel = require('../models/characterModel');
const gameModel = require('../models/gameModel');

// Mostrar la página de selección de personajes
exports.select = (req, res) => {
    const characters = characterModel.getAllCharacters();
    res.render('characters/select', { characters });
};

// Manejar la selección de un personaje para el juego
exports.chooseCharacter = (req, res) => {
    const gameState = gameModel.getGameState();
    gameState.characterId = parseInt(req.body.characterId);
    gameModel.saveGameState(gameState);
    res.redirect('/game2');
};

// Mostrar la vista del juego
exports.view = (req, res) => {
    const gameState = gameModel.getGameState();
    const character = characterModel.findCharacterById(gameState.characterId);
    res.render('game2', { character });
};

// Actualizar el nivel de energía dinámicamente (REST API)
exports.updateEnergy = (req, res) => {
    const gameState = gameModel.getGameState();
    const character = characterModel.findCharacterById(gameState.characterId);

    const action = req.body.action;

    switch (action) {
        case 'decreaseFood':
            character.foodLevel = Math.max(0, character.foodLevel - 10);
            break;
        case 'eat': 
            character.foodLevel = Math.min(100, character.foodLevel + 10);
            break;

        case 'decreaseDrink':
            character.drinkLevel = Math.max(0, character.drinkLevel - 10);
            break;
        case 'drink':
            character.drinkLevel = Math.min(100, character.drinkLevel + 10);
            break;
        
        case 'play':
            character.energyLevel = Math.max(0, character.energyLevel - 10);
            break;

        case 'fly':
            character.energyLevel = Math.max(0, character.energyLevel - 10);
            character.flyLevel = Math.max(0, character.flyLevel - 10);
            break;

        case 'jump':
            character.energyLevel = Math.max(0, character.energyLevel - 10);
            character.jumpLevel = Math.max(0, character.jumpLevel - 10);
            break;
        
        case 'rest':
            character.energyLevel = Math.min(100, character.energyLevel + 10);
            break;

        case 'rest2':
            character.energyLevel = Math.min(100, character.energyLevel + 10);
            character.flyLevel = Math.min(100, character.flyLevel + 10);
            break;

        case 'rest3':
            character.energyLevel = Math.min(100, character.energyLevel + 10);
            character.jumpLevel = Math.min(100, character.jumpLevel + 10);
            break;
        default:
            return res.status(400).json({ message: 'Acción no válida' });
    }
    // Comprobar si tanto comida como bebida están en 0
    if (character.foodLevel === 0 && character.drinkLevel === 0) {
        character.healthLevel = Math.max(0, character.healthLevel - 10); // Disminuir healthLevel de 10 en 10
    }

    // Comprobar si comida y bebida están por encima de 50, para aumentar el healthLevel
    if (character.foodLevel > 50 && character.drinkLevel > 50) {
        character.healthLevel = Math.min(100, character.healthLevel + 10); // Aumentar healthLevel, limitando a 100
        character.foodLevel - 10; // Restar 10 a comida
        character.drinkLevel - 10; // Restar 10 a bebida
    }

    characterModel.saveCharacter(character); // Guardar el estado actualizado del personaje
    res.json({ 
        energyLevel: character.energyLevel, 
        foodLevel: character.foodLevel, 
        drinkLevel: character.drinkLevel, 
        restLevel: character.restLevel,
        healthLevel: character.healthLevel,
        flyLevel: character.flyLevel,
        jumpLevel: character.jumpLevel,
        // Asegurar que también devolvemos el healthLevel actualizado
    });
};