const express = require("express");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const Song = require("../models/Song");

const router = express.Router();

const storage = multer.diskStorage({});
const upload = multer({ storage });

// UPLOAD SONG
router.post(
  "/upload",
  upload.fields([
    { name: "audio", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const audioUpload = await cloudinary.uploader.upload(
        req.files.audio[0].path,
        { resource_type: "video", folder: "frishta/audio" }
      );

      const imageUpload = await cloudinary.uploader.upload(
        req.files.thumbnail[0].path,
        { folder: "frishta/thumbnails" }
      );

      const song = await Song.create({
        title: req.body.title,
        artist: req.body.artist,
        audioUrl: audioUpload.secure_url,
        thumbnailUrl: imageUpload.secure_url,
      });

      res.json(song);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// FETCH ALL SONGS
router.get("/", async (req, res) => {
  const songs = await Song.find().sort({ createdAt: -1 });
  res.json(songs);
});

module.exports = router;
