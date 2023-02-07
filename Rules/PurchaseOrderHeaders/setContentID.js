/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function setContentID(context) {
    var clientData = context.evaluateTargetPath("#Page:POHeaders_Create/#ClientData");
    if (!clientData.contentID) {
        clientData.contentID = Date.now();
    }
}
