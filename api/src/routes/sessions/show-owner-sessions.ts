import express, { Request, Response } from "express";
import { requireAuth } from "../../middlewares/require-auth";
import { Session } from "../../models/session";

const router = express.Router();

router.get(
  "/api/sessions/ownersessions",
  requireAuth,
  async (req: Request, res: Response) => {
    const sessions = await Session.find({
      ownerId: req.currentUser!.id,
    });

    res.send(sessions);
  }
);

export { router as showOwnerSessionsRouter };
