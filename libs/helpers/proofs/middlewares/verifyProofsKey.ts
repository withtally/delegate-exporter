import { VercelRequest, VercelResponse } from "@vercel/node";

export const verifyProofsKey = (
    req: VercelRequest,
    res: VercelResponse,
    next: Function
) => {
    if (
        req.headers["proofs_load_key"] !== process.env.PROOFS_LOAD_KEY
    ) {
        res
            .setHeader("Content-Type", "application/json")
            .status(403)
            .json({ message: "Access Denied" });
        return;
    }
    next();
};
