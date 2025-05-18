import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-4xl font-bold tracking-wide">Welcome to <span className="text-white underline">CyBurn</span></h1>
        <img src="https://img.freepik.com/premium-vector/white-c-logo-with-black-background_853558-5404.jpg?w=360" />
        <div className="flex flex-col space-y-4 w-40">
          <Link
            href="/register"
            className="bg-white text-black text-center py-2 px-4 rounded-lg font-semibold hover:bg-gray-200 transition duration-200"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="border border-white text-white text-center py-2 px-4 rounded-lg font-semibold hover:bg-white hover:text-black transition duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
