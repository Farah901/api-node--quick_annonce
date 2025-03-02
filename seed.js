const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./db");
const Article = require("./models/Article");

dotenv.config();
connectDB();

const articles = [
  // Electronics & Technologies
  {
    title: 'Smart TV 55" for Sale',
    description: "A brand new 55-inch Smart TV, perfect for home entertainment.",
    category: "Electronics & Technologies",
    price: 650.0,
    image: "https://imgur.com/StyIkkg.jpg",
    city: "Casablanca",
  },
  {
    title: "Gaming Laptop for Sale",
    description: "High-end gaming laptop with powerful GPU and fast performance.",
    category: "Electronics & Technologies",
    price: 2200.0,
    image: "https://imgur.com/Zi7KU1A.jpg",
    city: "Rabat",
  },
  {
    title: "Wireless Headphones",
    description: "Noise-canceling wireless headphones with superior sound quality.",
    category: "Electronics & Technologies",
    price: 250.0,
    image: "https://imgur.com/5yl4JQf.jpg",
    city: "Marrakech",
  },
  {
    title: "Smartphone for Sale",
    description: "Latest model smartphone with advanced features and sleek design.",
    category: "Electronics & Technologies",
    price: 800.0,
    image: "https://imgur.com/XZcCQTG.jpg",
    city: "Casablanca",
  },
  {
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with high-quality sound and long battery life.",
    category: "Electronics & Technologies",
    price: 120.0,
    image: "https://imgur.com/UMBLMzr.jpg",
    city: "Rabat",
  },

  // Clothes
  {
    title: "Summer Dresses for Women",
    description: "A collection of stylish and comfortable summer dresses in various sizes.",
    category: "Clothes",
    price: 45.0,
    image: "https://imgur.com/uIGZBYE.jpg",
    city: "Fez",
  },
  {
    title: "Men's Leather Jacket",
    description: "A premium quality leather jacket for men, perfect for winter.",
    category: "Clothes",
    price: 180.0,
    image: "https://imgur.com/GVBcOi2.jpg",
    city: "Tangier",
  },
  {
    title: "Stylish Jeans for Men",
    description: "Fashionable jeans for men, available in different sizes and colors.",
    category: "Clothes",
    price: 60.0,
    image: "https://imgur.com/QA5nQhR.jpg",
    city: "Agadir",
  },
  {
    title: "Women's Handbag",
    description: "Elegant handbag for women, made from high-quality materials.",
    category: "Clothes",
    price: 75.0,
    image: "https://imgur.com/oFS3FOk.jpg",
    city: "Fez",
  },
  {
    title: "Men's Sneakers",
    description: "Comfortable and stylish sneakers for men, available in various sizes.",
    category: "Clothes",
    price: 90.0,
    image: "https://imgur.com/QQAclZ8.jpg",
    city: "Tangier",
  },

  // Vehicles
  {
    title: "2019 Toyota Corolla for Sale",
    description: "A well-maintained Toyota Corolla with low mileage and great features.",
    category: "Vehicles",
    price: 15000.0,
    image: "https://imgur.com/UNKvsPE.jpg",
    city: "Casablanca",
  },
  {
    title: "Yamaha R15 Motorbike for Sale",
    description: "A sporty Yamaha R15 motorbike in excellent condition, perfect for speed lovers.",
    category: "Vehicles",
    price: 3500.0,
    image: "https://imgur.com/PT7jMXM.jpg",
    city: "Marrakech",
  },
  {
    title: "Electric Scooter for Sale",
    description: "Eco-friendly electric scooter with long battery life, ideal for commuting.",
    category: "Vehicles",
    price: 600.0,
    image: "https://imgur.com/2ozltd5.jpg",
    city: "Rabat",
  },
  {
    title: "Honda Civic 2018 for Sale",
    description: "A reliable Honda Civic with excellent fuel efficiency and low mileage.",
    category: "Vehicles",
    price: 13000.0,
    image: "https://imgur.com/9z4eqMI.jpg",
    city: "Casablanca",
  },
  {
    title: "Mountain Bike for Sale",
    description: "Durable mountain bike, perfect for off-road adventures.",
    category: "Vehicles",
    price: 500.0,
    image: "https://imgur.com/bqtjQaL.jpg",
    city: "Marrakech",
  },

  // Jobs & Internship
  {
    title: "Full Stack Developer Internship",
    description: "Join our growing tech company as a Full Stack Developer intern and gain hands-on experience.",
    category: "Jobs & Internship",
    price: 15.0,
    image: "https://imgur.com/d7lEEr4.jpg",
    city: "Casablanca",
  },
  {
    title: "Graphic Designer Job",
    description: "We are looking for a creative graphic designer to join our team and work on exciting projects.",
    category: "Jobs & Internship",
    price: 20.0,
    image: "https://imgur.com/COWx7HK.jpg",
    city: "Rabat",
  },
  {
    title: "Sales Associate Position",
    description: "A well-known retail store is hiring a sales associate to help customers and manage the shop.",
    category: "Jobs & Internship",
    price: 12.0,
    image: "https://imgur.com/wsGlRXc.jpg",
    city: "Fez",
  },
  {
    title: "Marketing Intern",
    description: "Gain valuable experience in marketing by joining our dynamic team as an intern.",
    category: "Jobs & Internship",
    price: 10.0,
    image: "https://imgur.com/6n37WlI.jpg",
    city: "Casablanca",
  },
  {
    title: "Customer Service Representative",
    description: "We are hiring a customer service representative to assist our clients and handle inquiries.",
    category: "Jobs & Internship",
    price: 14.0,
    image: "https://imgur.com/Kgm69eb.jpg",
    city: "Rabat",
  },

  // Apartments
  {
    title: "Spacious Apartment for Rent",
    description: "A fully furnished 2-bedroom apartment in a prime location with a beautiful view.",
    category: "Apartments",
    price: 850.0,
    image: "https://imgur.com/SGoc3Q0.jpg",
    city: "Agadir",
  },
  {
    title: "Luxury Studio for Rent",
    description: "A luxury studio apartment with modern appliances and a rooftop view.",
    category: "Apartments",
    price: 1200.0,
    image: "https://imgur.com/fOmnCc3.jpg",
    city: "Tangier",
  },
  {
    title: "2-Bedroom Flat for Rent",
    description: "A charming 2-bedroom flat located near the beach, ideal for small families.",
    category: "Apartments",
    price: 700.0,
    image: "https://imgur.com/XW9lMhn.jpg",
    city: "Marrakech",
  },
  {
    title: "Cozy Studio for Rent",
    description: "A cozy studio apartment located in the city center, close to all amenities.",
    category: "Apartments",
    price: 600.0,
    image: "https://imgur.com/avPLyAD.jpg",
    city: "Agadir",
  },
].map((article) => ({
  ...article,
  created_at: new Date(), // Adds 'created_at' field
}));

const seedDB = async () => {
  try {
    await Article.deleteMany();
    await Article.insertMany(articles);
    console.log("✅ Database Seeded Successfully!");
  } catch (error) {
    console.error("❌ Seeding Failed:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();