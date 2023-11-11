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
      .withMessage("Molimo vas unesite unikatno korisničko ime"),
    body("email").isEmail().withMessage("Molimo vas unesite validan email"),
    body("firstName").notEmpty().withMessage("Molimo vas unesite vaše ime"),
    body("lastName").notEmpty().withMessage("Molimo vas unesite vaše prezime"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Molimo vas unesite šifru koja ima minimalno 6 karaktera"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, firstName, lastName, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword)
      throw new BadRequestError("Šifre se ne poklapaju");

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new BadRequestError(
        "Korisničko ime je zauzeto, molimo vas unesite unikatno korisničko ime"
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
