'use strict';

const jwt = require('jsonwebtoken');

// Basic Authentication

// 1. Define route for handling basic auth requests
app.post('/signup', (request, response) => {
  let user = new UserModel(request.body);
  user.save()
    .then(user => {
      request.token = user.generateToken();
      request.user = user;
      response.set('token', request.token);
      response.cookie('auth', request.token);
      response.send(request.token);
    }) .catch(next);
})
app.post('/signin', handleAuth, (request, response) => {
  response.cookie('auth', request.token);
  response.send(request.token);
})

// 2. Create a user model
// A mongoose model with methods to handle user auth operations
  // Hashing Passwords (Encrytion)
  // Comparing values to Passwords
  // Generate a tocken

  const users = mongoose.Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    email: { type: String, required: true},
    });
    
    users.pre('save', async function () {
      if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
      }
    });

    // @params {object} auth - {username, password}
    users.statics.authenticateBasic = (auth) => {
      let query = {username: auth.username};
      return this.findOne(query)
        .then(user => user.comparePassword(auth.password))
    }
    
    // @params {string} password - hey bcrypt, does this value equal your instance passwork when you encrypt
    users.methods.comparePassword = (password) => {
      return bcrypt.compare(password, this.password)
        .then(isValid => isValid ? this : null);
    }

    // @params {void} - creates a token
    users.methods.generateToken = () => {
      let userData = {
        id: this._id,
      }
      return jwt.sign(userData, process.env.SECRET);
    }
    
    const UserModel = mongoose.model('users', users);

    function handleAuth(request, response, next){
      // parse requests for header values
      // request.headers.authorization.split(' ');
      const [authType, authString] = request.authorization.split(' ');

      switch(authType.toLowerCase()){
        // decide whether we are using basic or bearer 
        case 'basic':
          return _authBasic(authString);
        default: 
          return _authError();
      }
      // attach unincrypt the authString
      function _authBasic(authString){
        let base64Buffer = Buffer.from(authString, 'base64');
        let bufferString = base64Buffer.toString();
        let [username, password] = bufferString.split(':');
        let auth = {username, password};

        return UserModel.authenticateBasic(auth)
          .then(user => _authenticate(user));
      }

      function _authenticate(user){
        if(user){
          request.token = user.generateToken();
        }
      }

      function _authError(){
        next('Auth Error');
      }
    }
    
    // 3. Creating Auth Middleware that will handle any request data that relates to auth
      // Check for auth headers
      // Decide whether our requests are authorized

// Doc Agnostic, Look at bcrypt