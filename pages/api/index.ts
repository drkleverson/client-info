import { VercelRequest, VercelResponse } from "@vercel/node";
import DeviceDetector from "device-detector-js";
import si from "systeminformation";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const response = await fetch(
    `http://ip-api.com/json/${req.headers["x-real-ip"] || ""}`
  );

  const responseData = await response.json();
  const cpuInfo = await si.cpu();
  const deviceDevice = new DeviceDetector();
  const device = deviceDevice.parse(req.headers["user-agent"]);

  const data = {
    ip: req.headers["x-real-ip"] || "",
    result: responseData,
    device,
    cpuInfo,
  };

  res.status(200).json(data);
};
