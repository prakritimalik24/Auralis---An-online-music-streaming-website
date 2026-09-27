import React from "react";

function FooterArtist () {
    return (
        <footer className="mt-10 flex flex-col border-t-2 border-neutral-600 w-full bg-black">
<div className="flex flex-col gap-5 p-10 text-center items-center flex-1 justify-center">
    <h2 className="text-mauve-300 font-bold text-xl w-1/2">Create. Share. Let Your Music Be Heard</h2>
    <p className="text-mauve-500 text-sm w-1/2">Turn your music into an experience by uploading your tracks, creating albums, and building your own space as an artist. Keep your music organised and make it easy for listeners to discover what you create.</p>
    <p className="text-mauve-500 text-sm w-1/2">From managing your songs and albums to sharing your sound with listeners, everything you need to showcase your music is in one place. Create, upload, and let your music speak for itsel</p>
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

export default FooterArtist;