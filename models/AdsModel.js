import mongoose from "mongoose";

const AdsSchema = new mongoose.Schema({
    BussinessLocationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BusinessLocation', // Reference to the User model
        required: true,
    },
    BusinessCategory : {
        type: String,
        required: true
    },
    AdTitle : {
        type: String,
        required: true
    },
    AdDescription : {
        type: String,
        required: true
    },

})

const Ads = new mongoose.Model({"Ads" : AdsSchema})

export default Ads