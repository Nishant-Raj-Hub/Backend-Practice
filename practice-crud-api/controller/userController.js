import User from "../model/userModel.js"


export const create = async (req, res) => {
    try {
        const userData = new User(req.body);

        const {email} = userData;

        const userExist = await User.findOne({email});
        if (userExist) {
            return res.status(400).json({message: "User already exist!"})
        }

        const savedUser = await userData.save();
        res.status(200).json(savedUser);

    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users){
            return res.status(404).json({message: "user not exist!"})
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}


export const updateUser = async (req, res) => {
    try {
        //get id of the user which need to be updated
        const id = req.params.id;

        //weather user exist or not
        const userExist = await User.findOne({_id:id});
        if (!userExist) {
            return res.status(400).json({message: "User not exist!"})
        }

        //update user
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updatedUser);

    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;

        //if user exist or not
        const userExist = await User.findOne({_id:id});
        if(!userExist){
            return res.status(404).json({message: "user not exist!"})
        }

        //delete user
        const deletedUser = await User.findOneAndDelete(id)
        res.status(201).json({message: "User deleted successfully!"})

    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}