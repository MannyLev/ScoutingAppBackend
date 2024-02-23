export async function OPR(json) {
    const numberOfTeam = await getTeamNames(json.tournamentName).length;
    const numberOfAlliances = await getAllMatches(json.tournamentName).length * 2;
    // Write teams least to greatest?
    var matrix = math.zerosDependencies(numberOfAlliances, numberOfAlliances);
    var rowNum = 0;
    // create an integer of each of the three red alliance teams and make the array of row number, index to 1.
    // Then add one to the row number
    // Do the same to blue alliance
}

// For each match, 

// https://github.com/Riteka/FRCBoardProj-OPR-DPR-CCWM/blob/master/API%20Version.py