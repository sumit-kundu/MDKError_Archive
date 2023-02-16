/**
* Describe this function...
* @param {IClientAPI} clientAPI
*/
export default function getPOItems(context) {
    let myPOHeaderClientData = context.evaluateTargetPath("#Page:POHeaders_Create/#ClientData");
    if (!myPOHeaderClientData.POItems) {
        myPOHeaderClientData.POItems = [];
    }
}