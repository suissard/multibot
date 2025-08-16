module.exports = class extends require('../Route') {
  constructor() {
    super(
      '',
      '/user',
      {
        method: 'GET',
        name: 'Get User',
        description: 'Gets the current user',
        permissions: ['MEMBER'],
      },
    );
  }

  async run(ctx) {
    // In a real application, you would fetch the user from the database
    // using the token from ctx.state.user
    const user = {
      id: '12345',
      username: 'Test User',
      avatar: 'avatar-hash',
    };
    return ctx.body = {
      ...this.options,
      user,
    };
  }
}
