import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  image: {type: String, default: "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png"},
  phone: {type: String, default: '0000000000'},
  address: {type: Object, default: {line1: "", line2: ""}},
  gender: {type: String, default: "Not Selected"
  },
  dateOfBirth: {type: String, default: "yyyy-MM-dd"},
});

const userModel = mongoose.models.User || mongoose.model('User', userSchema);
export default userModel;