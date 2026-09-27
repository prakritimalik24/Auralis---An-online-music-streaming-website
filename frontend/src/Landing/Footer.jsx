import React from "react";

function Footer () {
    return (
        <footer className=" flex flex-col border-t-2 border-neutral-600 w-full bg-black">
<div className="flex flex-col gap-5 p-10 text-center items-center flex-1 justify-center">
    <h2 className="text-mauve-300 font-bold text-xl w-1/2">Made for those who listen. Built for those who create.</h2>
    <p className="text-mauve-500 text-sm w-1/2 ">Be a listener and discover music that fits your mood, your moment, and your taste. Explore songs, artists, and albums, build playlists around what you love, and keep finding something new every time you press play.</p>
    <p className="text-mauve-500 text-sm w-1/2  ">Be an artist and bring your sound to life and give it a place to be heard. Upload your music, create albums, and build your presence on Auralis while connecting your creations with listeners looking for their next favourite sound.</p>
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

export default Footer;