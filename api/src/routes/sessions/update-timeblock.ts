import express, { Request, Response } from "express";
import { body, check } from "express-validator";
import { requireAuth } from "../../middlewares/require-auth";
import { validateRequest } from "../../middlewares/validate-request";
import { User } from "../../models/user";
import { NotAuthorizedError } from "../../errors/not-authorized";
import { BadRequestError } from "../../errors/bad-request-error";
import { Session, TimeBlock } from "../../models/session";
import { NotFoundError } from "../../errors/not-found-error";

const router = express.Router();

router.patch(
  "/api/sessions/:sessionid/timeblocks",
  requireAuth,
  [
    body("title")
      .not()
      .isEmpty()
      .withMessage("Please enter the title of your time block"),
    body("description")
      .not()
      .isEmpty()
      .withMessage("Please enter the description of your time block"),
    body("duration")
      .isFloat({ min: 0, max: 1000000 })
      .withMessage(
        "Please enter valid duration of your session"
      ),
    check("sessionid").isMongoId().withMessage("Invalid ID"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { id, title, description, duration } = req.body;

    const existingUser = await User.findById(req.currentUser!.id);

    if (!existingUser)
      throw new BadRequestError("We couldn't find your account");

    const existingSession = await Session.findById(req.params.sessionid);
    
    console.log(existingSession);
    
    if (!existingSession) throw new NotFoundError();
    

    if (existingSession.ownerId !== req.currentUser!.id) throw new NotAuthorizedError();

      const existingTimeBlockIndex = existingSession.timeBlocks.findIndex(
        (block) => block.id === id
      );
  
      if (existingTimeBlockIndex === -1) throw new NotFoundError();
      
  
      const timeBlock: TimeBlock = {
        id,
        title,
        duration: +duration,
        description,
      };
      
      existingSession.timeBlocks[existingTimeBlockIndex] = timeBlock
  
      const latestSession = await existingSession.save();
  
      res.status(200).send(latestSession);
    }
  );
  
  export { router as editTimeBlockRouter };