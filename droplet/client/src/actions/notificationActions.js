import axios from "axios";

export const sendToken = token => {
  axios
    .post("/api/notifications/register", token)
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
};
