import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body } from "express-validator";
import { BadRequestError } from "../../errors/bad-request-error";
import { PasswordManager } from "../../services/password-manager";
import { User } from "../../models/user";
import keys from "../../config/keys";
import { validateRequest } from "../../middlewares/validate-request";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("username")
      .notEmpty()
      .withMessage("Please enter your username"),
    body("password").trim().notEmpty().withMessage("Please enter your password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw new BadRequestError(
        "Please enter valid credentials or create new account"
      );
    }

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError(
        "Please enter valid credentials or create new account"
      );
    }

    const token = jwt.sign(
      {
        id: existingUser.id,
        username: existingUser.username,
      },
      keys.JWT_SECRET_KEY!,
      {
        expiresIn: "5h",
      }
    );

    res.status(200).send({ user: existingUser, token });
  }
);

export { router as signinRouter };
