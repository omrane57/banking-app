class BankAppError extends Error{
    constructor(message,name,httpStatusCode,specificMessage){
        super(message)
        this.name=name,
        this.httpStatusCode=httpStatusCode,
        this.specificMessage=specificMessage
    }
}
module.exports=BankAppError