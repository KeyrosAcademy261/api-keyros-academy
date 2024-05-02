require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const videoRoutes = require("../routes/videoRoutes");
const userRoutes = require("../routes/userRoute");
const webinaireRoutes = require("../routes/webinaireRoutes");
const cors = require("cors");

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
});

//middleware of video
app.use("/api/videos", videoRoutes);

//middleware of user
app.use("/api/users", userRoutes);

//middleware of webinaire
app.use("/api/webinaires", webinaireRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(PORT, () => {
      console.log(`Serveur connecter sur le DB et écoute le port : ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });
