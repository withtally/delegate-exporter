import { VercelRequest, VercelResponse } from "@vercel/node";
import {verifyProofsKey} from "../libs/helpers/proofs/middlewares/verifyProofsKey";
import proofsService from "../libs/services/proofs.service";

export const config = {
    maxDuration: 300,
};

const handler = async (
    req: VercelRequest,
    res: VercelResponse
): Promise<void> => {
    if (req.method === "POST") {
        verifyProofsKey(req, res, () =>
            proofsService.loadProofs(req, res)
        );
    } else {
        res.setHeader("Content-Type", "application/json").status(404).json({
            message: "Endpoint is Not Found",
        });
    }
};

export default handler;
