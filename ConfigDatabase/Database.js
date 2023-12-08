const mongoose  = require("mongoose");



const ConnectDataBase = () => {

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://visstechapps:qL5Df46pN91hAu97@viistech.r6nztgu.mongodb.net/JohnRadar');
const db = mongoose.connection;
db.on("error",(error)=>console.log(error));
db.once("open",()=>console.log("DB Connected"));

}
{}
module.exports = ConnectDataBase