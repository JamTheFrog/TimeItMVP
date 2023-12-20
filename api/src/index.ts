import express from "express";
import "express-async-errors";
import cors from "cors";
import mongoose from "mongoose";

//keys
import keys from "./config/keys";

//errors and middlewares
import { NotFoundError } from "./errors/not-found-error";
import { errorHandler } from "./middlewares/error-handler";
import { currentUser } from "./middlewares/current-user";

//auth related route imports
import { currentUserRouter } from "./routes/auth/current-user";
import { signupRouter } from "./routes/auth/signup";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";


//sessions related route imports
import { createSessionRouter } from "./routes/sessions/create-session";
import { createTimeBlockRouter } from "./routes/sessions/create-timeblock";
import { showOwnerSessionsRouter } from "./routes/sessions/show-owner-sessions";
import { showSessionsRouter } from "./routes/sessions/show-sessions";
import { showSessionRouter } from "./routes/sessions/show-session";
import { editTimeBlockRouter } from "./routes/sessions/update-timeblock";

const app = express();
app.set("trust proxy", true);
app.use(express.json());

const corsOptions = {
  origin: ["http://127.0.0.1:5173", "http://localhost"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.use(cors(corsOptions));
app.use(currentUser);

//auth related routes
app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

//sessions related routes
app.use(createSessionRouter);
app.use(createTimeBlockRouter);
app.use(editTimeBlockRouter);
app.use(showOwnerSessionsRouter);
app.use(showSessionsRouter);
app.use(showSessionRouter);

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
