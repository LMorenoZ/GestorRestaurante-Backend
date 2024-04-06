import { Router } from "express";
import { getPedidos, createPedidos, updatePedidos, deletePedidos, getPedido } from "../controllers/pedidos.controller.js";

const router = Router()

router.get('/pedidos', getPedidos)

router.get('/pedidos/:id',getPedido)

router.post('/pedidos', createPedidos)

router.patch('/pedidos/:id', updatePedidos)

router.delete('/pedidos/:id', deletePedidos)

export default router