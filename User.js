const Account = require("./Account")
const Bank = require("./Bank")
const Transaction = require("./Transaction")
const {ValidationError,UnAuthorizeError,NotFoundError }=require("./error/Index.js")
class User{
    static userId=0
    static allUser=[]
    static AllBanks=[]
    constructor(id,name,age,gender,isAdmin,userAccount){
        this.id=id
        this.name=name,
        this.age=age,
        this.gender=gender,
        this.isAdmin=isAdmin,
        this.UserAccount=userAccount
    }
   static newAdmin(name,age,gender){
        // Validation Of Admin
        try{
          if(typeof name!="string"){
            throw new ValidationError("Invalid Name")
          }
          if(typeof age!="number"){
            throw new ValidationError("Invalid Age")
          }
          if(typeof gender!="string"&&(gender!="M"||gender!="F")){
            throw new ValidationError("Invalid Gender")
          }

        }
        catch(error){
          return error
        }
        let newAdmin=new User(User.userId++,name,age,gender,true,null)
        User.allUser.push(newAdmin)
        return newAdmin
    }
    newUser(name,age,gender){
        try{
            if(!this.isAdmin){
                throw new UnAuthorizeError("Admin Has Rights To Create User") 
            }
            if(typeof name!="string"){
              throw new ValidationError("Invalid Name")
            }
            if(typeof age!="number"){
              throw new ValidationError("Invalid Age")
            }
            if(typeof gender!="string"&&(gender!="M"||gender!="F")){
              throw new ValidationError("Invalid Gender")
            }
  
          }
          catch(error){
            return error
          }
          let newUser=new User(User.userId++,name,age,gender,false,[])
        User.allUser.push(newUser)

          return newUser;
    }
    createNewBank(name){
        try{
            if(!this.isAdmin){
                throw new UnAuthorizeError("Admin Has Rights To Create User") 
            }
            if(typeof name!="string"){
                throw new ValidationError("Invalid Name")
              }
              let newBank=Bank.newBank(name)
              User.AllBanks.push(newBank)
              newBank.pushBank()
              return newBank;
        }
        catch(error){
            return error
        }
        
        
    }

    getALLUser(){
        try{
            if(!this.isAdmin){
                throw new UnAuthorizeError("Admin Has Rights To Create User") 
            }
        }
        catch(error){
            return error
        }
        return User.allUser

    }
    getALLBank(){
        try{
            if(!this.isAdmin){
                throw new UnAuthorizeError("Admin Has Rights To Create User") 
            }
        }
        catch(error){
            return error
        }
        return User.AllBanks

    }
    static getUser(id){
        for(let index=0;index<User.allUser.length;index++){
            if(id==User.allUser[index].id)
            {
                return User.allUser[index]
            }
        }
        return null
    }
    static getBank(id){
        for(let index=0;index<User.AllBanks.length;index++){
            if(id==User.AllBanks[index].id)
            {
                return User.AllBanks[index]
            }
        }
        return null
    }
    updateName(newValue){
        try{
            if(typeof newValue!="string"){
                throw new ValidationError("Invalid Name")
            }
        }
        catch(error){
            return error
        }
        this.name=newValue
    }
    updateAge(newValue){
        try{
            if(typeof newValue!="number"){
                throw new ValidationError("Invalid Age")
            }
        }
        catch(error){
            return error
        }
        this.age=newValue
    }
    updateGender(newValue){
        try{
            if(typeof newValue!="string"&&(newValue!='M'||newValue!='F')){
                throw new ValidationError("Invalid Gender")
            }
        }
        catch(error){
            return error
        }
        this.gender=newValue
    }
    updateUser(id,parameter,newValue){
        try{
            if(!this.isAdmin){
                throw new UnAuthorizeError("Admin Has Rights To Create User") 
            }
            if(typeof parameter !="string"){

                throw new ValidationError("Invalid Parameter")
            }
            }
        catch(error){
            console.log(error)
            return error
        }
        let personToBeUpdated=User.getUser(id)
        try{
            if(personToBeUpdated==null){
                throw new NotFoundError("User Not Found")
            }
        }
        catch(error){
            return error
        }
            switch(parameter){
                case "name":{personToBeUpdated.updateName(newValue)
                    return personToBeUpdated

                }
                case"age":{personToBeUpdated.updateAge(newValue)
                    return personToBeUpdated


                }
                case"gender":{personToBeUpdated.updateGender(newValue)
                    return personToBeUpdated



                }
            }
      
    }
    updateBank(id,parameter,name){
        try{
            if(!this.isAdmin){

                throw new UnAuthorizeError("Admin Has Rights To Create User") 
            }
            if(typeof id !="number"){

                throw new ValidationError("Invalid Parameter")
            }
            if(typeof name!="string"){
                throw new ValidationError("Invalid Parameter")
            }
            if(typeof parameter!="string"){
                throw new ValidationError("Invalid Parameter")
            }
            }
        catch(error){
    
            return error
        }
        let bankToBeUpdated=User.getBank(id)
        // console.log(bankToBeUpdated)
        try{
            if(bankToBeUpdated==null){
                throw new NotFoundError("User Not Found")
            }
        }
        catch(error){
            return error
        }
        bankToBeUpdated.updateBank(parameter,name)

    }
    // creation of user account
    createUserAccount(bankId,balance){
        let getBank=User.getBank(bankId)
        try{
            if(this.admin){
                throw new UnAuthorizeError("Customer Can Only Create The Account")
            }
            if(getBank==null){
            throw new NotFoundError("Bank Not Found")
            }
        }
        catch(error){
            return error

        }
        let date1=new Date()
        let newAccount=Account.newAccount(getBank.getBankId(),getBank.getBankName(),balance,[Transaction.newTranscation(date1.toLocaleDateString(),"self","self",balance,balance,"Account Opening Charges")])
    
        this.UserAccount.push(newAccount)

        getBank.getAccounts().push(newAccount)
        return newAccount

    }
    getUserAccount(){
      
        return this.UserAccount
    }
    getUserAccount(id){
        for(let index=0;index<this.UserAccount.length;index++){
            if(id==this.UserAccount[index].id)
            {
                return this.UserAccount[index]
            }
        }
        return null
        
    }
   depositAmount(id,amount,flag,senderAccountNumber){
    let userAccountToBeDeposited
    try{
        if(this.isAdmin){
            throw new UnAuthorizeError("User Can Only Deposit The Amount")
        }
        if(typeof id!="number"){
            throw new ValidationError("InValid Amount")
        }
        userAccountToBeDeposited=this.getUserAccount(id)
        if(userAccountToBeDeposited==null){
            throw new NotFoundError("Account No Not Found")
        }
        
    }
    catch(error){
        return error
    }
    userAccountToBeDeposited.depositeAccount(amount)
    if(flag===1){
        let date1=new Date()
        let senderPassBook=userAccountToBeDeposited.getTransaction()
        let senderTranscation=Transaction.newTranscation(date1.toLocaleDateString(),senderAccountNumber,-1,amount,userAccountToBeDeposited.getBalance(),"Money Deposited")
       return senderPassBook.push(senderTranscation)
    }
    let date2=new Date()
    let newPassBook=userAccountToBeDeposited.getTransaction()
    let newTranscation=Transaction.newTranscation(date2.toLocaleDateString(),id,"",amount,userAccountToBeDeposited.getBalance(),"Credit")
    newPassBook.push(newTranscation)
}
withDrawAmount(id,amount,flag,recevierAccountNo){
    let userAccountToBeDebited
    try{
        if(this.isAdmin){
            throw new UnAuthorizeError("User Can Only Deposit The Amount")
        }
        if(typeof id!="number"){
            throw new ValidationError("InValid Amount")
        }
        userAccountToBeDebited=this.getUserAccount(id)
        if(userAccountToBeDebited==null){
            throw new NotFoundError("Account No Not Found")
        }
        
        userAccountToBeDebited.withDrawAccount(amount)
        if(flag==1){
            let date1=new Date()
            let recevierPassBook=userAccountToBeDebited.getTransaction()
        let recevierTranscation=Transaction.newTranscation(date1.toLocaleDateString(),-1,recevierAccountNo,amount,userAccountToBeDebited.getBalance(),"Money Transfer")
       return recevierPassBook.push(recevierTranscation)
        }
        let date2=new Date().toLocaleDateString()
        let newPassBook= userAccountToBeDebited.getTransaction()
        let newTranscation=Transaction.newTranscation(date2,-1,id,amount, userAccountToBeDebited.getBalance(),"Debit")
        newPassBook.push(newTranscation)
    }
    catch(error){
        return error
    }

}
transferAmount(senderAccountNumber,recevierId,accountNo,amount){
    let recevierDetails
    let recevierAcountDetails
    try{
        if(this.isAdmin){
            throw new UnAuthorizeError("User Can Only Deposit The Amount")
        }
        if(typeof recevierId!="number"||typeof accountNo!="number"){
            throw new ValidationError("Invalid UserId or Account No")
        }
        recevierDetails=User.getUser(recevierId)
        if(recevierDetails==null){
            throw new NotFoundError("User Not Found")
        }
        recevierAcountDetails=recevierDetails.getUserAccount(accountNo)
        if(recevierAcountDetails==null){
            throw new NotFoundError("Incorrect Account Number")
        }

        

    }catch(error){
     return error
    }
    this.withDrawAmount(senderAccountNumber,amount,1,accountNo)
    // let senderSidePassBook= recevierAcountDetails.getTransaction()
    // let senderSideTranscation=Transaction.newTranscation(new Date().getDate,senderAccountNumber,-1,amount, recevierAcountDetails.getBalance(),"Amount Send")
    // senderSidePassBook.push(senderSideTranscation)
    recevierDetails.depositAmount(accountNo,amount,1,senderAccountNumber)
    // let recevierSidePassBook= recevierAcountDetails.getTransaction()
    // let recevierSideTranscation=Transaction.newTranscation(new Date().getDate,senderAccountNumber,-1,amount, recevierAcountDetails.getBalance(),"Amount Received")
    // recevierSidePassBook.push(recevierSideTranscation)
//    console.log(result)
//    if(result!="Success"){
//     this.depositAmount(senderAccountNumber,amount)
//     console.log("Amount reversed")
//    }
 


}
netWorth(){
    try{
        if(this.isAdmin){
            throw new UnAuthorizeError("Admin Cannot Get Networth")
        }
        let netWorth=0
        for(let index=0;index<this.UserAccount.length;index++){
            if(typeof this.UserAccount[index]=="undefined"){
                continue;
            }
            
           netWorth=netWorth+this.UserAccount[index].balance
        }
        return netWorth;
    }
    catch(error){
        throw error
    }




  
}
getTransactionById(id,from,to)
{
let latestTransaction= this.getUserAccount(id)
// console.log("latestTransaction",latestTransaction);
    

let newTransaction=latestTransaction.getTransaction()
// console.log("newTransaction",newTransaction );

 newTransaction.filter((data)=>{(data.getDate()>=from) && (data.getDate()<=to) })
 return newTransaction

}

}
module.exports=User