/* Author(s): Andrew Black
 * Purpose: general utilities functions for various methods
*/

import plantJson from './userPlants.json';

//var plantJson = json;
var activePlant;

// grabs the hydration data from the ARDUINO,
// and returns it if there's no major difference from the last recorded
// hydration difference 
// NOTE:
// I anticpate that this function will be called every few seconds or so
const getHydrationAO = (plant = this.activePlant) => {

    // the minimum difference needed for a hydration change to be made to the plant, in PERCENT
    const hydrationThreshold = 1;

    hydration = sumOfHydration(plant);
    currentHydration = getPlantData(plant, "currentHydration");
    hydrationDiff = hydration - currentHydration;

    // check to see if the difference in hydration is less than the threshold
    // this is to prevent constantly updating the front end for minor value changes
    if (Math.abs(hydrationDiff) < hydrationThreshold) {
        return hydration;
    } else {
        return currentHydration;
    }
}

// function should read inputs from Arduino, and retun a proper sum
// this functions existence is based on the way Arduino may be sending
// the readings. If it's sending data every frame, then we need to parse through the data
// and determine what a proper level is. 
const sumOfHydration = (plant = this.activePlant) => {

    // something something read the arduino inputs

    // placeholder return value
    return 1;

}

getPlant = (speciesName) => {
    plantJson.plants.forEach(plant => {
        if (plant.species === speciesName) {
            return plant;
        }
    });

    return null;
}

changeActivePlant = (plant = plantJson.plants[0]) => {
    this.activePlant = plant;
}

// returns specific part of the plant data from its json
// plant = plant name (likely activePlant)
// detail = portion of json data we want
getPlantData = (plant = this.activePlant, detail) => {
    return plant[detail];
}

// add a newplant, returning a success or fail message entirely dependent if the plant species already exists
// NOTE:
// plant species doesn't need to be exact - if you have two Aloes for example, naming one to Aloe1 and Aloe2 makes sense
// and WON'T be rejected
const addNewPlant = (species, hydrationGood, hydrationMid, hydrationBad, hydrationCritical) => {

    duplicate = determineDupe(species);

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

    return "Succesful push";
}

// loop through the plantJson plants array and determine if a plant of the same
// name exists already
determineDupe = (species) => {

    plantJson.plants.forEach(plant => {
        if (plant.species === species) {
            return true;
        }
    });

    return false;


}

// attempt to remove a plant from the plantJson, and return a message
// of success/fail if the plant could be found
/* removePlant = (species) => {

    plantJson.plants.forEach(plant => {
        if (plant.species === species) {
            // remove
        }
    });
} */

export {
    getHydrationAO,
    changeActivePlant,
    getPlantData,
    addNewPlant
}