import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

import music1 from "../assets/music1.jpg";
import music2 from "../assets/music2.jpg";
import music3 from "../assets/music3.jpg";
import music4 from "../assets/music4.jpg";
import music5 from "../assets/music5.jpg";
import music6 from "../assets/music6.jpg";

function Landing() {

    const [showintro, setshowintro] = useState(true);
    const [introfade, setintrofade] = useState(true);

    const images = [
        music1,
        music2,
        music3,
        music4,
        music5,
        music6
    ];

    const [currentimage, setcurrentimage] = useState(0);
    const [showNext, setshowNext] = useState(false);


    // INTRO FADE
    useEffect(() => {

        const timer = setTimeout(() => {

            setintrofade(false);

            setTimeout(() => {
                setshowintro(false);
            }, 700);

        }, 2500);

        return () => clearTimeout(timer);

    }, []);


    // IMAGE CROSSFADE
    useEffect(() => {

        if (showintro) return;

let timer;
        const interval = setInterval(() => {

            // Next image starts appearing
            setshowNext(true);

            // Wait until fade finishes
             timer = setTimeout(() => {

                setcurrentimage((prev) => {
                    return (prev + 1) % images.length;
                });

                setshowNext(false);

            }, 1000);

        }, 5000);


        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };

    }, [showintro]);


    return (
        <div className="relative min-h-screen">

            <div className="flex flex-col bg-black min-h-screen">

                <section className="relative h-screen bg-black overflow-hidden">

                    {/* Current Image */}
                    <img
                        src={images[currentimage]}
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Next Image */}
                  <img
    src={images[(currentimage + 1) % images.length]}
    className={`absolute inset-0 w-full h-full object-cover ${
        showNext
            ? "opacity-100 transition-opacity duration-1000"
            : "opacity-0 transition-none"
    }`}
/>

                    <Nav />

                </section>

                <Footer />

            </div>


            {/* INTRO */}
            {showintro && (
                <div
                    className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-linear-to-br from-neutral-900 via-neutral-950 to-black transition-opacity duration-1000 ${
                        introfade ? "opacity-100" : "opacity-0"
                    }`}
                >

                    <h1 className="font-bold text-8xl text-transparent bg-clip-text bg-linear-to-r to-mauve-600 via-mauve-500 from-mauve-300">
                        Auralis
                    </h1>

                    <p className="text-2xl font-bold bg-linear-to-r bg-clip-text text-transparent to-mauve-700 via-mauve-600 from-mauve-500">
                        A Space for Creating and Listening
                    </p>

                </div>
            )}

        </div>
    );
}

export default Landing;
