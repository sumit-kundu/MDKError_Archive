(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/MDK_ErrorArchive/i18n/i18n.properties":
/*!*****************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/i18n/i18n.properties ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/AppUpdateFailure.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/AppUpdateFailure.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/MDK_ErrorArchive/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/AppUpdateSuccess.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/AppUpdateSuccess.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_ErrorArchive/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/MDK_ErrorArchive/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CheckForSyncError)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} context
 */
function CheckForSyncError(context) {
  context.count('/MDK_ErrorArchive/Services/SampleServiceV2.service', 'ErrorArchive', '').then(errorCount => {
    if (errorCount > 0) {
      return context.getPageProxy().executeAction('/MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_SyncFailure.action').then(function () {
        return Promise.reject(false);
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ErrorArchive_DecideWhichEditPage)
/* harmony export */ });
function ErrorArchive_DecideWhichEditPage(context) {
  //Current binding's root is the errorArchiveEntity:
  let errorArchiveEntity = context.binding;
  //Get the affectedEntity object out of it
  let affectedEntity = errorArchiveEntity.AffectedEntity;
  console.log("Affected Entity Is:");
  console.log(affectedEntity);
  let targetAction = null;
  let id = affectedEntity["@odata.id"]; //e.g. PurchaseOrderHeaders(12345)
  let affectedEntityType = "Unknown Entity Set"; //By default it's unknown type
  if (id.indexOf("(") > 0) {
    //Extracting the entity set type from @odata.id e.g. PurchaseOrderHeaders
    var patt = /\/?(.+)\(/i;
    var result = id.match(patt);
    affectedEntityType = result[1];
  }
  console.log("Affected Entity Type Is:");
  console.log(affectedEntityType);
  //Here we decide which action to call depends on which affectedEntityType is the affectedEntity
  // You can add more complex decision logic if needed
  switch (affectedEntityType) {
    case "PurchaseOrderHeaders":
      targetAction = "/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action";
      break;
    default:
      //Save the affected Entity's type in client data so that it can be displayed by the toast
      context.getPageProxy().getClientData().AffectedEntityType = affectedEntityType;
      // Show a toast for affectedEntityType that we do not handle yet
      return context.executeAction("/MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action");
  }
  if (targetAction) {
    let pageProxy = context.getPageProxy();
    //Set the affectedEntity object to root the binding context.
    pageProxy.setActionBinding(affectedEntity);
    //Note: doing 'return' here is important to chain the current context to the action.
    // Without the return the ActionBinding will not be passed to the action because it will consider
    // you are executing this action independent of the current context.
    return context.executeAction(targetAction);
  }
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/OnWillUpdate.js":
/*!******************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/OnWillUpdate.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/MDK_ErrorArchive/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_ErrorArchive/Actions/Service/CloseOffline.action').then(success => Promise.resolve(success), failure => Promise.reject('Offline Odata Close Failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/Products/Products_DeleteConfirmation.js":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/Products/Products_DeleteConfirmation.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDK_ErrorArchive/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_ErrorArchive/Actions/Products/Products_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js ***!
  \******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDK_ErrorArchive/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDK_ErrorArchive/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/ResetAppSettingsAndLogout.js":
/*!*******************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/ResetAppSettingsAndLogout.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ResetAppSettingsAndLogout)
/* harmony export */ });
function ResetAppSettingsAndLogout(context) {
  let logger = context.getLogger();
  let platform = context.nativescript.platformModule;
  let appSettings = context.nativescript.appSettingsModule;
  var appId;
  if (platform && (platform.isIOS || platform.isAndroid)) {
    appId = context.evaluateTargetPath('#Application/#AppData/MobileServiceAppId');
  } else {
    appId = 'WindowsClient';
  }
  try {
    // Remove any other app specific settings
    appSettings.getAllKeys().forEach(key => {
      if (key.substring(0, appId.length) === appId) {
        appSettings.remove(key);
      }
    });
  } catch (err) {
    logger.log(`ERROR: AppSettings cleanup failure - ${err}`, 'ERROR');
  } finally {
    // Logout 
    return context.getPageProxy().executeAction('/MDK_ErrorArchive/Actions/Logout.action');
  }
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Rules/Suppliers/Suppliers_DeleteConfirmation.js":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Rules/Suppliers/Suppliers_DeleteConfirmation.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DeleteConfirmation)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function DeleteConfirmation(clientAPI) {
  return clientAPI.executeAction('/MDK_ErrorArchive/Actions/DeleteConfirmation.action').then(result => {
    if (result.data) {
      return clientAPI.executeAction('/MDK_ErrorArchive/Actions/Suppliers/Suppliers_DeleteEntity.action').then(success => Promise.resolve(success), failure => Promise.reject('Delete entity failed ' + failure));
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Styles/Styles.css":
/*!**************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Styles/Styles.css ***!
  \**************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n", "",{"version":3,"sources":["webpack://./build.definitions/MDK_ErrorArchive/Styles/Styles.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/\n"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Styles/Styles.less":
/*!***************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Styles/Styles.less ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/", "",{"version":3,"sources":["webpack://./build.definitions/MDK_ErrorArchive/Styles/Styles.less"],"names":[],"mappings":"AAAA;;;;;;;;;;;;;;;;;;;;CAoBC","sourcesContent":["/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.\n\nExamples:\n\n@mdkYellow1: #ffbb33;\n@mdkRed1: #ff0000;\n\n//// By-Type style: All Pages in the application will now have a yellow background\nPage\n\n{ background-color: @mdkYellow1; }\n//// By-Name style: All Buttons with _Name == \"BlueButton\" will now have this style\n#BlueButton\n\n{ color: @mdkYellow1; background-color: #0000FF; }\n//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function\n\n.MyButton\n\n{ color: @mdkYellow1; background-color: @mdkRed1; }\n*/"],"sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Styles/Styles.light.css":
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Styles/Styles.light.css ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Styles/Styles.light.nss":
/*!********************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Styles/Styles.light.nss ***!
  \********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js":
/*!*******************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/api.js ***!
  \*******************************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!**************************************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-1.2301.0/tools/node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \**************************************************************************************************************************************************/
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_Detail.page":
/*!****************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_Detail.page ***!
  \****************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"_Type":"Section.Type.ObjectTable","Target":"{AffectedEntity}","_Name":"SectionObjectTable0","Header":{"_Name":"SectionHeader0","UseTopPadding":true,"Caption":"Affected Entity: {#Page:-Current/AffectedEntity/@odata.type}"},"Visible":true,"EmptySection":{"FooterVisible":false},"ObjectCell":{"Title":"Edit Affected Entity","Subhead":"{@odata.id}","DisplayDescriptionInMobile":true,"PreserveIconStackSpacing":false,"AccessoryType":"disclosureIndicator","Tags":[],"AvatarStack":{"Avatars":[],"ImageIsCircular":true,"ImageHasBorder":false},"AvatarGrid":{"Avatars":[],"ImageIsCircular":true},"OnPress":"/MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js","Selected":false,"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true}},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}},{"KeyAndValues":[{"Value":"{Message}","_Name":"KeyValue0","KeyName":"Error","Visible":true},{"Value":"{RequestBody}","_Name":"KeyValue1","KeyName":"Request Body","Visible":true},{"Value":"{RequestURL}","_Name":"KeyValue2","KeyName":"Request URL","Visible":true},{"Value":"{HTTPStatusCode}","_Name":"KeyValue3","KeyName":"HTTP Status Code","Visible":true},{"Value":"{RequestMethod}","_Name":"KeyValue4","KeyName":"Request Method","Visible":true}],"MaxItemCount":1,"_Type":"Section.Type.KeyValue","_Name":"SectionKeyValue0","Visible":true,"EmptySection":{"FooterVisible":false},"Layout":{"NumberOfColumns":1}}]}],"_Type":"Page","_Name":"ErrorArchive_Detail","Caption":"Details","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_List.page":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_List.page ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable0","Sections":[{"_Type":"Section.Type.ObjectTable","Target":{"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","EntitySet":"ErrorArchive"},"_Name":"SectionObjectTable0","Visible":true,"EmptySection":{"FooterVisible":false,"Caption":"No record found!"},"ObjectCell":{"ContextMenu":{"Items":[],"PerformFirstActionWithFullSwipe":true},"Title":"{HTTPStatusCode}","Subhead":"{RequestURL}","Footnote":"{Message}","StatusText":"{RequestMethod}","AvatarStack":{"ImageIsCircular":false},"PreserveIconStackSpacing":false,"AccessoryType":"none","OnPress":"/MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_Detail.action","Selected":false},"DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"HighlightSelectedItem":false,"Selection":{"ExitOnLastDeselect":true,"LongPressToEnable":"None","Mode":"None"}}]}],"_Type":"Page","_Name":"ErrorArchive_List","Caption":"Error List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/Main.page":
/*!************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/Main.page ***!
  \************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Main","Controls":[{"_Name":"SectionedTable0","_Type":"Control.Type.SectionedTable","Sections":[{"Buttons":[{"OnPress":"/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_List.action","Alignment":"Center","Title":"Suppliers","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action","Alignment":"Center","Title":"PurchaseOrderHeaders","ButtonType":"Text","Semantic":"Tint"},{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action","Alignment":"Center","Title":"PurchaseOrderItems","ButtonType":"Text","Semantic":"Tint"}],"_Name":"SectionButtonTable0","_Type":"Section.Type.ButtonTable"}]}],"_Name":"Main","_Type":"Page","ToolBar":{"Items":[{"_Name":"LogoutToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Logout","OnPress":"/MDK_ErrorArchive/Actions/LogoutMessage.action"},{"_Name":"UploadToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Sync","OnPress":"/MDK_ErrorArchive/Actions/Service/SyncStartedMessage.action","Visible":"$(PLT,true,true,false)"},{"_Name":"UpdateToolbarItem","_Type":"Control.Type.ToolbarItem","Caption":"Update","Enabled":true,"Clickable":true,"OnPress":"/MDK_ErrorArchive/Actions/AppUpdateProgressBanner.action","Visible":"$(PLT,true,true,false)"}]},"PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/Products/Products_Detail.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/Products/Products_Detail.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Product Detail","DesignTimeTarget":{"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/Products/NavToProducts_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDK_ErrorArchive/Actions/Products/Products_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"/MDK_ErrorArchive/Services/SampleServiceV2.service/{@odata.readLink}/$value","HeadlineText":"{Name}","Subhead":"{Category}","BodyText":"","Footnote":"{CurrencyCode}","Description":"{CategoryName}","StatusText":"{DimensionDepth}","StatusImage":"","SubstatusImage":"","SubstatusText":"{DimensionHeight}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"Category","Value":"{Category}"},{"KeyName":"CategoryName","Value":"{CategoryName}"},{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"DimensionDepth","Value":"{DimensionDepth}"},{"KeyName":"DimensionHeight","Value":"{DimensionHeight}"},{"KeyName":"DimensionUnit","Value":"{DimensionUnit}"},{"KeyName":"DimensionWidth","Value":"{DimensionWidth}"},{"KeyName":"LongDescription","Value":"{LongDescription}"},{"KeyName":"Name","Value":"{Name}"},{"KeyName":"PictureUrl","Value":"{PictureUrl}"},{"KeyName":"Price","Value":"{Price}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"ShortDescription","Value":"{ShortDescription}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"},{"KeyName":"Weight","Value":"{Weight}"},{"KeyName":"WeightUnit","Value":"{WeightUnit}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Products_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/Products/Products_Edit.page":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/Products/Products_Edit.page ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Product Detail","DesignTimeTarget":{"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","EntitySet":"Products","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDK_ErrorArchive/Actions/Products/Products_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"Category","_Name":"Category","Value":"{Category}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","Value":"{CategoryName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","_Name":"DimensionDepth","Value":"{DimensionDepth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","_Name":"DimensionHeight","Value":"{DimensionHeight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","Value":"{DimensionUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","_Name":"DimensionWidth","Value":"{DimensionWidth}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","Value":"{LongDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","Value":"{Name}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","Value":"{PictureUrl}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","_Name":"Price","Value":"{Price}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ProductId}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Stock","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"Value":"{ProductId}","_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","Value":"{ShortDescription}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"Value":"{SupplierId}","_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Value":"{UpdatedTimestamp}","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Weight","_Name":"Weight","Value":"{Weight}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","Value":"{WeightUnit}","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Products_Edit"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create PurchaseOrderHeader Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PurchaseOrderId","_Name":"PurchaseOrderId","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Create"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page":
/*!*************************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page ***!
  \*************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create PurchaseOrderItem","Controls":[{"Sections":[{"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderId}","ReturnValue":"{PurchaseOrderId}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"_Name":"PurchaseOrderId","_Type":"Control.Type.FormCell.ListPicker","Value":"{PurchaseOrderId}"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_CreatePurchaseOrderItem"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page":
/*!********************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page ***!
  \********************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeader Detail","DesignTimeTarget":{"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{PurchaseOrderId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{NetAmount}","Description":"{GrossAmount}","StatusText":"{SupplierId}","StatusImage":"","SubstatusImage":"","SubstatusText":"{TaxAmount}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Items"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}","OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Items","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["PurchaseOrderItems"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update PurchaseOrderHeader Detail","DesignTimeTarget":{"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderHeaders","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PurchaseOrderId","_Name":"PurchaseOrderId","Value":"{PurchaseOrderId}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"Value":"{SupplierId}","_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_Edit"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page":
/*!******************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page ***!
  \******************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderHeaders","ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action","StatusImage":"","Title":"{PurchaseOrderId}","Footnote":"{NetAmount}","PreserveIconStackSpacing":false,"StatusText":"{SupplierId}","Subhead":"{CurrencyCode}","SubstatusText":"{TaxAmount}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderHeaders_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create PurchaseOrderItem Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","KeyboardType":"Number","_Name":"ItemNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderId}","ReturnValue":"{PurchaseOrderId}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"_Name":"PurchaseOrderId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"Quantity","KeyboardType":"Number","_Name":"Quantity","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderItems_Create"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page":
/*!****************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page ***!
  \****************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDK_ErrorArchive/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js","Position":"Right","SystemItem":"Trash"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{ProductId}","Subhead":"{CurrencyCode}","BodyText":"","Footnote":"{ItemNumber}","Description":"{GrossAmount}","StatusText":"{NetAmount}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PurchaseOrderId}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"CurrencyCode","Value":"{CurrencyCode}"},{"KeyName":"GrossAmount","Value":"{GrossAmount}"},{"KeyName":"ItemNumber","Value":"{ItemNumber}"},{"KeyName":"NetAmount","Value":"{NetAmount}"},{"KeyName":"ProductId","Value":"{ProductId}"},{"KeyName":"PurchaseOrderId","Value":"{PurchaseOrderId}"},{"KeyName":"Quantity","Value":"{Quantity}"},{"KeyName":"QuantityUnit","Value":"{QuantityUnit}"},{"KeyName":"TaxAmount","Value":"{TaxAmount}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"}],"DataSubscriptions":[],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update PurchaseOrderItem Detail","DesignTimeTarget":{"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","EntitySet":"PurchaseOrderItems","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","Value":"{CurrencyCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","_Name":"GrossAmount","Value":"{GrossAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ItemNumber","_Name":"ItemNumber","Value":"{ItemNumber}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"NetAmount","_Name":"NetAmount","Value":"{NetAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{Name}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Products","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"Value":"{ProductId}","_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"PurchaseOrderId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{PurchaseOrderId}","ReturnValue":"{PurchaseOrderId}","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"Value":"{PurchaseOrderId}","_Name":"PurchaseOrderId","_Type":"Control.Type.FormCell.ListPicker","IsEditable":false},{"Caption":"Quantity","_Name":"Quantity","Value":"{Quantity}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","Value":"{QuantityUnit}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"TaxAmount","_Name":"TaxAmount","Value":"{TaxAmount}","KeyboardType":"Number","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"PurchaseOrderItems_Edit"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"PurchaseOrderItems","ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action","StatusImage":"","Title":"{ProductId}","Footnote":"{ItemNumber}","PreserveIconStackSpacing":false,"StatusText":"{NetAmount}","Subhead":"{CurrencyCode}","SubstatusText":"{PurchaseOrderId}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"PurchaseOrderItems_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Create.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Create.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateEntity.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Supplier Detail","Controls":[{"Sections":[{"Controls":[{"Caption":"City","_Name":"City","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"EmailAddress","_Name":"EmailAddress","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","_Name":"SupplierId","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierName","_Name":"SupplierName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Suppliers_Create"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreateProduct.page":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreateProduct.page ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateProduct.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create Product","Controls":[{"Sections":[{"Controls":[{"Caption":"Category","_Name":"Category","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CategoryName","_Name":"CategoryName","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionDepth","KeyboardType":"Number","_Name":"DimensionDepth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionHeight","KeyboardType":"Number","_Name":"DimensionHeight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionUnit","_Name":"DimensionUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"DimensionWidth","KeyboardType":"Number","_Name":"DimensionWidth","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"LongDescription","_Name":"LongDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Name","_Name":"Name","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PictureUrl","_Name":"PictureUrl","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Price","KeyboardType":"Number","_Name":"Price","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ProductId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":true,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{ProductId}","ReturnValue":"{ProductId}","Target":{"EntitySet":"Stock","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"_Name":"ProductId","_Type":"Control.Type.FormCell.ListPicker"},{"Caption":"QuantityUnit","_Name":"QuantityUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"ShortDescription","_Name":"ShortDescription","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker","Value":"{SupplierId}"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"},{"Caption":"Weight","KeyboardType":"Number","_Name":"Weight","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"WeightUnit","_Name":"WeightUnit","_Type":"Control.Type.FormCell.SimpleProperty"},{"AttachmentTitle":"Media","AttachmentAddTitle":"Browse","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AllowedFileTypes":["jpg","png","gif"],"_Name":"Attachment","_Type":"Control.Type.FormCell.Attachment"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Suppliers_CreateProduct"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreatePurchaseOrderHeader.page":
/*!*****************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreatePurchaseOrderHeader.page ***!
  \*****************************************************************************************************/
/***/ ((module) => {

module.exports = {"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action","Position":"Left","SystemItem":"Cancel"},{"OnPress":"/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreatePurchaseOrderHeader.action","Position":"Right","SystemItem":"Save"}]},"Caption":"Create PurchaseOrderHeader","Controls":[{"Sections":[{"Controls":[{"Caption":"CurrencyCode","_Name":"CurrencyCode","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"GrossAmount","KeyboardType":"Number","_Name":"GrossAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"NetAmount","KeyboardType":"Number","_Name":"NetAmount","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PurchaseOrderId","_Name":"PurchaseOrderId","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","AllowMultipleSelection":false,"AllowEmptySelection":true,"IsEditable":false,"IsPickerDismissedOnSelection":true,"IsSelectedSectionEnabled":true,"PickerItems":{"DisplayValue":"{SupplierName}","ReturnValue":"{SupplierId}","Target":{"EntitySet":"Suppliers","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"}},"_Name":"SupplierId","_Type":"Control.Type.FormCell.ListPicker","Value":"{SupplierId}"},{"Caption":"TaxAmount","KeyboardType":"Number","_Name":"TaxAmount","_Type":"Control.Type.FormCell.SimpleProperty"}]}],"_Name":"FormCellContainer","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Suppliers_CreatePurchaseOrderHeader"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Detail.page":
/*!**********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Detail.page ***!
  \**********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Supplier Detail","DesignTimeTarget":{"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","EntitySet":"Suppliers","QueryOptions":""},"ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Edit.action","Position":"Right","SystemItem":"Edit"},{"OnPress":"/MDK_ErrorArchive/Actions/Suppliers/Suppliers_DetailPopover.action","Position":"Right","Caption":"More"}]},"Controls":[{"Sections":[{"ObjectHeader":{"Tags":[],"DetailImage":"","HeadlineText":"{SupplierName}","Subhead":"{City}","BodyText":"","Footnote":"{EmailAddress}","Description":"{Country}","StatusText":"{HouseNumber}","StatusImage":"","SubstatusImage":"","SubstatusText":"{PhoneNumber}"},"_Type":"Section.Type.ObjectHeader"},{"KeyAndValues":[{"KeyName":"City","Value":"{City}"},{"KeyName":"Country","Value":"{Country}"},{"KeyName":"EmailAddress","Value":"{EmailAddress}"},{"KeyName":"HouseNumber","Value":"{HouseNumber}"},{"KeyName":"PhoneNumber","Value":"{PhoneNumber}"},{"KeyName":"PostalCode","Value":"{PostalCode}"},{"KeyName":"Street","Value":"{Street}"},{"KeyName":"SupplierId","Value":"{SupplierId}"},{"KeyName":"SupplierName","Value":"{SupplierName}"},{"KeyName":"UpdatedTimestamp","Value":"{UpdatedTimestamp}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValue0","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Address"},"KeyAndValues":[{"KeyName":"HouseNumber","Value":"{Address/HouseNumber}"},{"KeyName":"Street","Value":"{Address/Street}"},{"KeyName":"City","Value":"{Address/City}"},{"KeyName":"Country","Value":"{Address/Country}"},{"KeyName":"PostalCode","Value":"{Address/PostalCode}"}],"Layout":{"NumberOfColumns":2},"MaxItemCount":1,"_Name":"SectionKeyValueAddress","_Type":"Section.Type.KeyValue"},{"Header":{"Caption":"Products"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{CategoryName}","AvatarStack":{"Avatars":[{"Image":"/MDK_ErrorArchive/Services/SampleServiceV2.service/{@odata.readLink}/$value"}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{Name}","Footnote":"{CurrencyCode}","PreserveIconStackSpacing":false,"StatusText":"{DimensionDepth}","Subhead":"{Category}","SubstatusText":"{DimensionHeight}","OnPress":"/MDK_ErrorArchive/Actions/Products/NavToProducts_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/Products","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"},{"Header":{"Caption":"PurchaseOrders"},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{GrossAmount}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"StatusImage":"","Title":"{PurchaseOrderId}","Footnote":"{NetAmount}","PreserveIconStackSpacing":false,"StatusText":"{SupplierId}","Subhead":"{CurrencyCode}","SubstatusText":"{TaxAmount}","OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action"},"EmptySection":{"Caption":"No record found!"},"Target":{"EntitySet":"{@odata.readLink}/PurchaseOrders","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"},"_Type":"Section.Type.ObjectTable"}],"DataSubscriptions":["Products","PurchaseOrderHeaders"],"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Suppliers_Detail","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Edit.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Edit.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Update Supplier Detail","DesignTimeTarget":{"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","EntitySet":"Suppliers","QueryOptions":""},"ActionBar":{"Items":[{"Position":"Left","SystemItem":"Cancel","OnPress":"/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action"},{"Position":"Right","SystemItem":"Save","OnPress":"/MDK_ErrorArchive/Actions/Suppliers/Suppliers_UpdateEntity.action"}]},"Controls":[{"Sections":[{"Caption":"","Controls":[{"Caption":"City","_Name":"City","Value":"{City}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Country","_Name":"Country","Value":"{Country}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"EmailAddress","_Name":"EmailAddress","Value":"{EmailAddress}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"HouseNumber","_Name":"HouseNumber","Value":"{HouseNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PhoneNumber","_Name":"PhoneNumber","Value":"{PhoneNumber}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"PostalCode","_Name":"PostalCode","Value":"{PostalCode}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"Street","_Name":"Street","Value":"{Street}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Caption":"SupplierId","_Name":"SupplierId","Value":"{SupplierId}","_Type":"Control.Type.FormCell.SimpleProperty","IsEditable":false},{"Caption":"SupplierName","_Name":"SupplierName","Value":"{SupplierName}","_Type":"Control.Type.FormCell.SimpleProperty"},{"Mode":"Datetime","_Name":"UpdatedTimestamp","Value":"{UpdatedTimestamp}","Caption":"UpdatedTimestamp","_Type":"Control.Type.FormCell.DatePicker"}]}],"_Name":"PageOneFormCell","_Type":"Control.Type.FormCellContainer"}],"_Type":"Page","_Name":"Suppliers_Edit"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_List.page":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_List.page ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"Caption":"Suppliers","ActionBar":{"Items":[{"OnPress":"/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Create.action","Position":"Right","SystemItem":"Add"}]},"Controls":[{"Sections":[{"Header":{"UseTopPadding":false},"ObjectCell":{"AccessoryType":"disclosureIndicator","Description":"{Country}","AvatarStack":{"Avatars":[{"Image":""}],"ImageIsCircular":false},"Icons":[],"OnPress":"/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Detail.action","StatusImage":"","Title":"{SupplierName}","Footnote":"{EmailAddress}","PreserveIconStackSpacing":false,"StatusText":"{HouseNumber}","Subhead":"{City}","SubstatusText":"{PhoneNumber}"},"EmptySection":{"Caption":"No record found!"},"Search":{"Enabled":true,"Placeholder":"Item Search","BarcodeScanner":true,"Delay":500,"MinimumCharacterThreshold":3},"DataPaging":{"ShowLoadingIndicator":true,"LoadingIndicatorText":"Loading more items, please wait..."},"Target":{"EntitySet":"Suppliers","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","QueryOptions":""},"_Type":"Section.Type.ObjectTable"}],"LoadingIndicator":{"Enabled":true,"Text":"Loading, please wait..."},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable"}],"_Type":"Page","_Name":"Suppliers_List","PrefersLargeCaption":true}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"_Name":"MDK_ErrorArchive","Version":"/MDK_ErrorArchive/Globals/AppDefinition_Version.global","MainPage":"/MDK_ErrorArchive/Pages/Main.page","OnLaunch":["/MDK_ErrorArchive/Actions/Service/InitializeOffline.action"],"OnWillUpdate":"/MDK_ErrorArchive/Rules/OnWillUpdate.js","OnDidUpdate":"/MDK_ErrorArchive/Actions/Service/InitializeOffline.action","Styles":"/MDK_ErrorArchive/Styles/Styles.css","Localization":"/MDK_ErrorArchive/i18n/i18n.properties","_SchemaVersion":"6.3","StyleSheets":{"Styles":{"css":"/MDK_ErrorArchive/Styles/Styles.light.css","ios":"/MDK_ErrorArchive/Styles/Styles.light.nss","android":"/MDK_ErrorArchive/Styles/Styles.light.json"}},"SDKStyles":{"ios":"/MDK_ErrorArchive/Styles/Styles.light.nss","android":"/MDK_ErrorArchive/Styles/Styles.light.json"}}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/AppUpdate.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/AppUpdate.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/MDK_ErrorArchive/Rules/AppUpdateFailure.js","OnSuccess":"/MDK_ErrorArchive/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/AppUpdateFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/AppUpdateFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/AppUpdateProgressBanner.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/AppUpdateProgressBanner.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/MDK_ErrorArchive/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/AppUpdateSuccessMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/AppUpdateSuccessMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Canceled","CancelPendingActions":true,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/CloseModalPage_Complete.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/CloseModalPage_Complete.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"DismissModal":"Action.Type.ClosePage.Completed","CancelPendingActions":false,"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/ClosePage.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/ClosePage.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Create entity failure - {#ActionResults:create/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity created","IsIconHidden":true,"OnSuccess":"/MDK_ErrorArchive/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/DeleteConfirmation.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/DeleteConfirmation.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Delete current entity?","Title":"Confirmation","OKCaption":"OK","CancelCaption":"Cancel","ActionResult":{"_Name":"DeleteConfirmation"}}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/DeleteEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/DeleteEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Delete entity failure - {#ActionResults:delete/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/DeleteEntitySuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/DeleteEntitySuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity deleted","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDK_ErrorArchive/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_SyncFailure.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_SyncFailure.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.BannerMessage","Message":"Upload failed!","Duration":0,"Animated":false,"OnActionLabelPress":"/MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_List.action","ActionLabel":"View Errors"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ToastMessage","Message":"Affected Entity {AffectedEntity/@odata.id} doesn't have handler yet.","Duration":4,"Animated":true}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_Detail.action":
/*!*************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_Detail.action ***!
  \*************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_Detail.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_List.action":
/*!***********************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_List.action ***!
  \***********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_List.page","NavigationType":"Inner"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Logout.action":
/*!******************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Logout.action ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = {"SkipReset":false,"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/LogoutMessage.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/LogoutMessage.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"CancelCaption":"No","Message":"This action will remove all data and return to the Welcome screen. Any local data will be lost. Are you sure you want to continue?","OKCaption":"Yes","OnOK":"/MDK_ErrorArchive/Rules/ResetAppSettingsAndLogout.js","Title":"Logout","_Type":"Action.Type.Message"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/OnWillUpdate.action":
/*!************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/OnWillUpdate.action ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Products/NavToProducts_Detail.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Products/NavToProducts_Detail.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_ErrorArchive/Pages/Products/Products_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Products/NavToProducts_Edit.action":
/*!***************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Products/NavToProducts_Edit.action ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/Products/Products_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Products/Products_DeleteEntity.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Products/Products_DeleteEntity.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Products","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDK_ErrorArchive/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Products/Products_DetailPopover.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Products/Products_DetailPopover.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Open Document","OnPress":"/MDK_ErrorArchive/Actions/Products/Products_OpenDocument.action"},{"Title":"Delete","OnPress":"/MDK_ErrorArchive/Rules/Products/Products_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Products/Products_OpenDocument.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Products/Products_OpenDocument.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OpenDocument","Path":"/MDK_ErrorArchive/Services/SampleServiceV2.service/{@odata.readLink}/$value","MimeType":"image/jpeg"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Products/Products_UpdateEntity.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Products/Products_UpdateEntity.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Products","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductId":"#Control:ProductId/#SelectedValue","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDK_ErrorArchive/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action":
/*!**********************************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action ***!
  \**********************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action":
/*!*****************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action ***!
  \*****************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action":
/*!***************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action ***!
  \***************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","NetAmount":"#Control:NetAmount/#Value","PurchaseOrderId":"#Control:PurchaseOrderId/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action":
/*!*****************************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action ***!
  \*****************************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"Items","Target":{"EntitySet":"PurchaseOrderHeaders","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","PurchaseOrderId":"#Control:PurchaseOrderId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDK_ErrorArchive/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action":
/*!*******************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action ***!
  \*******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add PurchaseOrderItem","OnPress":"/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action"},{"Title":"Delete","OnPress":"/MDK_ErrorArchive/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action":
/*!******************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action ***!
  \******************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","NetAmount":"#Control:NetAmount/#Value","PurchaseOrderId":"#Control:PurchaseOrderId/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDK_ErrorArchive/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action":
/*!*************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action ***!
  \*************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action":
/*!***********************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action ***!
  \***********************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","PurchaseOrderId":"#Control:PurchaseOrderId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDK_ErrorArchive/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"PurchaseOrderItems","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","ItemNumber":"#Control:ItemNumber/#Value","NetAmount":"#Control:NetAmount/#Value","ProductId":"#Control:ProductId/#SelectedValue","PurchaseOrderId":"#Control:PurchaseOrderId/#SelectedValue","Quantity":"#Control:Quantity/#Value","QuantityUnit":"#Control:QuantityUnit/#Value","TaxAmount":"#Control:TaxAmount/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDK_ErrorArchive/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/CloseOffline.action":
/*!********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/CloseOffline.action ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.OfflineOData.Close","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","Force":true,"ActionResult":{"_Name":"close"},"OnSuccess":"/MDK_ErrorArchive/Actions/Service/CloseOfflineSuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/Service/CloseOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/CloseOfflineFailureMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/CloseOfflineFailureMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failure closing data service - {#ActionResults:close/error}","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/CloseOfflineSuccessMessage.action":
/*!**********************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/CloseOfflineSuccessMessage.action ***!
  \**********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Data service closed successfully","NumberOfLines":1,"Duration":3,"Animated":true,"IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/DownloadOffline.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/DownloadOffline.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Suppliers","Query":"Suppliers"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"}],"_Type":"Action.Type.OfflineOData.Download","ActionResult":{"_Name":"sync"},"OnFailure":"/MDK_ErrorArchive/Actions/Service/SyncFailureMessage.action","OnSuccess":"/MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/DownloadStartedMessage.action":
/*!******************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/DownloadStartedMessage.action ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Download in progress...","CompletionMessage":"Download Successful","CompletionTimeout":7,"OnSuccess":"/MDK_ErrorArchive/Actions/Service/DownloadOffline.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/InitializeOffline.action":
/*!*************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/InitializeOffline.action ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","DefiningRequests":[{"Name":"Suppliers","Query":"Suppliers"},{"Name":"PurchaseOrderHeaders","Query":"PurchaseOrderHeaders"},{"Name":"PurchaseOrderItems","Query":"PurchaseOrderItems"}],"_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"ActivityIndicatorText":"Downloading...","ActionResult":{"_Name":"init"},"OnSuccess":"/MDK_ErrorArchive/Actions/Service/InitializeOfflineSuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/Service/InitializeOfflineFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/InitializeOfflineFailureMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/InitializeOfflineFailureMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/InitializeOfflineSuccessMessage.action":
/*!***************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/InitializeOfflineSuccessMessage.action ***!
  \***************************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/SyncFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/SyncFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Sync offline data service failure - {#ActionResults:sync/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/SyncStartedMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/SyncStartedMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Upload in progress...","CompletionMessage":"Sync completed","CompletionTimeout":7,"OnSuccess":"/MDK_ErrorArchive/Actions/Service/UploadOffline.action","OnFailure":"/MDK_ErrorArchive/Actions/Service/SyncFailureMessage.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/SyncSuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/SyncSuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Sync offline data service complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Service/UploadOffline.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Service/UploadOffline.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","_Type":"Action.Type.OfflineOData.Upload","ActionResult":{"_Name":"sync"},"OnSuccess":"/MDK_ErrorArchive/Actions/Service/DownloadStartedMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/Service/SyncFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Create.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Create.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Create.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreateProduct.action":
/*!**************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreateProduct.action ***!
  \**************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreateProduct.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreatePurchaseOrderHeader.action":
/*!**************************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreatePurchaseOrderHeader.action ***!
  \**************************************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreatePurchaseOrderHeader.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Detail.action":
/*!*******************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Detail.action ***!
  \*******************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Detail.page"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Edit.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Edit.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"ModalPageFullscreen":false,"ModalPage":true,"PageToOpen":"/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Edit.page","_Type":"Action.Type.Navigation"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_List.action":
/*!*****************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_List.action ***!
  \*****************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/MDK_ErrorArchive/Pages/Suppliers/Suppliers_List.page"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"CreateLinks":[],"OnFailure":"/MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action","Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","EmailAddress":"#Control:EmailAddress/#Value","HouseNumber":"#Control:HouseNumber/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value","SupplierId":"#Control:SupplierId/#Value","SupplierName":"#Control:SupplierName/#Value","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value"},"Target":{"EntitySet":"Suppliers","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateEntity"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateProduct.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateProduct.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"Products","Target":{"EntitySet":"Suppliers","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action","Properties":{"Category":"#Control:Category/#Value","CategoryName":"#Control:CategoryName/#Value","CurrencyCode":"#Control:CurrencyCode/#Value","DimensionDepth":"#Control:DimensionDepth/#Value","DimensionHeight":"#Control:DimensionHeight/#Value","DimensionUnit":"#Control:DimensionUnit/#Value","DimensionWidth":"#Control:DimensionWidth/#Value","LongDescription":"#Control:LongDescription/#Value","Name":"#Control:Name/#Value","PictureUrl":"#Control:PictureUrl/#Value","Price":"#Control:Price/#Value","ProductId":"#Control:ProductId/#SelectedValue","QuantityUnit":"#Control:QuantityUnit/#Value","ShortDescription":"#Control:ShortDescription/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value","Weight":"#Control:Weight/#Value","WeightUnit":"#Control:WeightUnit/#Value"},"Media":"#Control:Attachment/#Value","Target":{"EntitySet":"Products","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedMedia"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreatePurchaseOrderHeader.action":
/*!*********************************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreatePurchaseOrderHeader.action ***!
  \*********************************************************************************************************/
/***/ ((module) => {

module.exports = {"ParentLink":{"Property":"PurchaseOrders","Target":{"EntitySet":"Suppliers","ReadLink":"{@odata.readLink}"}},"OnFailure":"/MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action","OnSuccess":"/MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action","Properties":{"CurrencyCode":"#Control:CurrencyCode/#Value","GrossAmount":"#Control:GrossAmount/#Value","NetAmount":"#Control:NetAmount/#Value","PurchaseOrderId":"#Control:PurchaseOrderId/#Value","SupplierId":"#Control:SupplierId/#SelectedValue","TaxAmount":"#Control:TaxAmount/#Value"},"Target":{"EntitySet":"PurchaseOrderHeaders","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service"},"ActionResult":{"_Name":"create"},"_Type":"Action.Type.ODataService.CreateRelatedEntity"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_DeleteEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_DeleteEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"Target":{"EntitySet":"Suppliers","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"OnSuccess":"/MDK_ErrorArchive/Actions/DeleteEntitySuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/DeleteEntityFailureMessage.action","ActionResult":{"_Name":"delete"},"_Type":"Action.Type.ODataService.DeleteEntity"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_DetailPopover.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_DetailPopover.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"PopoverItems":[{"Title":"Add Product","OnPress":"/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreateProduct.action"},{"Title":"Add PurchaseOrderHeader","OnPress":"/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreatePurchaseOrderHeader.action"},{"Title":"Delete","OnPress":"/MDK_ErrorArchive/Rules/Suppliers/Suppliers_DeleteConfirmation.js"}],"_Type":"Action.Type.PopoverMenu"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_UpdateEntity.action":
/*!********************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_UpdateEntity.action ***!
  \********************************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","Target":{"EntitySet":"Suppliers","Service":"/MDK_ErrorArchive/Services/SampleServiceV2.service","ReadLink":"{@odata.readLink}"},"Properties":{"City":"#Control:City/#Value","Country":"#Control:Country/#Value","EmailAddress":"#Control:EmailAddress/#Value","HouseNumber":"#Control:HouseNumber/#Value","PhoneNumber":"#Control:PhoneNumber/#Value","PostalCode":"#Control:PostalCode/#Value","Street":"#Control:Street/#Value","SupplierId":"#Control:SupplierId/#Value","SupplierName":"#Control:SupplierName/#Value","UpdatedTimestamp":"#Control:UpdatedTimestamp/#Value"},"UpdateLinks":[],"ActionResult":{"_Name":"update"},"OnSuccess":"/MDK_ErrorArchive/Actions/UpdateEntitySuccessMessage.action","OnFailure":"/MDK_ErrorArchive/Actions/UpdateEntityFailureMessage.action"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/UpdateEntityFailureMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/UpdateEntityFailureMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Update entity failure - {#ActionResults:update/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Actions/UpdateEntitySuccessMessage.action":
/*!**************************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Actions/UpdateEntitySuccessMessage.action ***!
  \**************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Entity updated","Icon":"","IsIconHidden":false,"NumberOfLines":2,"OnSuccess":"/MDK_ErrorArchive/Actions/CloseModalPage_Complete.action","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Globals/AppDefinition_Version.global":
/*!*********************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Globals/AppDefinition_Version.global ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Services/SampleServiceV2.service":
/*!*****************************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Services/SampleServiceV2.service ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"SampleServiceV2","OfflineEnabled":true,"LanguageURLParam":"","OnlineOptions":{},"PathSuffix":"","SourceType":"Mobile","ServiceUrl":""}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

module.exports = "1.1\n"

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/Styles/Styles.light.json":
/*!*********************************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/Styles/Styles.light.json ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/MDK_ErrorArchive/jsconfig.json":
/*!**********************************************************!*\
  !*** ./build.definitions/MDK_ErrorArchive/jsconfig.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let mdk_errorarchive_actions_appupdate_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/AppUpdate.action */ "./build.definitions/MDK_ErrorArchive/Actions/AppUpdate.action")
let mdk_errorarchive_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/AppUpdateFailureMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/AppUpdateFailureMessage.action")
let mdk_errorarchive_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/AppUpdateProgressBanner.action */ "./build.definitions/MDK_ErrorArchive/Actions/AppUpdateProgressBanner.action")
let mdk_errorarchive_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/AppUpdateSuccessMessage.action")
let mdk_errorarchive_actions_closemodalpage_cancel_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action */ "./build.definitions/MDK_ErrorArchive/Actions/CloseModalPage_Cancel.action")
let mdk_errorarchive_actions_closemodalpage_complete_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/CloseModalPage_Complete.action */ "./build.definitions/MDK_ErrorArchive/Actions/CloseModalPage_Complete.action")
let mdk_errorarchive_actions_closepage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/ClosePage.action */ "./build.definitions/MDK_ErrorArchive/Actions/ClosePage.action")
let mdk_errorarchive_actions_createentityfailuremessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/CreateEntityFailureMessage.action")
let mdk_errorarchive_actions_createentitysuccessmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/CreateEntitySuccessMessage.action")
let mdk_errorarchive_actions_deleteconfirmation_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/DeleteConfirmation.action */ "./build.definitions/MDK_ErrorArchive/Actions/DeleteConfirmation.action")
let mdk_errorarchive_actions_deleteentityfailuremessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/DeleteEntityFailureMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/DeleteEntityFailureMessage.action")
let mdk_errorarchive_actions_deleteentitysuccessmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/DeleteEntitySuccessMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/DeleteEntitySuccessMessage.action")
let mdk_errorarchive_actions_errorarchive_errorarchive_syncfailure_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_SyncFailure.action */ "./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_SyncFailure.action")
let mdk_errorarchive_actions_errorarchive_errorarchive_unknownaffectedentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/ErrorArchive_UnknownAffectedEntity.action")
let mdk_errorarchive_actions_errorarchive_navtoerrorarchive_detail_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_Detail.action */ "./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_Detail.action")
let mdk_errorarchive_actions_errorarchive_navtoerrorarchive_list_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_List.action */ "./build.definitions/MDK_ErrorArchive/Actions/ErrorArchive/NavToErrorArchive_List.action")
let mdk_errorarchive_actions_logout_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Logout.action */ "./build.definitions/MDK_ErrorArchive/Actions/Logout.action")
let mdk_errorarchive_actions_logoutmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/LogoutMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/LogoutMessage.action")
let mdk_errorarchive_actions_onwillupdate_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/OnWillUpdate.action */ "./build.definitions/MDK_ErrorArchive/Actions/OnWillUpdate.action")
let mdk_errorarchive_actions_products_navtoproducts_detail_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Products/NavToProducts_Detail.action */ "./build.definitions/MDK_ErrorArchive/Actions/Products/NavToProducts_Detail.action")
let mdk_errorarchive_actions_products_navtoproducts_edit_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Products/NavToProducts_Edit.action */ "./build.definitions/MDK_ErrorArchive/Actions/Products/NavToProducts_Edit.action")
let mdk_errorarchive_actions_products_products_deleteentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Products/Products_DeleteEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/Products/Products_DeleteEntity.action")
let mdk_errorarchive_actions_products_products_detailpopover_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Products/Products_DetailPopover.action */ "./build.definitions/MDK_ErrorArchive/Actions/Products/Products_DetailPopover.action")
let mdk_errorarchive_actions_products_products_opendocument_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Products/Products_OpenDocument.action */ "./build.definitions/MDK_ErrorArchive/Actions/Products/Products_OpenDocument.action")
let mdk_errorarchive_actions_products_products_updateentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Products/Products_UpdateEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/Products/Products_UpdateEntity.action")
let mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_create_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Create.action")
let mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_createpurchaseorderitem_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_CreatePurchaseOrderItem.action")
let mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Detail.action")
let mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_edit_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_Edit.action")
let mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/NavToPurchaseOrderHeaders_List.action")
let mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_createentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreateEntity.action")
let mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.action")
let mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_deleteentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteEntity.action")
let mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_detailpopover_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_DetailPopover.action")
let mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_updateentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderHeaders/PurchaseOrderHeaders_UpdateEntity.action")
let mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_create_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Create.action")
let mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_detail_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Detail.action")
let mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_edit_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_Edit.action")
let mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_list_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/NavToPurchaseOrderItems_List.action")
let mdk_errorarchive_actions_purchaseorderitems_purchaseorderitems_createentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_CreateEntity.action")
let mdk_errorarchive_actions_purchaseorderitems_purchaseorderitems_deleteentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_DeleteEntity.action")
let mdk_errorarchive_actions_purchaseorderitems_purchaseorderitems_updateentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/PurchaseOrderItems/PurchaseOrderItems_UpdateEntity.action")
let mdk_errorarchive_actions_service_closeoffline_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/CloseOffline.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/CloseOffline.action")
let mdk_errorarchive_actions_service_closeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/CloseOfflineFailureMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/CloseOfflineFailureMessage.action")
let mdk_errorarchive_actions_service_closeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/CloseOfflineSuccessMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/CloseOfflineSuccessMessage.action")
let mdk_errorarchive_actions_service_downloadoffline_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/DownloadOffline.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/DownloadOffline.action")
let mdk_errorarchive_actions_service_downloadstartedmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/DownloadStartedMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/DownloadStartedMessage.action")
let mdk_errorarchive_actions_service_initializeoffline_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/InitializeOffline.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/InitializeOffline.action")
let mdk_errorarchive_actions_service_initializeofflinefailuremessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/InitializeOfflineFailureMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/InitializeOfflineFailureMessage.action")
let mdk_errorarchive_actions_service_initializeofflinesuccessmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/InitializeOfflineSuccessMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/InitializeOfflineSuccessMessage.action")
let mdk_errorarchive_actions_service_syncfailuremessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/SyncFailureMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/SyncFailureMessage.action")
let mdk_errorarchive_actions_service_syncstartedmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/SyncStartedMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/SyncStartedMessage.action")
let mdk_errorarchive_actions_service_syncsuccessmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/SyncSuccessMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/SyncSuccessMessage.action")
let mdk_errorarchive_actions_service_uploadoffline_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Service/UploadOffline.action */ "./build.definitions/MDK_ErrorArchive/Actions/Service/UploadOffline.action")
let mdk_errorarchive_actions_suppliers_navtosuppliers_create_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Create.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Create.action")
let mdk_errorarchive_actions_suppliers_navtosuppliers_createproduct_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreateProduct.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreateProduct.action")
let mdk_errorarchive_actions_suppliers_navtosuppliers_createpurchaseorderheader_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreatePurchaseOrderHeader.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_CreatePurchaseOrderHeader.action")
let mdk_errorarchive_actions_suppliers_navtosuppliers_detail_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Detail.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Detail.action")
let mdk_errorarchive_actions_suppliers_navtosuppliers_edit_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Edit.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_Edit.action")
let mdk_errorarchive_actions_suppliers_navtosuppliers_list_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_List.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/NavToSuppliers_List.action")
let mdk_errorarchive_actions_suppliers_suppliers_createentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateEntity.action")
let mdk_errorarchive_actions_suppliers_suppliers_createproduct_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateProduct.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreateProduct.action")
let mdk_errorarchive_actions_suppliers_suppliers_createpurchaseorderheader_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreatePurchaseOrderHeader.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_CreatePurchaseOrderHeader.action")
let mdk_errorarchive_actions_suppliers_suppliers_deleteentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/Suppliers_DeleteEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_DeleteEntity.action")
let mdk_errorarchive_actions_suppliers_suppliers_detailpopover_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/Suppliers_DetailPopover.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_DetailPopover.action")
let mdk_errorarchive_actions_suppliers_suppliers_updateentity_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/Suppliers/Suppliers_UpdateEntity.action */ "./build.definitions/MDK_ErrorArchive/Actions/Suppliers/Suppliers_UpdateEntity.action")
let mdk_errorarchive_actions_updateentityfailuremessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/UpdateEntityFailureMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/UpdateEntityFailureMessage.action")
let mdk_errorarchive_actions_updateentitysuccessmessage_action = __webpack_require__(/*! ./MDK_ErrorArchive/Actions/UpdateEntitySuccessMessage.action */ "./build.definitions/MDK_ErrorArchive/Actions/UpdateEntitySuccessMessage.action")
let mdk_errorarchive_globals_appdefinition_version_global = __webpack_require__(/*! ./MDK_ErrorArchive/Globals/AppDefinition_Version.global */ "./build.definitions/MDK_ErrorArchive/Globals/AppDefinition_Version.global")
let mdk_errorarchive_i18n_i18n_properties = __webpack_require__(/*! ./MDK_ErrorArchive/i18n/i18n.properties */ "./build.definitions/MDK_ErrorArchive/i18n/i18n.properties")
let mdk_errorarchive_jsconfig_json = __webpack_require__(/*! ./MDK_ErrorArchive/jsconfig.json */ "./build.definitions/MDK_ErrorArchive/jsconfig.json")
let mdk_errorarchive_pages_errorarchive_errorarchive_detail_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_Detail.page */ "./build.definitions/MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_Detail.page")
let mdk_errorarchive_pages_errorarchive_errorarchive_list_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_List.page */ "./build.definitions/MDK_ErrorArchive/Pages/ErrorArchive/ErrorArchive_List.page")
let mdk_errorarchive_pages_main_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/Main.page */ "./build.definitions/MDK_ErrorArchive/Pages/Main.page")
let mdk_errorarchive_pages_products_products_detail_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/Products/Products_Detail.page */ "./build.definitions/MDK_ErrorArchive/Pages/Products/Products_Detail.page")
let mdk_errorarchive_pages_products_products_edit_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/Products/Products_Edit.page */ "./build.definitions/MDK_ErrorArchive/Pages/Products/Products_Edit.page")
let mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_create_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page */ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Create.page")
let mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page */ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_CreatePurchaseOrderItem.page")
let mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_detail_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page */ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Detail.page")
let mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_edit_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page */ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_Edit.page")
let mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_list_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page */ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderHeaders/PurchaseOrderHeaders_List.page")
let mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_create_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page */ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Create.page")
let mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_detail_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page */ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Detail.page")
let mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_edit_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page */ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_Edit.page")
let mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_list_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page */ "./build.definitions/MDK_ErrorArchive/Pages/PurchaseOrderItems/PurchaseOrderItems_List.page")
let mdk_errorarchive_pages_suppliers_suppliers_create_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/Suppliers/Suppliers_Create.page */ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Create.page")
let mdk_errorarchive_pages_suppliers_suppliers_createproduct_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreateProduct.page */ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreateProduct.page")
let mdk_errorarchive_pages_suppliers_suppliers_createpurchaseorderheader_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreatePurchaseOrderHeader.page */ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_CreatePurchaseOrderHeader.page")
let mdk_errorarchive_pages_suppliers_suppliers_detail_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/Suppliers/Suppliers_Detail.page */ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Detail.page")
let mdk_errorarchive_pages_suppliers_suppliers_edit_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/Suppliers/Suppliers_Edit.page */ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_Edit.page")
let mdk_errorarchive_pages_suppliers_suppliers_list_page = __webpack_require__(/*! ./MDK_ErrorArchive/Pages/Suppliers/Suppliers_List.page */ "./build.definitions/MDK_ErrorArchive/Pages/Suppliers/Suppliers_List.page")
let mdk_errorarchive_rules_appupdatefailure_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/AppUpdateFailure.js */ "./build.definitions/MDK_ErrorArchive/Rules/AppUpdateFailure.js")
let mdk_errorarchive_rules_appupdatesuccess_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/AppUpdateSuccess.js */ "./build.definitions/MDK_ErrorArchive/Rules/AppUpdateSuccess.js")
let mdk_errorarchive_rules_errorarchive_errorarchive_checkforsyncerror_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js */ "./build.definitions/MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_CheckForSyncError.js")
let mdk_errorarchive_rules_errorarchive_errorarchive_decidewhicheditpage_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js */ "./build.definitions/MDK_ErrorArchive/Rules/ErrorArchive/ErrorArchive_DecideWhichEditPage.js")
let mdk_errorarchive_rules_onwillupdate_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/OnWillUpdate.js */ "./build.definitions/MDK_ErrorArchive/Rules/OnWillUpdate.js")
let mdk_errorarchive_rules_products_products_deleteconfirmation_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/Products/Products_DeleteConfirmation.js */ "./build.definitions/MDK_ErrorArchive/Rules/Products/Products_DeleteConfirmation.js")
let mdk_errorarchive_rules_purchaseorderheaders_purchaseorderheaders_deleteconfirmation_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js */ "./build.definitions/MDK_ErrorArchive/Rules/PurchaseOrderHeaders/PurchaseOrderHeaders_DeleteConfirmation.js")
let mdk_errorarchive_rules_purchaseorderitems_purchaseorderitems_deleteconfirmation_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js */ "./build.definitions/MDK_ErrorArchive/Rules/PurchaseOrderItems/PurchaseOrderItems_DeleteConfirmation.js")
let mdk_errorarchive_rules_resetappsettingsandlogout_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/ResetAppSettingsAndLogout.js */ "./build.definitions/MDK_ErrorArchive/Rules/ResetAppSettingsAndLogout.js")
let mdk_errorarchive_rules_suppliers_suppliers_deleteconfirmation_js = __webpack_require__(/*! ./MDK_ErrorArchive/Rules/Suppliers/Suppliers_DeleteConfirmation.js */ "./build.definitions/MDK_ErrorArchive/Rules/Suppliers/Suppliers_DeleteConfirmation.js")
let mdk_errorarchive_services_sampleservicev2_service = __webpack_require__(/*! ./MDK_ErrorArchive/Services/SampleServiceV2.service */ "./build.definitions/MDK_ErrorArchive/Services/SampleServiceV2.service")
let mdk_errorarchive_styles_styles_css = __webpack_require__(/*! ./MDK_ErrorArchive/Styles/Styles.css */ "./build.definitions/MDK_ErrorArchive/Styles/Styles.css")
let mdk_errorarchive_styles_styles_less = __webpack_require__(/*! ./MDK_ErrorArchive/Styles/Styles.less */ "./build.definitions/MDK_ErrorArchive/Styles/Styles.less")
let mdk_errorarchive_styles_styles_light_css = __webpack_require__(/*! ./MDK_ErrorArchive/Styles/Styles.light.css */ "./build.definitions/MDK_ErrorArchive/Styles/Styles.light.css")
let mdk_errorarchive_styles_styles_light_json = __webpack_require__(/*! ./MDK_ErrorArchive/Styles/Styles.light.json */ "./build.definitions/MDK_ErrorArchive/Styles/Styles.light.json")
let mdk_errorarchive_styles_styles_light_nss = __webpack_require__(/*! ./MDK_ErrorArchive/Styles/Styles.light.nss */ "./build.definitions/MDK_ErrorArchive/Styles/Styles.light.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	mdk_errorarchive_actions_appupdate_action : mdk_errorarchive_actions_appupdate_action,
	mdk_errorarchive_actions_appupdatefailuremessage_action : mdk_errorarchive_actions_appupdatefailuremessage_action,
	mdk_errorarchive_actions_appupdateprogressbanner_action : mdk_errorarchive_actions_appupdateprogressbanner_action,
	mdk_errorarchive_actions_appupdatesuccessmessage_action : mdk_errorarchive_actions_appupdatesuccessmessage_action,
	mdk_errorarchive_actions_closemodalpage_cancel_action : mdk_errorarchive_actions_closemodalpage_cancel_action,
	mdk_errorarchive_actions_closemodalpage_complete_action : mdk_errorarchive_actions_closemodalpage_complete_action,
	mdk_errorarchive_actions_closepage_action : mdk_errorarchive_actions_closepage_action,
	mdk_errorarchive_actions_createentityfailuremessage_action : mdk_errorarchive_actions_createentityfailuremessage_action,
	mdk_errorarchive_actions_createentitysuccessmessage_action : mdk_errorarchive_actions_createentitysuccessmessage_action,
	mdk_errorarchive_actions_deleteconfirmation_action : mdk_errorarchive_actions_deleteconfirmation_action,
	mdk_errorarchive_actions_deleteentityfailuremessage_action : mdk_errorarchive_actions_deleteentityfailuremessage_action,
	mdk_errorarchive_actions_deleteentitysuccessmessage_action : mdk_errorarchive_actions_deleteentitysuccessmessage_action,
	mdk_errorarchive_actions_errorarchive_errorarchive_syncfailure_action : mdk_errorarchive_actions_errorarchive_errorarchive_syncfailure_action,
	mdk_errorarchive_actions_errorarchive_errorarchive_unknownaffectedentity_action : mdk_errorarchive_actions_errorarchive_errorarchive_unknownaffectedentity_action,
	mdk_errorarchive_actions_errorarchive_navtoerrorarchive_detail_action : mdk_errorarchive_actions_errorarchive_navtoerrorarchive_detail_action,
	mdk_errorarchive_actions_errorarchive_navtoerrorarchive_list_action : mdk_errorarchive_actions_errorarchive_navtoerrorarchive_list_action,
	mdk_errorarchive_actions_logout_action : mdk_errorarchive_actions_logout_action,
	mdk_errorarchive_actions_logoutmessage_action : mdk_errorarchive_actions_logoutmessage_action,
	mdk_errorarchive_actions_onwillupdate_action : mdk_errorarchive_actions_onwillupdate_action,
	mdk_errorarchive_actions_products_navtoproducts_detail_action : mdk_errorarchive_actions_products_navtoproducts_detail_action,
	mdk_errorarchive_actions_products_navtoproducts_edit_action : mdk_errorarchive_actions_products_navtoproducts_edit_action,
	mdk_errorarchive_actions_products_products_deleteentity_action : mdk_errorarchive_actions_products_products_deleteentity_action,
	mdk_errorarchive_actions_products_products_detailpopover_action : mdk_errorarchive_actions_products_products_detailpopover_action,
	mdk_errorarchive_actions_products_products_opendocument_action : mdk_errorarchive_actions_products_products_opendocument_action,
	mdk_errorarchive_actions_products_products_updateentity_action : mdk_errorarchive_actions_products_products_updateentity_action,
	mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_create_action : mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_create_action,
	mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_createpurchaseorderitem_action : mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_createpurchaseorderitem_action,
	mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action : mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_detail_action,
	mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_edit_action : mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_edit_action,
	mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action : mdk_errorarchive_actions_purchaseorderheaders_navtopurchaseorderheaders_list_action,
	mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_createentity_action : mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_createentity_action,
	mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_action : mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_action,
	mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_deleteentity_action : mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_deleteentity_action,
	mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_detailpopover_action : mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_detailpopover_action,
	mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_updateentity_action : mdk_errorarchive_actions_purchaseorderheaders_purchaseorderheaders_updateentity_action,
	mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_create_action : mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_create_action,
	mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_detail_action : mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_detail_action,
	mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_edit_action : mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_edit_action,
	mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_list_action : mdk_errorarchive_actions_purchaseorderitems_navtopurchaseorderitems_list_action,
	mdk_errorarchive_actions_purchaseorderitems_purchaseorderitems_createentity_action : mdk_errorarchive_actions_purchaseorderitems_purchaseorderitems_createentity_action,
	mdk_errorarchive_actions_purchaseorderitems_purchaseorderitems_deleteentity_action : mdk_errorarchive_actions_purchaseorderitems_purchaseorderitems_deleteentity_action,
	mdk_errorarchive_actions_purchaseorderitems_purchaseorderitems_updateentity_action : mdk_errorarchive_actions_purchaseorderitems_purchaseorderitems_updateentity_action,
	mdk_errorarchive_actions_service_closeoffline_action : mdk_errorarchive_actions_service_closeoffline_action,
	mdk_errorarchive_actions_service_closeofflinefailuremessage_action : mdk_errorarchive_actions_service_closeofflinefailuremessage_action,
	mdk_errorarchive_actions_service_closeofflinesuccessmessage_action : mdk_errorarchive_actions_service_closeofflinesuccessmessage_action,
	mdk_errorarchive_actions_service_downloadoffline_action : mdk_errorarchive_actions_service_downloadoffline_action,
	mdk_errorarchive_actions_service_downloadstartedmessage_action : mdk_errorarchive_actions_service_downloadstartedmessage_action,
	mdk_errorarchive_actions_service_initializeoffline_action : mdk_errorarchive_actions_service_initializeoffline_action,
	mdk_errorarchive_actions_service_initializeofflinefailuremessage_action : mdk_errorarchive_actions_service_initializeofflinefailuremessage_action,
	mdk_errorarchive_actions_service_initializeofflinesuccessmessage_action : mdk_errorarchive_actions_service_initializeofflinesuccessmessage_action,
	mdk_errorarchive_actions_service_syncfailuremessage_action : mdk_errorarchive_actions_service_syncfailuremessage_action,
	mdk_errorarchive_actions_service_syncstartedmessage_action : mdk_errorarchive_actions_service_syncstartedmessage_action,
	mdk_errorarchive_actions_service_syncsuccessmessage_action : mdk_errorarchive_actions_service_syncsuccessmessage_action,
	mdk_errorarchive_actions_service_uploadoffline_action : mdk_errorarchive_actions_service_uploadoffline_action,
	mdk_errorarchive_actions_suppliers_navtosuppliers_create_action : mdk_errorarchive_actions_suppliers_navtosuppliers_create_action,
	mdk_errorarchive_actions_suppliers_navtosuppliers_createproduct_action : mdk_errorarchive_actions_suppliers_navtosuppliers_createproduct_action,
	mdk_errorarchive_actions_suppliers_navtosuppliers_createpurchaseorderheader_action : mdk_errorarchive_actions_suppliers_navtosuppliers_createpurchaseorderheader_action,
	mdk_errorarchive_actions_suppliers_navtosuppliers_detail_action : mdk_errorarchive_actions_suppliers_navtosuppliers_detail_action,
	mdk_errorarchive_actions_suppliers_navtosuppliers_edit_action : mdk_errorarchive_actions_suppliers_navtosuppliers_edit_action,
	mdk_errorarchive_actions_suppliers_navtosuppliers_list_action : mdk_errorarchive_actions_suppliers_navtosuppliers_list_action,
	mdk_errorarchive_actions_suppliers_suppliers_createentity_action : mdk_errorarchive_actions_suppliers_suppliers_createentity_action,
	mdk_errorarchive_actions_suppliers_suppliers_createproduct_action : mdk_errorarchive_actions_suppliers_suppliers_createproduct_action,
	mdk_errorarchive_actions_suppliers_suppliers_createpurchaseorderheader_action : mdk_errorarchive_actions_suppliers_suppliers_createpurchaseorderheader_action,
	mdk_errorarchive_actions_suppliers_suppliers_deleteentity_action : mdk_errorarchive_actions_suppliers_suppliers_deleteentity_action,
	mdk_errorarchive_actions_suppliers_suppliers_detailpopover_action : mdk_errorarchive_actions_suppliers_suppliers_detailpopover_action,
	mdk_errorarchive_actions_suppliers_suppliers_updateentity_action : mdk_errorarchive_actions_suppliers_suppliers_updateentity_action,
	mdk_errorarchive_actions_updateentityfailuremessage_action : mdk_errorarchive_actions_updateentityfailuremessage_action,
	mdk_errorarchive_actions_updateentitysuccessmessage_action : mdk_errorarchive_actions_updateentitysuccessmessage_action,
	mdk_errorarchive_globals_appdefinition_version_global : mdk_errorarchive_globals_appdefinition_version_global,
	mdk_errorarchive_i18n_i18n_properties : mdk_errorarchive_i18n_i18n_properties,
	mdk_errorarchive_jsconfig_json : mdk_errorarchive_jsconfig_json,
	mdk_errorarchive_pages_errorarchive_errorarchive_detail_page : mdk_errorarchive_pages_errorarchive_errorarchive_detail_page,
	mdk_errorarchive_pages_errorarchive_errorarchive_list_page : mdk_errorarchive_pages_errorarchive_errorarchive_list_page,
	mdk_errorarchive_pages_main_page : mdk_errorarchive_pages_main_page,
	mdk_errorarchive_pages_products_products_detail_page : mdk_errorarchive_pages_products_products_detail_page,
	mdk_errorarchive_pages_products_products_edit_page : mdk_errorarchive_pages_products_products_edit_page,
	mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_create_page : mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_create_page,
	mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_page : mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_createpurchaseorderitem_page,
	mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_detail_page : mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_detail_page,
	mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_edit_page : mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_edit_page,
	mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_list_page : mdk_errorarchive_pages_purchaseorderheaders_purchaseorderheaders_list_page,
	mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_create_page : mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_create_page,
	mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_detail_page : mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_detail_page,
	mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_edit_page : mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_edit_page,
	mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_list_page : mdk_errorarchive_pages_purchaseorderitems_purchaseorderitems_list_page,
	mdk_errorarchive_pages_suppliers_suppliers_create_page : mdk_errorarchive_pages_suppliers_suppliers_create_page,
	mdk_errorarchive_pages_suppliers_suppliers_createproduct_page : mdk_errorarchive_pages_suppliers_suppliers_createproduct_page,
	mdk_errorarchive_pages_suppliers_suppliers_createpurchaseorderheader_page : mdk_errorarchive_pages_suppliers_suppliers_createpurchaseorderheader_page,
	mdk_errorarchive_pages_suppliers_suppliers_detail_page : mdk_errorarchive_pages_suppliers_suppliers_detail_page,
	mdk_errorarchive_pages_suppliers_suppliers_edit_page : mdk_errorarchive_pages_suppliers_suppliers_edit_page,
	mdk_errorarchive_pages_suppliers_suppliers_list_page : mdk_errorarchive_pages_suppliers_suppliers_list_page,
	mdk_errorarchive_rules_appupdatefailure_js : mdk_errorarchive_rules_appupdatefailure_js,
	mdk_errorarchive_rules_appupdatesuccess_js : mdk_errorarchive_rules_appupdatesuccess_js,
	mdk_errorarchive_rules_errorarchive_errorarchive_checkforsyncerror_js : mdk_errorarchive_rules_errorarchive_errorarchive_checkforsyncerror_js,
	mdk_errorarchive_rules_errorarchive_errorarchive_decidewhicheditpage_js : mdk_errorarchive_rules_errorarchive_errorarchive_decidewhicheditpage_js,
	mdk_errorarchive_rules_onwillupdate_js : mdk_errorarchive_rules_onwillupdate_js,
	mdk_errorarchive_rules_products_products_deleteconfirmation_js : mdk_errorarchive_rules_products_products_deleteconfirmation_js,
	mdk_errorarchive_rules_purchaseorderheaders_purchaseorderheaders_deleteconfirmation_js : mdk_errorarchive_rules_purchaseorderheaders_purchaseorderheaders_deleteconfirmation_js,
	mdk_errorarchive_rules_purchaseorderitems_purchaseorderitems_deleteconfirmation_js : mdk_errorarchive_rules_purchaseorderitems_purchaseorderitems_deleteconfirmation_js,
	mdk_errorarchive_rules_resetappsettingsandlogout_js : mdk_errorarchive_rules_resetappsettingsandlogout_js,
	mdk_errorarchive_rules_suppliers_suppliers_deleteconfirmation_js : mdk_errorarchive_rules_suppliers_suppliers_deleteconfirmation_js,
	mdk_errorarchive_services_sampleservicev2_service : mdk_errorarchive_services_sampleservicev2_service,
	mdk_errorarchive_styles_styles_css : mdk_errorarchive_styles_styles_css,
	mdk_errorarchive_styles_styles_less : mdk_errorarchive_styles_styles_less,
	mdk_errorarchive_styles_styles_light_css : mdk_errorarchive_styles_styles_light_css,
	mdk_errorarchive_styles_styles_light_json : mdk_errorarchive_styles_styles_light_json,
	mdk_errorarchive_styles_styles_light_nss : mdk_errorarchive_styles_styles_light_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=bundle.js.map