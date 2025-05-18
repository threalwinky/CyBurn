"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import md5 from "crypto-js/md5";

function RequestCatcher() {
  const [logs, setLogs] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  // Load username safely on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = sessionStorage.getItem("username");
      setUsername(storedUsername);
    }
  }, []);

  const handleLogging = async () => {
    if (!username) return;
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inspect/${md5(username)}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        console.log("Fetched logs");
        setLogs(res.data);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching logs");
    }
  };

  useEffect(() => {
    if (!username) return;
    handleLogging();
    const interval = setInterval(() => handleLogging(), 5000);
    return () => clearInterval(interval);
  }, [username]);

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center w-[90%] max-w-4xl mx-auto">
        <p className="text-gray-400">Loading username...</p>
      </div>
    );
  }

  const webhookUrl = `${process.env.NEXT_PUBLIC_API_URL}/webhook/${md5(username)}`;

  return (
    <div className="flex flex-col items-center justify-center w-[90%] max-w-4xl mx-auto">
      <div className="flex items-center justify-center w-full mb-8">
        <h1 className="text-3xl font-bold text-gray-300">
          Webhook Request Catcher
        </h1>
      </div>

      <div className="mb-6 text-center">
        <p className="text-gray-400">Use this URL to catch webhook requests:</p>
        <a href={webhookUrl} className="text-blue-400 underline break-all">
          {webhookUrl}
        </a>
      </div>

      <div className="w-full space-y-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className="w-full border border-gray-300 rounded-md bg-neutral-900 text-gray-200 overflow-auto p-4"
          >
            <p className="text-sm text-gray-400 mb-2">Request #{index + 1}</p>

            <div className="mb-2">
              <p className="font-semibold text-sm text-blue-300">URL:</p>
              <pre className="whitespace-pre-wrap break-words text-blue-400">
                {log.full_url}
              </pre>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-sm text-blue-300">Method:</p>
              <pre>{log.method}</pre>
            </div>

            <div className="mb-2">
              <p className="font-semibold text-sm text-blue-300">Sender IP:</p>
              <pre>{log.remote_addr}</pre>
            </div>

            {log.json && (
              <div className="mb-2">
                <p className="font-semibold text-sm text-blue-300">JSON Body:</p>
                <pre className="whitespace-pre-wrap break-words">
                  {JSON.stringify(log.json, null, 2)}
                </pre>
              </div>
            )}

            {log.form && Object.keys(log.form).length > 0 && (
              <div className="mb-2">
                <p className="font-semibold text-sm text-blue-300">Form Data:</p>
                <pre className="whitespace-pre-wrap break-words">
                  {JSON.stringify(log.form, null, 2)}
                </pre>
              </div>
            )}

            <div className="mb-2">
              <p className="font-semibold text-sm text-blue-300">Headers:</p>
              <pre className="whitespace-pre-wrap break-words">
                {JSON.stringify(log.headers, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RequestCatcher;
