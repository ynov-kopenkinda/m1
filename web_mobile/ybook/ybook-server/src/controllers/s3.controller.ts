import { extractSession } from "../middleware/session.middleware";
import type { ApiController } from "../types";
import * as s3 from "../aws/s3";
import { validateSchema } from "../utils/validateSchema";
import { z } from "zod";

export const s3Controller = {
  sendToS3: async (req, res) => {
    const session = await extractSession(res);
    const { url, key } = await s3.getSignedPostUrl(session.user.id);
    return res.json({ url, key });
  },
  getFromS3: async (req, res) => {
    const { s3Key } = validateSchema(
      z.object({ s3Key: z.string() }),
      req.query
    );
    const url = await s3.getSignedGetUrl(s3Key);
    return res.json({ url });
  },
} satisfies ApiController;
