import express, { Request, Response } from "express";
import { User } from "../../models/user";
import { NotAuthorizedError } from "../../errors/not-authorized";
import { BadRequestError } from "../../errors/bad-request-error";
import { Session } from "../../models/session";
import { NotFoundError } from "../../errors/not-found-error";

const router = express.Router();

router.delete(
  "/api/sessions/:sessionid",
  async (req: Request, res: Response) => {

    console.log("got req");

    const existingUser = await User.findById(req.currentUser!.id);

    if (!existingUser) throw new BadRequestError("We couldn't find your account");

    const existingSession = await Session.findById(req.params.sessionid);
    
    if (!existingSession) throw new NotFoundError();

    if (existingSession.ownerId !== req.currentUser!.id) throw new NotAuthorizedError();

    await Session.findByIdAndDelete(req.params.sessionid);

    const remainingSessions = await Session.find();

    res.status(201).send(remainingSessions);
  }
);

export { router as deleteSessionRouter };