import toastr from "toastr";

const initToast = () => {
  toastr.options = {
    positionClass: "toast-button-center-full-width",
    hideDuration: 300,
    timeOut: 2000
  };

  return toastr;
};

class makeTaost {
  error(message) {
    const toastr = initToast();
    toastr.clear();
    setTimeout(() => toastr.error(message), 300);
  }

  success(message) {
    const toastr = initToast();
    toastr.clear();
    setTimeout(() => toastr.success(message), 300);
  }

  info(message) {
    const toastr = initToast();
    toastr.clear();
    setTimeout(() => toastr.info(message), 300);
  }
}

/*const makeTaost = (messageType, message) => {
  toastr.options = {
    positionClass: "toast-button-center-full-width",
    hideDuration: 300,
    timeOut: 2000
  };
  toastr.clear();
  switch (messageType) {
    case "ERROR":
      setTimeout(() => toastr.error(message), 300);
      break;
    case "SUCCESSS":
      setTimeout(() => toastr.success(message), 300);
      break;
    case "iNFO":
      setTimeout(() => toastr.info(message), 300);
      break;
  }
};*/
export default new makeTaost();
