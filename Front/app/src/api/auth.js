// Simulate API latency
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export default {
  async login(code) {
    await sleep(500);
    if (code) {
      return { token: `fake-token-for-code-${code}` };
    }
    throw new Error('No authorization code provided.');
  },

  getDiscordAuthUrl() {
    return `/auth/callback?code=fake-code`;
  }
};
