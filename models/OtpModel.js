import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    otpCode: {
        type: Number, // Assuming OTP is numeric
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 900, // Set expiration time for OTP (15 minutes)
    },
});

const OTP = mongoose.model('OTP', OTPSchema);

export default OTP;
