import "./propertyList.css";
import React from "react";
import useFetch from "../hooks/useFetch";
const PropertyList = () => {
  const { data, loading} = useFetch("http://localhost:3000/hotels/countBytype");
  const images=[
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2057&q=80",
    "https://plus.unsplash.com/premium_photo-1664123873407-e2d9a3d65126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    "https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"
  ]
  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {Array.isArray(data) &&
            data.map((item, i) => (
              <div className="pListItem" key ={i}> 
                <img src={images[i]} alt="" className="pListImg"/>
                <div className="pListTitles">
                  <h1>{item.type}</h1>
                  <h2>{item.count} {item.type}</h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
  
};

export default PropertyList;
