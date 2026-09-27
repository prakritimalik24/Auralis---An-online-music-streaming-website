import React from "react";

function FooterUser () {
    return (
        <footer className="mt-10 flex flex-col border-t-2 border-neutral-600 w-full bg-black">
<div className="flex flex-col gap-5 p-10 text-center items-center flex-1 justify-center">
    <h2 className="text-mauve-300 font-bold text-xl w-1/2">Your music, your mood, your moment</h2>
    <p className="text-mauve-500 text-sm w-1/2 ">Discover music that fits every mood, from popular tracks and fresh sounds to artists and albums waiting to be explored. Whether you already know what you want to hear or just want to press play and let the music flow, everything is right here</p>
    <p className="text-mauve-500 text-sm w-1/2  ">Build your own collection with favourites, playlists, and recently played tracks, while exploring music from both our platform and Jamendo. Your next favourite song might be just one play away.</p>
</div>
<div className="flex border-t-2 border-neutral-600 gap-8 justify-center text-center items-center p-4 text-gray-400">
<span className="font-semibold hover:text-white cursor-pointer">About</span>
<span className="font-semibold hover:text-white cursor-pointer">Terms & Conditions</span>
<span className="font-semibold hover:text-white cursor-pointer">Privacy Policy</span>
<span className="font-semibold hover:text-white cursor-pointer">Contact</span>

</div>
        </footer>
    )
}

export default FooterUser;