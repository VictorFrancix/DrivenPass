import { Router } from "express";
import "express-async-errors";

import userRouter  from "./userRouter.js";
import credentialRouter from "./credentialRouter.js";
import notesRouter from "./notesRouter.js";
import cardRouter from "./cardRouter.js";
import wifiRouter from "./wifiRouter.js";

const router = Router();

router.use(userRouter);
router.use(credentialRouter);
router.use(notesRouter);
router.use(cardRouter);
router.use(wifiRouter);

export default router;