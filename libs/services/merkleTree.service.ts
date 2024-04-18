import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { checkParams } from "../helpers/merkleTree/checkParams";
import { uploadFile } from "../helpers/S3Client/uploadFile";

const loadMerkleTree = async (req: VercelRequest, res: VercelResponse) => {
  const { hasMissingParams } = checkParams(["uuid"], req.body, res);
  if (hasMissingParams) {
    return;
  }

  try {
    const merkleTreeResponse = await axios.get(
      `https://d2ydy7et7ob3l7.cloudfront.net/${req.body.uuid}/tree.json`
    );

    let merkleTree = JSON.stringify({
      format: merkleTreeResponse.data.format,
      tree: merkleTreeResponse.data.tree,
      values: merkleTreeResponse.data.values.map((v: any) => ({
        value: v.value,
        treeIndex: v.tree_index,
      })),
      leafEncoding: merkleTreeResponse.data.leaf_encoding,
    });

    const bufferData = Buffer.from(merkleTree, "utf-8");

    await uploadFile(bufferData, "merkle-tree-data.json");

    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json({ message: 'Merkle tree uploaded successfully' });
  } catch (error) {
    res
      .setHeader("Content-Type", "application/json")
      .status(500)
      .json({ message: "An error happened while uploading Merkle tree" });
  }
};

export default {
  loadMerkleTree,
};
