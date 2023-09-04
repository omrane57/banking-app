const BankAppError = require("./BankAppError");
const {StatusCodes} =require( 'http-status-codes');

class NotFoundError extends BankAppError{
    constructor(specificMessage){
        super("Not Found","Not Found",StatusCodes.NOT_FOUND,specificMessage)
    }
}
module.exports=NotFoundError