const characterModel = require('../models/characterModel');

exports.index2 = (req, res) => {
    const characters = characterModel.getAllCharacters();
    res.render('characters/index2', { characters });
};

exports.create = (req, res) => {
    res.render('characters/create');
};

exports.store = (req, res) => {
    const characters = characterModel.getAllCharacters();
    const characterType = req.body.characterType; // Get the character type from the form

    let newCharacter = {
        id: characters.length + 1,
        name: req.body.name,
        energyLevel: req.body.energyLevel,
        lifeExpectancy: req.body.lifeExpectancy
    };

    // Add character-specific properties based on the type
    if (characterType === 'pirate') {
        newCharacter = {
            ...newCharacter,
            type: req.body.type,
            foodLevel: req.body.foodLevel,
            drinkLevel: req.body.drinkLevel,
            healthLevel: req.body.healthLevel
        };
    } else if (characterType === 'parrot') {
        newCharacter = {
            ...newCharacter,
            type: req.body.type,
            foodLevel: req.body.foodLevel,
            drinkLevel: req.body.drinkLevel,
            flyLevel: req.body.flyLevel,
            healthLevel: req.body.healthLevel
        };
    } else if (characterType === 'monkey') {
        newCharacter = {
            ...newCharacter,
            type: req.body.type,
            foodLevel: req.body.foodLevel,
            drinkLevel: req.body.drinkLevel,
            jumpLevel: req.body.jumpLevel,
            healthLevel: req.body.healthLevel
        };
    }

    // Save the new character
    characters.push(newCharacter);
    characterModel.saveCharacters(characters);

    // Redirect to characters list
    res.redirect('/characters');
};



exports.edit = (req, res) => {
    const character = characterModel.findCharacterById(parseInt(req.params.id));
    res.render('characters/edit', { character });
};

exports.update = (req, res) => {
    let characters = characterModel.getAllCharacters();
    const characterIndex = characters.findIndex(c => c.id === parseInt(req.params.id));
    if (characterIndex >= 0) {
        characters[characterIndex] = { ...characters[characterIndex], ...req.body };
        characterModel.saveCharacters(characters);
    }
    res.redirect('/characters');
};

exports.delete = (req, res) => {
    let characters = characterModel.getAllCharacters();
    characters = characters.filter(c => c.id !== parseInt(req.params.id));
    characterModel.saveCharacters(characters);
    res.redirect('/characters');
};