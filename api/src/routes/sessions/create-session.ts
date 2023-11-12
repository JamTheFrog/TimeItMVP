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
      .withMessage("Please enter the name of your session"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Please enter the description of your session"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { name, description } = req.body;

    const existingUser = await User.findById(req.currentUser!.id);

    if (!existingUser)
      throw new BadRequestError("We couldn't find your account");

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
