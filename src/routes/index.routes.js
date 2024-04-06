import { Router } from "express";
import { ping } from "../controllers/index.controller.js";
//hola mundo

const router = Router()

router.get('/ping',ping );

export default router