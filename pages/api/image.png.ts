import { VercelRequest, VercelResponse } from "@vercel/node";
import DeviceDetector from "device-detector-js";
import { PNG } from "pngjs";
import fs from "fs";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  console.log(
    req.headers["user-agent"],
    req.headers["x-real-ip"],
  );
  const image = new PNG({ width: 1, height: 1 });
  res.setHeader("Content-Type", "image/png");
  res.status(200);
  res.send(await image.pack());
};
