//Not our code
//Author https://github.com/ankitkarna99/chat-cosey-front/blob/master/src/Toaster.js

import Swal from "sweetalert2";

// Create a Toast configuration by calling Swal.mixin which allows you to create pre-configured Swal instances.
const Toast = Swal.mixin({
  toast: true, // The notification should be in the form of a toast.
  position: 'top-end', // The toast will appear in the top right corner of the screen.
  showConfirmButton: false, // The toast will not show a confirm button.
  timer: 3000, // The toast will automatically close after 3000 milliseconds (3 seconds).
  timerProgressBar: true, // A progress bar will show the countdown until the toast closes.
  onOpen: (toast) => { // Define an onOpen function which will execute when the toast is opened.
    // Adds an event listener to stop the timer when the mouse enters the toast area.
    toast.addEventListener('mouseenter', Swal.stopTimer);
    // Adds an event listener to resume the timer when the mouse leaves the toast area.
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

// Define a function to create and display a toast notification using the pre-configured Toast instance.
const makeToast = (type, msg) => {
  Toast.fire({ // Trigger the toast notification.
    icon: type, // The icon type ('success', 'error', etc.) that will be shown in the toast.
    title: msg, // The message text that will be displayed in the toast.
  });
};

export default makeToast;
