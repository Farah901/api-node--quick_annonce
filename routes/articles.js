const express = require("express");
const axios = require("axios");
const FormData = require("form-data");
const multer = require("multer");
const dotenv = require("dotenv");
const Article = require("../models/Article");

dotenv.config();

const router = express.Router();

// 🔹 Multer for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 Upload image to Imgur
const uploadToImgur = async (imageBuffer) => {
    try {
        const formData = new FormData();
        formData.append("image", imageBuffer.toString("base64"));

        const response = await axios.post("https://api.imgur.com/3/image", formData, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
                ...formData.getHeaders(),
            },
        });

        return { url: response.data.data.link, deleteHash: response.data.data.deletehash };
    } catch (error) {
        console.error("❌ Imgur Upload Error:", error.response?.data || error.message);
        throw new Error("Failed to upload image to Imgur");
    }
};

// 🔹 Delete image from Imgur
const deleteFromImgur = async (deleteHash) => {
    try {
        await axios.delete(`https://api.imgur.com/3/image/${deleteHash}`, {
            headers: { Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}` },
        });
    } catch (error) {
        console.error("⚠️ Imgur Deletion Error:", error.response?.data || error.message);
    }
};

// 📌 1️⃣ Get all articles
router.get("/annonces", async (req, res) => {
    try {
        const articles = await Article.find();
        if (!articles.length) {
            return res.status(404).json({ message: "❌ No articles found!" });
        }
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 2️⃣ Filter articles
router.get("/annonces/filter", async (req, res) => {
    try {
        const { category, city } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (city) filter.city = city;

        const articles = await Article.find(filter);
        res.json({ articles });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 3️⃣ Add a new article
router.post("/annonces", upload.single("image"), async (req, res) => {
    try {
        const { title, description, category, price, city } = req.body;
        let imageUrl = null;
        let imageDeleteHash = null;

        if (req.file) {
            const imgurResponse = await uploadToImgur(req.file.buffer);
            imageUrl = imgurResponse.url;
            imageDeleteHash = imgurResponse.deleteHash;
        }

        const newArticle = new Article({ title, description, category, price, image: imageUrl, imageDeleteHash, city });
        await newArticle.save();
        res.status(201).json({ message: "✅ Article added successfully!", article: newArticle });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 4️⃣ Update an article
router.put("/annonces/:id", upload.single("image"), async (req, res) => {
    try {
        const { title, description, category, price, city } = req.body;
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ error: "❌ Article not found!" });
        }

        let newImageUrl = article.image;
        let newImageDeleteHash = article.imageDeleteHash;

        if (req.file) {
            if (article.imageDeleteHash) {
                await deleteFromImgur(article.imageDeleteHash);
            }
            const imgurResponse = await uploadToImgur(req.file.buffer);
            newImageUrl = imgurResponse.url;
            newImageDeleteHash = imgurResponse.deleteHash;
        }

        article.title = title || article.title;
        article.description = description || article.description;
        article.category = category || article.category;
        article.price = price || article.price;
        article.city = city || article.city;
        article.image = newImageUrl;
        article.imageDeleteHash = newImageDeleteHash;

        await article.save();
        res.json({ message: "✅ Article updated successfully!", article });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 5️⃣ Delete an article
router.delete("/annonces/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article) {
            return res.status(404).json({ error: "❌ Article not found!" });
        }

        if (article.imageDeleteHash) {
            await deleteFromImgur(article.imageDeleteHash);
        }

        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: "✅ Article deleted successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 📌 6️⃣ Get a single article by ID
router.get("/annonces/:id", async (req, res) => {
  try {
      const article = await Article.findById(req.params.id);
      if (!article) {
          return res.status(404).json({ error: "❌ Article not found!" });
      }
      res.json(article);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
