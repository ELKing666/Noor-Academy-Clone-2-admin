import { Router, type IRouter } from "express";
import healthRouter from "./health";
import registerRouter from "./register";
import { contentRouter } from "./content";
import { adminRouter } from "./admin";
import { coursesRouter } from "./courses";

const router: IRouter = Router();

router.use(healthRouter);
router.use(registerRouter);
router.use(contentRouter);
router.use(adminRouter);
router.use(coursesRouter);

export default router;
