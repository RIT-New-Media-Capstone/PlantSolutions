/* Author(s): Andrew Black
 * Purpose: general utilities functions for various methods
*/

let plantJson = null;  // Removed import statement and initialized as null
let errorStatement = 'Plant Data not yet Loaded';
var activePlant;

// loads the json data 
const loadPlantsJson = async () => {
    try {
        const response = await fetch('../project/universal/userPlants.json');
        if (!response.ok) {
            throw new Error('Failed to load userPlants.json');
        }
        plantJson = await response.json();

        return true;
    } catch (error) {
        console.error('Error loading JSON:', error);
        return false;
    }
};

const initialize = async () => {
    const isLoaded = await loadPlantsJson();
    if (isLoaded) {
        console.log('json loaded');

    } else {
        console.log('Plant data not loaded, cannot proceed.');
    }
};

initialize();  // Start the initialization

// Check if plantJson is loaded
const isPlantDataLoaded = () => {
    if (!plantJson) {
        console.error(errorStatement);
        return false;
    }
    return true;
};

// grabs the hydration data from the ARDUINO,
// and returns it if there's no major difference from the last recorded hydration difference
const getHydrationAO = (plant = activePlant) => {
    if (!isPlantDataLoaded()) return errorStatement;

    // The minimum difference needed for a hydration change to be made to the plant, in PERCENT
    const hydrationThreshold = 1;

    let hydration = sumOfHydration(plant);
    let currentHydration = getPlantData(plant, "currentHydration");
    let hydrationDiff = hydration - currentHydration;

    // Prevent constantly updating the front end for minor value changes
    return Math.abs(hydrationDiff) < hydrationThreshold ? hydration : currentHydration;
};

// function should read inputs from Arduino, and return a proper sum
const sumOfHydration = (plant = activePlant) => {
    if (!isPlantDataLoaded()) return errorStatement;

    // placeholder return value
    return 1;
};

// Get all plant names from plantJson
const getAllPlantNames = () => {
    if (!isPlantDataLoaded()) return errorStatement;

    let plantNames = [];
    plantJson.plants.forEach(plant => {
        plantNames.push(plant['species']);
    });
    return plantNames;
};

// Get a specific plant by its species name
const getPlant = (speciesName) => {
    if (!isPlantDataLoaded()) return errorStatement;

    return plantJson.plants.find(plant => plant.species === speciesName) || null;
};

// Change the active plant to the first plant or a given one
// Function takes multiple arguments, accounting for String or JSON
// and accounting for default if none of the above are met (or json is null)
// Returns a string for testing
// Saves data to LOCAL STORAGE as well so multiple html scripts can utilize it
const changeActivePlant = (plant = null) => {
    if (!isPlantDataLoaded()) return errorStatement;

    // If the input is a string, search for the corresponding plant
    if (typeof plant === 'string') {
        const foundPlant = plantJson.plants.find(p => p.species === plant);
        if (foundPlant) {
            activePlant = foundPlant;
            localStorage.setItem('activePlant', JSON.stringify(activePlant));
            return `Active plant set to "${plant}".`;
        } else {
            return `Plant named "${plant}" not found.`;
        }
    }
    // if the input is an JSON object, sets the plant directly from file
    else if (typeof plant === 'object' && plant !== null) {
        activePlant = plant;
        localStorage.setItem('activePlant', JSON.stringify(activePlant));
        return `Active plant set directly.`;
    }
    // If no plant is provided, set to default
    else {
        activePlant = plantJson.plants[0];
        localStorage.setItem('activePlant', JSON.stringify(activePlant));
        return `Plant set to default.`;
    }
};


// Get specific part of the plant data from its JSON
const getPlantData = (detail, plant = activePlant) => {
    if (!isPlantDataLoaded()) return errorStatement;

    return plant ? plant[detail] : errorStatement;
};

// Add a new plant, returning a success or failure message
const addNewPlant = (species, hydrationGood, hydrationMid, hydrationBad, hydrationCritical) => {
    if (!isPlantDataLoaded()) return errorStatement;

    const duplicate = determineDupe(species);
    if (duplicate) return "Plant failed, Name in Use";

    const newPlant = {
        "species": species,
        "currentHydration": null,
        "hydrationGood": hydrationGood,
        "hydrationMid": hydrationMid,
        "hydrationBad": hydrationBad,
        "hydrationCritical": hydrationCritical
    };

    plantJson.plants.push(newPlant);
    return "Successful push";
};

// Check if a plant with the same name already exists
const determineDupe = (species) => {
    if (!isPlantDataLoaded()) return false;

    return plantJson.plants.some(plant => plant.species === species);
};

// attempt to remove a plant from the plantJson, and return a message
// of success/fail if the plant could be found
/* const removePlant = (species) => {
    if (!isPlantDataLoaded()) return errorStatement;

    const plantIndex = plantJson.plants.findIndex(plant => plant.species === species);
    if (plantIndex !== -1) {
        plantJson.plants.splice(plantIndex, 1);
        return "Plant removed successfully";
    }
    return "Plant not found";
}; */

export {
    getHydrationAO,
    changeActivePlant,
    getPlantData,
    addNewPlant,
    getAllPlantNames,
    loadPlantsJson
};
