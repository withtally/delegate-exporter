import { VercelRequest, VercelResponse } from "@vercel/node";
import merkleTreeService from "../libs/services/merkleTree.service";
import { verifyMerkleTreeKey } from "../libs/helpers/merkleTree/middlewares/verifyMerkleTreeKey";

export const config = {
  maxDuration: 300,
};

const handler = async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  if (req.method === "POST") {
    verifyMerkleTreeKey(req, res, () =>
      merkleTreeService.loadMerkleTree(req, res)
    );
  } else {
    res.setHeader("Content-Type", "application/json").status(404).json({
      message: "Endpoint is Not Found",
    });
  }
};

export default handler;
