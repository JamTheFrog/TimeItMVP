import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import { NotAuthorizedError } from "../../errors/not-authorized";
import { BadRequestError } from "../../errors/bad-request-error";
import { Session } from "../../models/session";

const router = express.Router();

router.post(
  "/api/sessions",
  requireAuth,
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Molimo vas unesite naziv vaše sesije"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Molimo vas unesite opis vaše sesije"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, description } = req.body;

    const existingUser = await User.findById(req.currentUser!.id);

    if (!existingUser)
      throw new BadRequestError("Nismo uspjeli naći vaš profil");

    const session = Session.build({
      name,
      description,
      timeBlocks: [],
      ownerId: existingUser.id,
    });

    const latestSession = await session.save();

    res.status(201).send(latestSession);
  }
);

export { router as createSessionRouter };
