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
      .withMessage("Molimo vas unesite tačno korisničko ime"),
    body("password").trim().notEmpty().withMessage("Molimo vas unesite šifru"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      throw new BadRequestError(
        "Molimo vas unesite ispravne kredencijale ili kreirajte novi profil"
      );
    }

    const passwordsMatch = await PasswordManager.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError(
        "Molimo vas unesite ispravne kredencijale ili kreirajte novi profil"
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
