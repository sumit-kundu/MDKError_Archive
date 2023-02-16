/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function saveItemToLocal(context) {
    var clientData = context.evaluateTargetPath("#Page:POHeaders_Create/#ClientData");
    if (!clientData.POItems) {
        clientData.POItems = [];
    }
    clientData.POItems.push({
        
        "CurrencyCode": context.getPageProxy().evaluateTargetPath("#Control:CurrencyCode/#Value"),
        "GrossAmount": context.getPageProxy().evaluateTargetPath("#Control:GrossAmount/#Value"),
        "ItemNumber": context.getPageProxy().evaluateTargetPath("#Control:ItemNumber/#Value"),
        "NetAmount": context.getPageProxy().evaluateTargetPath("#Control:NetAmount/#Value"),
        // "ProductId": context.getPageProxy().evaluateTargetPath("#Control:ProductId/#SelectedValue"),
        // "PurchaseOrderId": context.getPageProxy().evaluateTargetPath("#Control:PurchaseOrderId/#SelectedValue"),
        "Quantity": context.getPageProxy().evaluateTargetPath("#Control:Quantity/#Value"),
        "QuantityUnit": context.getPageProxy().evaluateTargetPath("#Control:QuantityUnit/#Value"),
        "TaxAmount": context.getPageProxy().evaluateTargetPath("#Control:TaxAmount/#Value")
    });
    
    return context.executeAction("/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/POHeaders_CreatePurchaseOrderItem.action");

    // return createPOItem.then((result) => {
    //     return clientAPI.executeAction("/MyApp/Actions/NavigateToProductList.action");
    // }), (error) => {
    //     alert(`Action Failed: ${error}`);
    // };
}
