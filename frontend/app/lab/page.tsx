"use client";
import React, { useState, useRef } from 'react';

function Lab() {
    const labs = [
        {
            name: "Scavenger Hunt",
            description: "Find the flag and submit it.",
            link: "8081",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK69dmyZKSg6jUVrxR5sFuAzjS9m5jPJVm1LkCCn6FlwV893lHaL87NXNWih3O-d4YG0A&usqp=CAU",
            score: 500,
            flag: "flag{n1c3_7ry_y0u_f0und_7h3_fl46}",
        },
        {
            name: "Find Hidden Files",
            description: "Find hidden files in a directory.",
            link: "8082",
            image: "https://mlfk3cv5yvnx.i.optimole.com/cb:HA53.300ea/w:930/h:485/q:mauto/f:best/https://www.ninjaone.com/wp-content/uploads/elementor/thumbs/How-to-Show-Hidden-Files-in-Windows-11-A-Complete-Guide-qvjtaq0fhxhzkuuel3xr3mwst5thvoor3jjybjtboy.png",
            score: 500,
            flag: "flag{hidden_files}",
        },
        {
            name: "Test Lab",
            description: "Test lab description goes here.",
            link: "#",
            image: "https://i1.sndcdn.com/artworks-000137749625-j45nxb-t1080x1080.jpg",
            score: 500,
            flag: "flag{test_lab}",
        },
    ];

    const [selectedLab, setSelectedLab] = useState<null | typeof labs[0]>(null);
    const [flag, setFlag] = useState('');
    const modalRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setSelectedLab(null);
            setFlag('');
        }
    };

    const handleSubmit = () => {
        if (flag.trim() === selectedLab?.flag) {
            alert("✅ Correct flag!");
        } else {
            alert("❌ Incorrect flag!");
        }
        setFlag('');
    };

    return (
        <div className="flex flex-col items-center justify-center w-[75%]">
            <h1 className="text-3xl font-bold text-gray-300 mb-10">Labs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
                {labs.map((lab, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedLab(lab)}
                        className=" text-white w-full text-center hover:bg-neutral-800 cursor-pointer transition-colors rounded-2xl p-6 shadow-md border border-gray-300"
                    >
                        <h2 className="text-lg font-semibold">{lab.name}</h2>
                        <p className="text-sm text-gray-400 mt-2">{lab.score} pts</p>
                    </button>
                ))}
            </div>

            {/* Modal */}
            {selectedLab && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center"
                    onClick={handleOverlayClick}
                >
                    <div
                        ref={modalRef}
                        className="bg-[#1e1e1e] text-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-2 right-3 text-xl text-gray-300 hover:text-white"
                            onClick={() => {
                                setSelectedLab(null);
                                setFlag('');
                            }}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedLab.name}</h2>
                        <img
                            src={selectedLab.image}
                            alt={selectedLab.name}
                            className="w-full rounded mb-4"
                        />
                        <p className="text-gray-300 mb-2">{selectedLab.description}</p>
                        <p className="text-gray-400 mb-4">Score: {selectedLab.score}</p>
                        <a
                            href={ process.env.NEXT_PUBLIC_URL +  `:${selectedLab.link}`}
                            className="inline-block px-4 py-2 bg-gray-300 text-black rounded transition mb-4"
                        >
                            Go to lab →
                        </a>

                        {/* Flag input */}
                        <div className="mt-4">
                            <input
                                type="text"
                                value={flag}
                                onChange={(e) => setFlag(e.target.value)}
                                placeholder="Enter flag here"
                                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 placeholder-gray-500"
                            />
                            <button
                                onClick={handleSubmit}
                                className="mt-3 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                            >
                                Submit Flag
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Lab;
