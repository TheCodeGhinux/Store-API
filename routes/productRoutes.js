import express from 'express'
import { getAllProductStatic, getAllProducts } from '../controllers/productControllers.js'

const router = express.Router()

router.get('/', getAllProducts)
router.get('/static', getAllProductStatic)
// router.post('/', getAllProducts)

export default router;