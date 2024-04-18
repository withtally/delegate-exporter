import { VercelRequest, VercelResponse } from "@vercel/node";
import delegatesService from "../libs/services/delegates.service";

export const config = {
  maxDuration: 300,
};

const handler = async (
  req: VercelRequest,
  res: VercelResponse
): Promise<void> => {
  return delegatesService.exportDelegates(res);
};

export default handler;
