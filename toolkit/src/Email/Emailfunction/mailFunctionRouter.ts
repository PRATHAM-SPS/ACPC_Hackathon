import express from 'express';
import { sendCallSummaryEmail, sendCibilScoreEmail, sendFormRequestEmail } from './mailFunctionController';

const router = express.Router();

router.post('/send-form-request-email',sendFormRequestEmail)

router.post('/send-cibil-score',sendCibilScoreEmail)

router.post("/summary", sendCallSummaryEmail)


export default router;