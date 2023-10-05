import axios from "axios";
    
async function getRandomUsers() {
  try {
    const data = await axios.get("/api/users/random_user?size=3");
    return data;
  } catch(err) {
    console.log("error: ", err);
  }
}

export default getRandomUsers;