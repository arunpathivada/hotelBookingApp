import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
export const CreateRoom =async(req,res,next)=>{
    const hotelId= req.params.hotelId;
    const newRoom = new Room(req.body);
    try{
        const savedRoom = await newRoom.save();
        await Hotel.findByIdAndUpdate(hotelId,{$push:{rooms:savedRoom._id}});
        res.status(200).json(savedRoom);
    }catch(err){
        next(err);
    }
}
export const UpdateRoom = async(req,res,next)=>{
    try{
        const updatedRoom= await Room.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
        res.status(200).json(updatedRoom);
    }
    catch(err){
        next(err);
    }
}
export const DeleteRoom = async(req,res,next)=>{
    const hotelId= req.params.hotelId;
    try{
        await Room.findByIdAndDelete(req.params.id);
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id}});
        }
        catch(err){
            next(err);
        }
        res.status(200).json("Room has been deleted");
    }catch(err){
        next(err);
    }
}

export const GetRoom = async(req,res,next)=>{
    try{
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    }
    catch(err){
        next(err);
    }
}

export const GetAllRooms = async(req,res,next)=>{
    try{
        const users = await Room.find();
        res.status(200).json(users);
    }
    catch(err){
        next(err);
    }
}

