import express, { Request, Response } from "express";
import { body, check } from "express-validator";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import { NotAuthorizedError } from "../../errors/not-authorized";
import { BadRequestError } from "../../errors/bad-request-error";
import { Session, TimeBlock } from "../../models/session";
import { NotFoundError } from "../../errors/not-found-error";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post(
  "/api/sessions/:sessionid/timeblocks",
  requireAuth,
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Molimo vas unesite naziv vaše sesije"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Molimo vas unesite opis vaše sesije"),
    body("duration")
      .isFloat({ min: 0, max: 100000 })
      .withMessage(
        "Molimo vas unesite trajanje koje je u granici od 1 do 100.000"
      ),
    check("sessionid").isMongoId().withMessage("Dali ste nam nevažeći ID"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, description, duration } = req.body;

    const existingUser = await User.findById(req.currentUser!.id);

    if (!existingUser)
      throw new BadRequestError("Nismo uspjeli naći vaš profil");

    const existingSession = await Session.findById(req.params.sessionid);
    
    if (!existingSession) throw new NotFoundError();

    if (existingSession.ownerId !== req.currentUser!.id)
      throw new NotAuthorizedError();

    const timeBlock: TimeBlock = {
      id: uuidv4(),
      title,
      duration: +duration,
      description,
    };

    const updatedTimeBlocks: TimeBlock[] = [
      ...existingSession.timeBlocks,
      timeBlock,
    ];

    existingSession.timeBlocks = updatedTimeBlocks;
    const latestSession = await existingSession.save();

    res.status(201).send(latestSession);
  }
);

export { router as createTimeBlockRouter };
