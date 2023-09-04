const {ValidationError,UnAuthorizeError,NotFoundError }=require("./error/Index")
const Transaction = require("./Transaction")


class Account{
    static accountId=0;
    constructor(id,bankId,bankName,balance,transaction){
        this.id=id,
        this.bankId=bankId,
        this.bank=bankName,
        this.balance=balance,
        this.transaction=transaction
        
    }
    static newAccount(id,bankName,balance,transaction){
        try{
            if(typeof balance!="number"){
            throw new ValidationError("Invalid Parameter")
            }
            if(balance<1000){
                throw new ValidationError("Minimum 1000 Rupees Are Required To Create A Account")
                }
        }
        catch(error){
            throw error
        }
        let newAccount=new Account(Account.accountId++,id,bankName,balance,transaction)
        return newAccount;

    }
    depositeAccount(amount){
        try{
            if(typeof amount!="number"){
                throw new ValidationError("Invalid Parameter")
                
            }
            this.balance=this.balance+amount
            return "Success"
        }
        catch(error){
            throw error
        }
       
    }
    withDrawAccount(amount){
        let newBalance
        try{
            if(typeof amount!="number"){
                throw new ValidationError("Invalid Parameter")
               
            }
            newBalance=this.balance-amount
            if(newBalance<1000)
            {
                throw new ValidationError("You Are Reached Your Minmum Balance Amount Of Your Account")
            }
        }
        catch(error){
            throw error
        }
        this.balance=newBalance;
        
        
        return this.balance
    }
    getBalance(){
        return this.balance
    }
    getTransaction(){
       return this.transaction



    
    }
    // filterTransaction(from,to){
    //     let a= this.transaction.filter((data)=>{(data.date>=from) && (data.date<=to) })
    //     return a;
    // }
     
    
    
}
module.exports=Account