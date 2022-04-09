import { TokenManager } from "./../../utils/tokenManager";
import { SetAccesswToken } from "./token";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import * as request from "request";
type Data = {
	name: string;
};

export var AccessToken = "";

export default function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	var code = req.query.code;

	var authOptions = {
		url: "https://accounts.spotify.com/api/token",
		form: {
			code: code,
			redirect_uri: "http://localhost:3000/api/callback",
			grant_type: "authorization_code",
		},
		headers: {
			Authorization:
				"Basic " +
				Buffer.from(
					process.env.SPOTIFY_CLIENT_ID +
						":" +
						process.env.SPOTIFY_CLIENT_SECRET
				).toString("base64"),
			"Content-Type": "application/x-www-form-urlencoded",
		},
		json: true,
	};
	request.post(authOptions, function (error, response, body) {
		if (!error && response.statusCode === 200) {
			SetAccesswToken(body.access_token);
			console.log("ACCESS TOKEN:" + body.access_token);
			let classInstance = TokenManager.getInstance();
			classInstance.setAccessToken(body.access_token);
			res.redirect("/");
		}
	});
}
