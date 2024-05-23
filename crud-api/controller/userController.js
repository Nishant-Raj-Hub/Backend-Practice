import User from "../model/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);

    const { email } = userData;
    //find user in User
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist!" });
    }

    //if user didn't exist
    const savedUser = await userData.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    //if no user exist
    if (users.length === 0) {
      return res.status(404).json({ message: "Users not exist" });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};


export const update = async (req, res) => {
  try {
    const id = req.params.id;

    //check if user exist
    const userExist = await User.findOne({_id:id})
    if(!userExist){
      return res.status(404).json({ message: "User not exist"})
    }

    //If user exist then update user
    const updateUser = await User.findByIdAndUpdate(id, req.body, {new:true})
    res.status(201).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error."})
  }
}


export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    //check if id exist or not
    const userExist = await User.findOne({_id:id});
    if(!userExist){
      return res.status(404).json({ message: "User not exist" })
    }

    //if user exist
    await User.findByIdAndDelete(id);
    res.status(201).json({ message: "User deleted successfully"});
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server error"})
  }
}