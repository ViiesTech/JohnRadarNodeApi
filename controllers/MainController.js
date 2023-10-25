
import User from "../models/UserModel.js";
import BussnessLocation from '../models/BussnessLocationModel.js'
import Ads from "../models/AdsModel.js";

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
        try {
            if (userId === "" || BussnessLocation === "" || myEmail === "" || BusinessName === "" || PhoneNumber === "") {
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

        const { BussinessLocationID, BusinessCategory, AdTitle, AdDescription } = req.body;
        try {
            if (BussinessLocationID === "" || BusinessCategory === "" || AdTitle === "" || AdDescription === "") {
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
}

export default MainController