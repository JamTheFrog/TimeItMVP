import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import { BadRequestError } from "../../errors/bad-request-error";
import { Session } from "../../models/session";

const router = express.Router();

router.patch(
  "/api/sessions/:sessionid",
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

    const existingSession = await Session.findById(req.params.sessionid);

    if (!existingSession) {
      console.log("not found here");
      throw new BadRequestError("Session not found");
    }

    if (existingSession.ownerId !== req.currentUser!.id)
      throw new BadRequestError(
        "You are not authorized to update this session"
      );

    existingSession.set({
      name,
      description,
    });

    const updatedSession = await existingSession.save();

    res.status(200).send(updatedSession);
  }
);

export { router as editSessionRouter };
