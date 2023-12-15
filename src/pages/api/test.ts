import { NextApiRequest, NextApiResponse } from "next";
const webhook = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);
    res.send(req.body);
  }
};
export default webhook;
