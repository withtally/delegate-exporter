import { VercelRequest, VercelResponse } from "@vercel/node";
import { getAllDelegates } from "../libs/helpers/delegates/getAllDelegates";
import { put } from "@vercel/blob";
import { uploadDelegates } from "../libs/helpers/delegates/uploadDelegates";

export const config = {
  maxDuration: 300,
};

const handler = async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  try {
    const data = await getAllDelegates();

    const jsonData = JSON.stringify(data);
    const bufferData = Buffer.from(jsonData, "utf-8");

    // const blob = await put("delegates-data.json", bufferData, {
    //   access: "public",
    //   addRandomSuffix: false,
    //   cacheControlMaxAge: 60,
    // });

    const response = await uploadDelegates(bufferData);

    res
      .setHeader("Content-Type", "application/json")
      .status(200)
      .json({ response: "Delegates list was successfully updated" });
  } catch (error) {
    res
      .setHeader("Content-Type", "application/json")
      .status(500)
      .json({ messge: "can't upload file" });
  }
};

export default handler;
