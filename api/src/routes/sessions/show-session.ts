import express, { Request, Response } from "express";
import { check } from "express-validator";
import { validateRequest } from "../../middlewares/validate-request";
import { NotFoundError } from "../../errors/not-found-error";
import { Session } from "../../models/session";

const router = express.Router();

router.get(
  "/api/sessions/:sessionid",
  [check("sessionid").isMongoId().withMessage("Invalid ID")],
  validateRequest,
  async (req: Request, res: Response) => {
    const session = await Session.findById(req.params.sessionid);

    if (!session) throw new NotFoundError();

    res.send(session);
  }
);

export { router as showSessionRouter };
