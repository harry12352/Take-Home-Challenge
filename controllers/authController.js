const passport = require('../services/authService');
const config = require('../config/config');
const db = require('./models/index.js');
const user = db.users;

exports.authenticate = passport.authenticate('oauth2', {
    scope: ['openid', 'profile', 'offline_access', 'Mail.Read']
});

exports.outlookAuthCallback = async (req, res) => {
    const code = req.query.code;
    
    const tokenResponse = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', querystring.stringify({
      client_id: config.outlookClientId,
      client_secret: config.outlookClientSecret,
      code,
      redirect_uri: config.redirectUri,
      grant_type: 'authorization_code'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  
    const { access_token, id_token } = tokenResponse.data;
  
    const decodedToken = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());
    const email = decodedToken.email;
  
    const createUser = {
      id: uuidv4(),
      email,
      accessToken: access_token
    };
  
    await user.create(createUser);
  
    res.json({ message: 'User created successfully', user });
  };

exports.redirectAfterLogin = (req, res) => {
    res.redirect('/sync');
};
