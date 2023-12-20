import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { User } from "../../models/user";
import { NotAuthorizedError } from "../../errors/not-authorized";
import { BadRequestError } from "../../errors/bad-request-error";
import { Session } from "../../models/session";
import { NotFoundError } from "../../errors/not-found-error";

const router = express.Router();

router.delete(
  "/api/sessions/:sessionid/:timeblockid",
  requireAuth,
  async (req: Request, res: Response) => {

    const existingUser = await User.findById(req.currentUser!.id);

    if (!existingUser)
      throw new BadRequestError("We couldn't find your account");

    const existingSession = await Session.findById(req.params.sessionid);

    console.log(existingSession);

    if (!existingSession) throw new NotFoundError();

    if (existingSession.ownerId !== req.currentUser!.id){ 
        console.log(existingSession.ownerId + "  " + req.currentUser!.id);
        throw new NotAuthorizedError();}

    const existingTimeBlockIndex = existingSession.timeBlocks.findIndex(
      (block) => block.id === req.params.timeblockid
    );

    if (existingTimeBlockIndex === -1) throw new NotFoundError();

    existingSession.timeBlocks.splice(existingTimeBlockIndex, 1)

    const latestSession = await existingSession.save();

    res.status(200).send(latestSession);
  }
);

export { router as deleteTimeBlockRouter };
