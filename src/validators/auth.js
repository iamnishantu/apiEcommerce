const {check,validationResult } = require ('express-validator');

exports.validateSignupRequest =[
 	check('firstName')
	 .notEmpty()
	 .withMessage('firstName is required'),
	 check('lastName')
	 .notEmpty()
	 .withMessage('lastName is required'),
	 check('lastName'),
	 check('email')
	 .isEmail()
	 .withMessage('Valid Email is required'),
	 check('password')
	 .isLength({min : 6 })
     .withMessage('password must be least 6 character long')


];

exports.validateSigninRequest =[
	 check('email')
	 .isEmail()
	 .withMessage('please Enter a Valid Email'),
	 check('password')
	 .isLength({min : 6 })
     .withMessage('password must be least 6 character long')


];


exports.isRequestValidated = (req,res,next)=>{

const errors= validationResult (req);
if (errors.array().length > 0){
 return res.status  (400).json({eroors: errors.array()[0].msg })
}

     next();
}
