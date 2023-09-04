const BankAppError = require("./BankAppError");
const {StatusCodes} =require( 'http-status-codes');
class ValidationError extends BankAppError{
    constructor(specificMessage){
        super("Invalid Parameter","Invalid Input",StatusCodes.BAD_REQUEST,specificMessage)
    }
}
module.exports=ValidationError