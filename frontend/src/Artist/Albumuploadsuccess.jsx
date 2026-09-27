import React from "react";

function Albumploadsuccess({onClose}) {
    return(
<div className="inset-0 bg-mauve-600 z-50 rounded-xl text-center flex flex-col gap-7 items-center top-20 left-140 justify-center fixed w-100 h-50 text-white transition-opacity duration-700">
    <h1 className="text-xl font-bold">Album uploaded successfully !</h1>
    <button 
    onClick={onClose}
    className="bg-white text-mauve-600 font-bold hover:scale-108  text-[15px] hover:border-2  p-3 cursor-pointer transition-all duration-200 rounded-full  px-7 ">OK</button>
</div>
    )
}

export default Albumploadsuccess;