const {ValidationError,UnAuthorizeError,NotFoundError }=require("./error/Index")


class Bank
{
static bankId=0;
static allBanks=[]
    constructor(id,name,abbrevation){
        this.id=id
        this.name=name,
        this.abbrevation=abbrevation
        this.accounts=[];
    }
    static newBank(name){
        try{
            if(typeof name!="string"){
              throw new Error("Invalid Name")
            }
          }
          catch(error){
            return error
          }
          let abbrevation=name.split(" ");
let finalAbbrevation=""
for(let index =0;index<abbrevation.length;index++){
    finalAbbrevation=finalAbbrevation+abbrevation[index][0]

}
return new Bank(Bank.bankId++,name,finalAbbrevation)
          
    }
    updateAbbrevation(newValue){
        let abbrevation=newValue.split(" ");
        let finalAbbrevation=""
for(let index =0;index<abbrevation.length;index++){
    finalAbbrevation=finalAbbrevation+abbrevation[index][0]

}
this.abbrevation=finalAbbrevation;

    }
    updateBankName(newValue){
        this.name=newValue;
        this.updateAbbrevation(newValue)
    }
    updateBank(parameter,newValue){
        try{
            if(typeof parameter!="string"){
                throw new ValidationError("Invalid Parameter")
            }
            if(typeof newValue!="string"){
                throw new ValidationError("Invalid Parameter")
            }
        }
        catch(error){
            throw error
        }
        switch(parameter){
            case "name":{
                return this.updateBankName(newValue)
            }
            default :{console.log("not a valid parameter to update")
                     break}
        }
    }
     getBankId(){
        return this.id
     } 
     getBankName(){
        return this.name
     }
     pushBank(){
    
        Bank.allBanks.push(this)
     }
   static  getBankDetails(id){
        for(let index=0;index<Bank.allBanks.length;index++){
            if(Bank.allBanks[index].id==id){
                return Bank.allBanks[index]
            }
        }
        return null
     }
   static bankNetWorth(id){
        try{
            if(typeof id!="number"){
                throw new ValidationError("Invalid parameter")
            }
            let newBankDetails=Bank.getBankDetails(id)
            if(newBankDetails==null){
                throw new NotFoundError("Bank Not Found")
            }
            let netWorth=0
            for(let index=0;index<newBankDetails.accounts.length;index++){
                if(typeof newBankDetails.accounts[index]=="undefined"){
                    continue;
                }
                
               netWorth=netWorth+newBankDetails.accounts[index].balance
            }
            return netWorth;
        }
        catch(error){
            return error
        }

    }
    particularBankNetWorth(){
        let netWorth=0;
        for(let index=0;index<this.accounts.length;index++){
            if(typeof this.accounts[index]=="undefined"){
                continue;
            }
            
           netWorth=netWorth+this.accounts[index].balance
        }
        return netWorth;
    }
    getAccounts(){
        return this.accounts
    }
    
}
module.exports=Bank;