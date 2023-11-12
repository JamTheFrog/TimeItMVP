import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../../errors/request-validation-error";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../../models/user";
import keys from "../../config/keys";
import { validateRequest } from "../../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("username")
      .notEmpty()
      .withMessage("Please enter unique username"),
    body("email").isEmail().withMessage("Please enter valid email"),
    body("firstName").notEmpty().withMessage("Please enter your name"),
    body("lastName").notEmpty().withMessage("Please enter your surename"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Please enter the password with minimum of 6 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, firstName, lastName, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword)
      throw new BadRequestError("Passwords don't match");

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new BadRequestError(
        "Username already exists, please try using another one"
      );
    }

    const user = User.build({
      username,
      email,
      firstName,
      lastName,
      password,
    });
    await user.save();

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      keys.JWT_SECRET_KEY!,
      {
        expiresIn: "5h",
      }
    );

    res.status(201).send({ user, token });
  }
);

export { router as signupRouter };
