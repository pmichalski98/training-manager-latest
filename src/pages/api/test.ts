import { NextApiRequest, NextApiResponse } from "next";
const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);
    res.send(req.body);
  }
};
export default webhook;
