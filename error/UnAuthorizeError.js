const BankAppError = require("./BankAppError");
const {StatusCodes} =require( 'http-status-codes');

class UnAuthorizeError extends BankAppError{
    constructor(specificMessage){
        super("UnAuthorize Access","UnAuthorize Access",StatusCodes.UNAUTHORIZED,specificMessage)
    }
}
module.exports=UnAuthorizeError