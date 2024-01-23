import { JsonObject, JsonValue } from "@prisma/client/runtime/library";

// Given an array of JsonObjects, it returns an array of the values under the key "field"
export function getFieldArray(scoutInputs: JsonObject[], field: string) {

    let returnArray: Array<string | number | boolean> = [];
    for(let i = 0; i < scoutInputs.length, i++;) {
        returnArray.push(scoutInputs[i][field] as string | number | boolean);
    }
    return returnArray;

    // Create methods to find the type of the array
    // After, create a request system so that the JSON input will be fed in automatically
    // Could be a request over all matches, over all for a team, a match
}