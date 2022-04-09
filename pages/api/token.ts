import { TokenManager } from "./../../utils/tokenManager";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
	access_token: string;
};

var AccessToken = "";

export const SetAccesswToken = (token: string) => {
	AccessToken = token;
};

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	let t = TokenManager.getInstance();
	console.log("ACCESS TOKEN AGAIN:" + t.getAccessToken());
	res.status(200).json({ access_token: t.getAccessToken() });
}
