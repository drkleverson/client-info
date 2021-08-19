import { VercelRequest, VercelResponse } from "@vercel/node";

module.exports = async (req: VercelRequest, res: VercelResponse) => {
  const response = await fetch(
    `http://ip-api.com/json/${req.headers["x-real-ip"] || ""}`
  );
  const responseData = await response.json();

  const data = {
    ip: req.headers["x-real-ip"] || "",
    result: responseData,
  };

  res.status(200).json(data);
};
