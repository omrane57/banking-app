const User = require("./User")
const Bank=require("./Bank")
let admin1=User.newAdmin("Om",21,"M")
let user1=admin1.newUser("Akshay",21,"M")
let user2=admin1.newUser("yash",30,"M")

let Bank1=admin1.createNewBank("State Bank Of India")
let Bank2=admin1.createNewBank("Bank Of Baroda")
let Bank3=admin1.createNewBank("HDFC Bank")
let Bank4=admin1.createNewBank("Axis Bank")


admin1.updateBank(1,"name","Bank Of Maharashtra")
user1.createUserAccount(0,2000)
user1.createUserAccount(0,2000)
user2.createUserAccount(0,2000)
user2.createUserAccount(0,2000)

// user1.createUserAccount(1,1000)
user1.depositAmount(0,1000)
user1.withDrawAmount(0,10)
// console.log(user1)
// console.log(user2)
// user2.depositAmount(2,1000)
user1.transferAmount(0,2,2,10)
// console.log(user1)
// console.log(user2)
// console.log(admin1.getALLBank())
// console.log(user2.netWorth())
// let r=Bank1.particularBankNetWorth()
// let date=user2.getTransactionById(3)[0].date
// let dateComplete=new Date("2023-8-20")
// let year
// let month
// let date
// let formatedDate
// let newArray=[]
// let array=[new Date("2023-8-20"),new Date("2023-8-21"),new Date("2023-8-22"),new Date("2023-8-23"),new Date("2023-8-24")]
// for(let i=0;i<array.length;i++){
//  year=array[i].getFullYear()
//  month=array[i].getMonth()+1
//  date=array[i].getDate()
//  formatedDate=`${year}-${month<10?0:""}${month}-${date}`
//  newArray.push(formatedDate)
// }

// function getDates(from,to){
// return newArray.filter((d)=>(d>=from)&&(d<=to))
// }
// console.log(getDates("2023-08-21","2023-08-23"))
// console.log(user1.UserAccount[0].transaction.getDate())
// console.log(user1.getTransactionById(0,'4/9/2023','5/9/2023'))
console.log(Bank1.getAccounts())