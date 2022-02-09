import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/Recipe-mongo";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const Userschema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex"),
  },
});

const User = mongoose.model("User", Userschema);

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 30,
    trim: true,
  },
  loves: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    // required: true,
    enum: ["Easy", "Amateur Chef", "Pro Chef"],
  },
  ingredients: {
    type: Array,
  },
  cuisine: {
    type: String,
    // required: true,
  },
  dishType: {
    type: String,
    enum: ["Breakfast", "Main_course", "Soup", "Snack", "Drink", "Desert", "Other"],
  },
  image: {
    imageName: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    // default: "https://images.media-allrecipes.com/images/75131.jpg",
  },
  duration: {
    type: Number,
    min: 0,
  },
  creator: {
    type: String,
    // unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ response: "Please, log  in", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
};

// Start defining your routes here
app.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw "password must be at least 5 characters long";
    }

    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
      email,
    }).save();

    res.status(201).json({
      response: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
        accessToken: newUser.accessToken,
        // profileImage: newUser.profileImage.imageUrl,
      },
      success: true,
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          userId: user._id,
          username: user.username,
          accessToken: user.accessToken,
        },
        success: true,
      });
    } else {
      res.status(404).json({ response: "Username or password doesn't match", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.get("/recipes", authenticateUser);
app.get("/recipes", async (req, res) => {
  const { sort, page, perPage, sortNum = Number(sort), pageNum = Number(page), perPageNum = Number(perPage) } = req.query;

  const recipes = await Recipe.find({})
    .sort({ creator: sortNum })
    .skip((pageNum - 1) * perPageNum)
    .limit(perPageNum);

  res.status(200).json({ response: recipes, success: true });
});

app.post("/recipes", async (req, res) => {
  const { title, description, level, ingredients, cuisine, dishType, duration, creator, createdAt } = req.body;

  try {
    const newRecipe = await new Recipe({ title, description, level, ingredients, cuisine, dishType, duration, creator, createdAt }).save();
    res.status(201).json({ response: newRecipe, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.post("/recipes/:id/loves", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, { $inc: { loves: 1 } }, { new: true });
    res.status(200).json({ response: updatedRecipe, success: true });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.delete("/recipes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.findOneAndDelete({ _id: id });
    if (deletedRecipe) {
      res.status(200).json({ response: deletedRecipe, success: true });
    } else {
      res.status(404).json({ response: "Recipe not found", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.patch("/recipes/:id", async (req, res) => {
  const { id } = req.params;
  const { creator } = req.body;

  try {
    const updatedRecipe = await Recipe.findOneAndUpdate({ _id: id }, { creator }, { new: true });
    if (updatedRecipe) {
      res.status(200).json({ response: updatedRecipe, success: true });
    } else {
      res.status(404).json({ response: "Recipe not found ", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: error, succes: false });
  }
});

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port} Aschwin Siaila`);
});
