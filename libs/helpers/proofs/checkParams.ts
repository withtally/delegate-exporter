import { VercelResponse } from "@vercel/node";

const generateMessageAboutMissingParams = (missingParams: string[]) => {
  return missingParams.length === 1
    ? `Param ${JSON.stringify(missingParams)} is Required`
    : `Params ${JSON.stringify(missingParams)} are required`;
};

const setBadRequest = (res: VercelResponse, message: string) => {
  res
    .setHeader("Content-Type", "application/json")
    .status(400)
    .json({ message });
};

export const checkParams = (
  requiredParams: string[],
  body: any,
  res: VercelResponse
): { hasMissingParams: boolean } => {
  if (!body) {
    setBadRequest(res, generateMessageAboutMissingParams(requiredParams));
    return { hasMissingParams: true };
  }

  const missingParams: string[] = [];

  for (const param of requiredParams) {
    if (param in body) continue;

    missingParams.push(param);
  }

  if (missingParams.length) {
    setBadRequest(res, generateMessageAboutMissingParams(missingParams));
    return { hasMissingParams: true };
  }

  return { hasMissingParams: false };
};
