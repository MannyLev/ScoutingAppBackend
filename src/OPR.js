export async function OPR(json) {
    const numberOfTeam = await getTeamNames(json.tournamentName).length;
    const numberOfAlliances = await getAllMatches(json.tournamentName).length * 2;
    const teams = await getTeamNames(json.tournamentName).sort();
    const getAllMatches = await getAllTeamPerfs(json.tournamentName);

    var M_Array = math.zerosDependencies(numberOfAlliances, teams.length);
    var s_Array = math.zerosDependencies(numberOfAlliances, 1);
    
    var rowNum = 0;

    for (let i = 0; i < getAllMatches.length; i++) {
        var redPerfs = getRedAllianceTeamPerfsForMatch(json.tournamentName, getAllMatches[i].matchNumber); // TODO: Maybe not "red"
        for (let j = 0; j < getRedAllianceTeamPerfsForMatch.length; j++) {
            for (let k = 0; k < teams.length; k++) {
                if (getRedAllianceTeamPerfsForMatch[j].jsonValues.teamName == teams[k].teamName) {
                    M_Array[rowNum][k] = 1;
                } // make sure it's actually team name
            }
            s_Array[rowNum] = getRedAllianceTeamPerfsForMatch[0].jsonValues["score"]; // Require score
        }
        rowNum++;
        var bluePerfs = getBlueAllianceTeamPerfsForMatch(json.tournamentName, getAllMatches[i].matchNumber);
        for (let j = 0; j < getBlueAllianceTeamPerfsForMatch.length; j++) {
            for (let k = 0; k < teams.length; k++) {
                if (getBlueAllianceTeamPerfsForMatch[j].jsonValues.teamName == teams[k].teamName) {
                    M_Array[rowNum][k] = 1;
                } // make sure it's actually team name
            }
            s_Array[rowNum] = getBlueAllianceTeamPerfsForMatch[0].jsonValues["score"]; // Require score
        }
        rowNum++;
    }


  var matrix1Transpose = math.transpose(M_Array);
  var matrix1Copy = matrix1Transpose;
  var leftSide = math.dotMultiply(matrix1Transpose, M_Array);
  var leftInverse = math.inv(leftSide);
  var leftInverseCopy = leftInverse;
  var rightSide = math.dotMultiply(matrix1Copy, s_Array);
  return Math.dotMultiply(leftInverseCopy, rightSide);
  
}

// For each match, 

// TODO: Do something similar to see what percentage they are above average team in offense, defense, and offense - defense