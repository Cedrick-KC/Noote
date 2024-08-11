const User = require('user');
const jwt =  require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
}
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
return jwt.sign({id},'cedmade secret',{
    expiresIn: maxAge
});

}
module.exports.signup_get = (req,res) => {
    res.render('sign')
}

module.exports.login_get = (req,res) => {
    res.render('log')
}

module.exports.signup_post= async (req,res) => {
    const{ username, email, password,dob } = req.body;
    
    try {
        const user = await User.create({ username,email,password,dob });
        const token = createToken(user._id);
        res.cookie('jwt',token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({user: user._id});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.login_post = async (req,res) => {
    const { username,password } = req.body;
try {
  const user = await User.login ( username,password );
  res.status(200).json({user: user._id});
}

catch (err) {

}}
