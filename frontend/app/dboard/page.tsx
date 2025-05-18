import React from 'react';

function DashboardPage() {

  const features = [
    {
      name: 'Decoder',
      description: 'Decode encrypted messages or files with powerful tools.',
      href: '/decoder',
    },
    {
      name: 'Profile',
      description: 'Manage your account settings and personal information.',
      href: '/profile',
    },
    {
      name: 'Chat',
      description: 'Communicate securely with team members or support.',
      href: '/chat',
    },
    {
      name: 'Scan',
      description: 'Run security scans to detect vulnerabilities or threats.',
      href: '/scan',
    },
    {
      name: 'Request',
      description: 'Catch and analyze HTTP requests for debugging.',
      href: '/request',
    },
    {
      name: 'Lab',
      description: 'Access sandbox environments for testing and research.',
      href: '/lab',
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen py-12 px-4 text-gray-100">
      <h1 className="text-4xl font-bold mb-2 text-center">Welcome to <span className="text-blue-500">Cyburn</span></h1>
      <p className="text-lg text-gray-400 mb-10 text-center">Explore our powerful tools and features below:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {features.map(({ name, description, href }) => (
          <a
            key={name}
            href={'#'}
            className="bg-neutral-900-800 hover:bg-neutral-800 transition-colors rounded-2xl p-6 shadow-md border border-gray-300"
          >
            <h2 className="text-xl font-semibold text-white">{name}</h2>
            <p className="text-sm text-white mt-2">{description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
