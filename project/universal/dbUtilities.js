/* Author(s): Andrew Black
 * Purpose: dbUtilities is a utilities file ONLY for the plantsDB.json file, containg helpful methods
 * to find data
 */

import db from './plantsDB.json';
import util from './utilites.js';


getPlant = (speciesName) => {
    return util.getPlant(speciesName, this.db);
}

determineDupe = (speciesName) => {
    return util.determineDupe(speciesName, this.db);
}

getPlantData = (speciesName) => {
    return util.getPlantData(speciesName, detail);
}

// add a newplant, returning a success or fail message entirely dependent if the plant species already exists
// NOTE:
// plant species doesn't need to be exact - if you have two Aloes for example, naming one to Aloe1 and Aloe2 makes sense
// and WON'T be rejected
addNewPlant = (species, hydrationGood, hydrationMid, hydrationBad, hydrationCritical) => {

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

    db.plants.push(newPlant);

    return "Succesful push";
}