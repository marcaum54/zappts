'use strict';

const User = use('App/Models/User');

class AuthController {
  async authenticate({ request, auth }) {
    const { username, password } = request.only(['username', 'password']);
    let token = await auth.attempt(username, password);
    const user = await User.findBy('username', username);
    token = Object.assign({}, token, { user: user });

    return token;
  }

  async current_user({ response, auth }) {
    let user = false;
    try {
      user = await auth.getUser();
    } catch (error) {
      return response.send(user);
    }
  }
}

module.exports = AuthController;
