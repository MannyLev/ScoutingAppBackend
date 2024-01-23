import { JsonObject } from "@prisma/client/runtime/library";

function getSpecificFieldArray(scoutInputs: JsonObject[], field: string) {

    let returnArray: Array<string | number | boolean> = [];
    for(let i = 0; i < scoutInputs.length, i++;) {
        const contents = scoutInputs[i][field];
        // The index is field, but the JSON looks like "field":value so there are 7 characters in between
        // var nextChar = contents.indexOf(field) + 7;
        // var stringBuilder = contents.charAt(contents.indexOf(field) + 7);
        // while ((contents.charAt(nextChar) !== ",") && (contents.charAt(nextChar) !== "}") && (contents.charAt(nextChar) !== null) && (contents.charAt(nextChar) !== undefined)) {
        //     stringBuilder.concat(stringBuilder, contents.charAt(nextChar));
        //     nextChar++;
        // }
        // returnArray.push(stringBuilder)
    }
    return returnArray;

    // What we have to do
    // First, find the type of the field specified by the string
    // Second, create an array of scoutInputs.length with type equal to that found in step 1
    // Third, iterate through the array of jsons and on the next index add that JSON's value for the array
    // Finally, return the array created
    // After, create a request system so that the JSON input will be fed in automatically
    // Could be a request over all matches, over all for a team, a match
}