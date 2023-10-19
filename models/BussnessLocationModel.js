import mongoose from "mongoose";

const BusinessSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    Latitude: {
      type: String,
      required: true,
    },
    Longtitude: {
      type: String,
      required: true,
    },
    BussinessName: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    UserEmail: {
      type: String,
      required: true,
    },
  });
  

const BusinessLocation = mongoose.model("BusinessLocation", BusinessSchema);

export default BusinessLocation;
