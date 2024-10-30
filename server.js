const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3000;
const firebaseUrl = "https://visionboard-c0bc7-default-rtdb.firebaseio.com";

app.use(express.json());
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }));
app.options("*", cors());
app.post("/addNotification", (req, res) => {
  console.log("Received Notification Data:", req.body); // Log the incoming data
  axios
    .post(`${firebaseUrl}/notifications.json`, req.body)
    .then((response) =>
      res
        .status(200)
        .send({ id: response.data.name, message: "Notification added" })
    ) // Send back the generated ID
    .catch((error) => res.status(500).send(error));
});

app.get("/getNotifications", (req, res) => {
  axios
    .get(`${firebaseUrl}/notifications.json`)
    .then((response) => {
      console.log(response.data); // Log the response from Firebase
      res.status(200).json(response.data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

app.post("/addEmployee", (req, res) => {
  axios
    .post(`${firebaseUrl}/employees.json`, req.body)
    .then((response) => res.status(200).send("Employee added"))
    .catch((error) => res.status(500).send(error));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
app.patch("/markAsRead/:id", (req, res) => {
  const notificationId = req.params.id;
  axios
    .patch(`${firebaseUrl}/notifications/${notificationId}.json`, {
      read: true,
    })
    .then((response) => res.status(200).send("Notification marked as read"))
    .catch((error) => res.status(500).send(error));
});
