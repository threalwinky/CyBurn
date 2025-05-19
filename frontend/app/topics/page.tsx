import React from 'react'

function Topics() {

    const newsItems = [
        {
            title: "Zero-Day Vulnerability Discovered in Major VPN Software",
            tags: ["New", "Professional", "Community"],
            description:
                "A critical zero-day flaw has been identified in a widely used VPN platform, potentially exposing user data. Patches are underway, but users are advised to take immediate precautions.",
            linkText: "Read more",
        },
        {
            title: "Ransomware Attacks Surge Globally",
            tags: ["Professional", "Community"],
            description:
                "Cybersecurity analysts report a 40% rise in ransomware incidents this quarter. The attacks target public infrastructure and healthcare systems, urging tighter cyber defense measures.",
            linkText: "Learn more",
        },
        {
            title: "Join the Global Cyber Defense Network",
            tags: ["Professional"],
            description:
                "Connect with cybersecurity experts and enthusiasts in our new global community. Share insights, access exclusive tools, and participate in live threat simulations.",
            linkText: "Join now",
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white p-10">
            <h1 className="text-4xl font-bold mb-10">Latest topics</h1>
            <div className="grid md:grid-cols-3 gap-6">
                {newsItems.map((item, index) => (
                    <div key={index} className="transition-colors border border-gray-300 text-white rounded-2xl shadow-xl p-6">
                        <div className="flex gap-2 mb-4">
                            {item.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className={`text-xs px-2 py-1 rounded-full font-semibold ${tag === "New"
                                        ? "bg-green-500 text-white"
                                        : tag === "Professional"
                                            ? "bg-red-600 text-white"
                                            : "bg-yellow-600 text-white"
                                        }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                        <p className="text-sm mb-4">{item.description}</p>
                        <a href="#" className="text-blue-500 font-bold text-sm hover:underline">
                            {item.linkText} →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Topics