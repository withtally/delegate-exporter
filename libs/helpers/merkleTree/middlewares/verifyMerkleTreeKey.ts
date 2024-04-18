import { VercelRequest, VercelResponse } from "@vercel/node";

export const verifyMerkleTreeKey = (
  req: VercelRequest,
  res: VercelResponse,
  next: Function
) => {
  if (
    req.headers["merkle_tree_load_key"] !== process.env.MERKLE_TREE_LOAD_KEY
  ) {
    res
      .setHeader("Content-Type", "application/json")
      .status(403)
      .json({ message: "Access Denied" });
    return;
  }
  next();
};
