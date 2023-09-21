
import User from "../models/UserModel.js";

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



  

}



export default MainController