import React from "react";
import "../../css/SnackBar";

/**
 * function scalled to diplay a snackbar style notificatons
 * @param {*} message
 */
export const showSnackBar = message => {
  const snackbar = document.querySelector("#snackbar");

  snackbar.innerHTML = message;
  snackbar.className = "show";

  setTimeout(function() {
    snackbar.className = snackbar.className.replace("show", "");
  }, 3000);
};

/**
 * component should be imported into the main page so it could be used globaly
 */
export const SnackBar = () => {
  return <div id="snackbar"></div>;
};
