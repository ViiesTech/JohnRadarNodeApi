
const User = require("../models/UserModel.js")
const BussnessLocation = require( '../models/BussnessLocationModel.js')
const Ads = require( "../models/AdsModel.js");

class MainController {

    static GetMyData = async (req, res) => {
        try {
            const { id } = req.body;

            // Use await to wait for the User.findById operation to complete
            const userData = await User.findById(id);

            if (userData) {
                res.send({ "Success": true, "UserData": userData });
            } else {
                res.send({ "Success": false, "UserData": "No Data" });
            }

            // This code will never be reached if you have already sent the response
            console.log("User Data:", userData);
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ "Success": false, "UserData": "Error occurred" });
        }
    }

    static RegisterYourLocation = async (req, res) => {

        const { userId, Longtitude, Latitude, BusinessName, PhoneNumber, myEmail } = req.body;

        const existingLocation = await BussnessLocation.findOne({ userId });


        try {

            if (existingLocation) {
                if (existingLocation.Latitude == Latitude && existingLocation.Longtitude == Longtitude) {
                    res.send({ "Success": false, "message": "Your bussiness is already register in that location" })
                } else {
                    res.send({ "Success": false, "message": "Your bussiness is already register in that location" })

                }
            } else {
                if (userId === "" || BusinessName === "" || Longtitude === "" || Latitude === "" || myEmail === "" || BusinessName === "" || PhoneNumber === "") {
                    res.send({
                        "status": "falied",
                        "message": "All fields are required"
                    })
                } else {

                    const CreateAccount = new BussnessLocation({
                        userId: userId,
                        Latitude: Latitude, // Note the corrected field name
                        Longtitude: Longtitude,
                        BussinessName: BusinessName, // Note the corrected field name
                        PhoneNumber: PhoneNumber,
                        UserEmail: myEmail, // Note the corrected field name
                    });

                    await CreateAccount.save();

                    res.send({
                        "Status": "Success",
                        "message": "Account created successfully",
                    });

                }
            }
        } catch (error) {
            if (error.code === 11000) {
                // Duplicate key error
                res.status(400).send({
                    "Status": "Failed",
                    "message": "Email address already exists.",
                });
            } else {
                // Handle other errors if necessary
                console.error(error);
                res.status(500).send({
                    "Status": "Failed",
                    "message": "An error occurred while creating the account.",
                });
            }
        }
    }

    static AdsRegister = async (req, res) => {

        const { BussinessLocationID, BusinessCategory, AdTitle, AdDescription, Longtitude, Latitude, } = req.body;
        try {
            if (BussinessLocationID === "" || BusinessCategory === "" || AdTitle === "" || AdDescription === "" || Longtitude === "" || Latitude === "") {
                res.send({
                    "status": "failed",
                    "message": "All fields are required"
                })
            } else {

                const CreateAd = new Ads({
                    BussinessLocationID: BussinessLocationID,
                    BusinessCategory: BusinessCategory,
                    AdTitle: AdTitle,
                    AdDescription: AdDescription,
                    Longtitude: Longtitude,
                    Latitude: Latitude,

                });

                await CreateAd.save();

                res.send({
                    "Status": "Success",
                    "message": "Ad created successfully",
                });

            }
        } catch (error) {
            // Handle errors, including duplicate key errors if necessary
            console.error(error);
            res.status(500).send({
                "Status": "Failed",
                "message": "An error occurred while creating the ad.",
            });
        }
    }

    static AllAds = async (req, res) => {
        try {
            // Use the Mongoose `find` method to get all ads
            const allAds = await Ads.find({});
    
            if (allAds) {
                res.send({
                    "Success": true,
                    "Ads": allAds,
                });
            } else {
                res.send({
                    "Success": false,
                    "Ads": "No Ads found",
                });
            }
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({
                "Success": false,
                "Ads": "Error occurred",
            });
        }
    }
    

}

module.exports =  MainController