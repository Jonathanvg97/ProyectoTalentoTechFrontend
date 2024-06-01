export const toasterSuccessConfig = (message: string) => {
  return {
    type: 'success',
    text: message,
    icon: 'success',
    duration: 3000,
    position: 'top-right',
    progressBar: true,
    progressBarAnimation: 'increasing',
    showCloseButtonOnHover: true,
    preventDuplicates: true,
    preventOpenDuplicates: true,
    timeout: 3000,
    extenderTimeout: 3000,
    disableTimeOut: false,
  };
};

export const toasterErrorConfig = () => {
  return {
    type: 'error',
    icon: 'error',
    duration: 3000,
    position: 'top-right',
    progressBar: true,
    progressBarAnimation: 'increasing',
    showCloseButtonOnHover: true,
    preventDuplicates: true,
    preventOpenDuplicates: true,
    timeout: 3000,
    extenderTimeout: 3000,
    disableTimeOut: false,
  };
};
