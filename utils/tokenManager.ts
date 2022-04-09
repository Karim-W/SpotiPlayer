//singleton class
export class TokenManager {
	private static instance: TokenManager;
	private accessToken: string;

	private constructor() {
		this.accessToken = "";
	}

	public static getInstance(): TokenManager {
		if (!TokenManager.instance) {
			TokenManager.instance = new TokenManager();
		}
		return TokenManager.instance;
	}

	public getAccessToken(): string {
		return this.accessToken;
	}

	public setAccessToken(accessToken: string): void {
		if (accessToken != "") {
			console.log("setAccessToken:" + accessToken);
			this.accessToken = accessToken;
		}
	}
}
