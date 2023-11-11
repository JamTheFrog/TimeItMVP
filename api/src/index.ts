import express from "express";
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";

//keys
import keys from "./config/keys";

//errors
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";


//auth related route imports
import { currentUserRouter } from "./routes/auth/current-user";
import { signupRouter } from "./routes/auth/signup";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";

import { currentUser } from "./middlewares/current-user";


const app = express();
app.set("trust proxy", true);
app.use(express.json());



const corsOptions = {
  origin: [
    "http://127.0.0.1:5173",
    "http://localhost",
  ], 
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204, // No content response for preflight requests
  credentials: true,
};

app.use(cors(corsOptions));
app.use(currentUser);

//auth related routes
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.get("/health", (req, res) => res.status(200).send());
app.all("*", () => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI!);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error(error);
  }

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`Listening on port ${port}`));
};

start();