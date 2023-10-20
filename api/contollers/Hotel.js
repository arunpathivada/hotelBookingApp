import Hotel from "../models/Hotel.js";
export const CreateHotel = async (req,res,next)=>{
    const newHotel= new Hotel(req.body)
    try{
        const savedHotel= await newHotel.save();
        res.status(200).json(savedHotel)
    }
    catch(err){
        next(err);
    }
}

export const UpdateHotel = async(req,res,next)=>{
    try{
        const updatedhotel= await Hotel.findByIdAndUpdate(req.params.id,{$set: req.body},{new:true});
        res.status(200).json(updatedhotel);
    }
    catch(err){
        next(err);
    }
}
export const DeleteHotel = async(req,res,next)=>{
    try{
        const deletedHotel=await Hotel.findByIdAndDelete(req.params.id,{new:true});
        if(!deletedHotel){
            res.status(404).json("hotel not found");
        }
        res.status(200).json("hotel deleted successfully")
    }
    catch(err){
        next(err);
    }
}

export const GetHotel = async(req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }
    catch(err){
        next(err);
    }
}

export const GetAllHotels = async(req, res, next) => {
    try {
        const { min = 10, max = 200, ...Others} = req.query; // Include city in destructuring
        const featured = req.query.featured;
        const lim = parseInt(req.query.limit) || 10;

        const hotels = await Hotel.find({
            ...Others,
            cheapestPrice: { $gt: min ||10, $lt: max||200 }
        }).limit(lim);
        console.log(hotels);
        res.status(200).json(hotels);
    } catch (err) {
        next(err);
    }
}

export const countBycity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

export const countBytype = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    console.log(err)
    next(err);
  }
};


