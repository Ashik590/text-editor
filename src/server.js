require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const upload = require("express-fileupload");
const Photo = require("./models/photo");
const crypto = require("crypto");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(upload());

app.get("/", async (req, res) => {
  const photos = await Photo.find();
  res.render("index", { photos });
});

app.post("/upload-image-editor", async (req, res) => {
  let file = req.files.file;
  let filename =
    crypto.randomBytes(16).toString("hex") + path.extname(file.name);
  let filePath = path.join(__dirname, "../public/upload/" + filename);
  file.mv(filePath, async (err) => {
    if (err) {
      console.log(err);
    } else {
      const photoObj = new Photo({
        src: filename,
      });
      const photo = await photoObj.save();
      console.log(photo);
      res.redirect("/");
    }
  });
});
app.post("/delete-image-editor", async (req, res) => {
  let photoId = req.body.value;
  console.log(photoId);

  const photo = await Photo.findByIdAndDelete(photoId);
  fs.unlink(path.join(__dirname, "../public/upload/" + photo.src), () => {
    console.log("Image deleted");
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
