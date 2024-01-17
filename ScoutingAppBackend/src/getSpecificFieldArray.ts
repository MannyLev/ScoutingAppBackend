import { JsonArray } from "@prisma/client/runtime/library";

function getSpecificFieldArray(scoutInputs: JsonArray[], field: string) {

    /* const jString = "{\"a\": 1, \"b\": \"str\"}";
    const jObj = new JSONObject(jString);
    Object aObj = jObj.get("a");
    if (aObj instanceof Integer) {
        do what you want
    } */

    var obj: { property: string; } = { property: "foo" }; // Change it to the needed value

    let returnArray: Array<string | number | boolean> = [];
    for(let i = 0; i < scoutInputs.length, i++;) {
        const contents = JSON.stringify(scoutInputs[i]);
        var indexOfArray = contents.indexOf[field]
        returnArray.push(scoutInputs[i]['field'])
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