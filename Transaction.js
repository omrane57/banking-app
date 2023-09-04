class Transaction{
constructor(date,senderId,recevierId,amount,currentBalance,type){
    this.date=date
    this.sender=senderId
    this.recevierId=recevierId
    this.amount=amount
    this.currentBalance=currentBalance
    this.type=type
}
static newTranscation(date,senderId,recevierId,amount,currentBalance,type){
    return new Transaction(date,senderId,recevierId,amount,currentBalance,type)
}
getDate(){
    return this.date
}
}
module.exports=Transaction