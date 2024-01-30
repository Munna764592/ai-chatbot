import { body, validationResult } from 'express-validator'
export const validate = (validations) => {
    return async (req, res, next) => {
        for(let validation of validations){
            const result = await validation.run(req)
            if(!result.isEmpty()){
                break;
            }
        }
        const errors= validationResult(req);
        if(errors.isEmpty()){
            return next();
        }
        res.status(422).json({errors:errors.array()})
    }
}
export const loginValidator = [
    body("email").trim().isEmail().withMessage("Enter correct email"),
    body("password").isLength({ min: 6 }).trim().withMessage("Password should contain atleast 6 characters"),
]
export const signupValidator = [
    body("name").notEmpty().withMessage("name is required"),
   ...loginValidator,
]

export const chatCompletionValidator = [
    body("message").notEmpty().withMessage("message is required"),
]

