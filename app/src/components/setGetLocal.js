function setLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    if (e instanceof DOMException) {
      // Check if the exception is quota exceeded error
      if (e === 22) {
        // Quota exceeded error (localStorage is full)
        console.error("Error: Local Storage quota exceeded.");
      } else {
        console.error("Error: Saving to local storage is not supported.");
      }
    } else {
      console.error("Error setting item in local storage", e);
    }
  }
}

function getLocalStorage(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null; // Handle non-existent key
  } catch (e) {
    console.error("Error getting item from local storage", e);
    return null; // Return null or default state if parsing error occurs
  }
}

export { setLocalStorage, getLocalStorage }
