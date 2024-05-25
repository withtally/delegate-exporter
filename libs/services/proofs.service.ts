import { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { checkParams } from "../helpers/merkleTree/checkParams";
import { uploadFile } from "../helpers/S3Client/uploadFile";

const loadProofs = async (req: VercelRequest, res: VercelResponse) => {
    const { hasMissingParams } = checkParams(["uuid"], req.body, res);
    if (hasMissingParams) {
        return;
    }

    try {
        const proofsResponse = await axios.get(
            `https://api.hedgey.finance/token-claims/proof/${req.body.uuid}`
        );

        let proofs = JSON.stringify({
            format: proofsResponse.data.format,
            tree: proofsResponse.data.tree,
            values: proofsResponse.data.values.map((v: any) => ({
                value: v.value,
                treeIndex: v.tree_index,
            })),
            leafEncoding: proofsResponse.data.leaf_encoding,
        });

        const bufferData = Buffer.from(proofs, "utf-8");

        await uploadFile(bufferData, "proofs-data.json");

        res
            .setHeader("Content-Type", "application/json")
            .status(200)
            .json({ message: 'Proofs uploaded successfully' });
    } catch (error) {
        res
            .setHeader("Content-Type", "application/json")
            .status(500)
            .json({ message: "An error happened while uploading proofs" });
    }
};

export default {
    loadProofs,
};
