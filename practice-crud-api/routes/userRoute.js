import express from "express";
import { create, getAllUsers, updateUser, deleteUser } from "../controller/userController.js";

const route = express.Router()

route.post('/create', create);
route.get('/getAllUsers', getAllUsers);
route.patch('/updateUser/:id', updateUser);
route.delete('/deleteUser/:id', deleteUser);

export default route;