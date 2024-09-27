import { VercelResponse } from "@vercel/node";
import { getAllDelegates } from "../helpers/delegates/getAllDelegates";
import { uploadFile } from "../helpers/S3Client/uploadFile";

const exportDelegates = async (res: VercelResponse) => {
  try {
    console.log('time', new Date().toISOString())
    const data = await getAllDelegates();
    const jsonData = JSON.stringify(data);
    const bufferData = Buffer.from(jsonData, "utf-8");

    await uploadFile(
      bufferData,
      process.env.DELEGATES_JSON_NAME || "delegates-data.json"
    );

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

export default {
  exportDelegates,
};
