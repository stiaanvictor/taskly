/*
===========================
   REMEMBER:
   USE ZOD FOR VALIDATION
===========================
*/

import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
      <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">
        Login
      </h1>

      <form className="space-y-5">
        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none"
          />
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-2.5 font-medium text-white transition hover:opacity-90"
        >
          Sign In
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="h-px flex-1 bg-gray-200"></div>
        <span className="px-3 text-sm text-gray-500">or</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>

      {/* Google login */}
      <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 transition hover:bg-gray-50">
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.766 12.2765C23.766 11.4607 23.6988 10.6406 23.5557 9.83716H12.24V14.4587H18.8013C18.5287 15.9485 17.6931 17.2671 16.461 18.1054V21.1039H20.3233C22.6235 19.0039 23.766 15.9273 23.766 12.2765Z"
            fill="#4285F4"
          />
          <path
            d="M12.24 24C15.4764 24 18.205 22.938 20.3232 21.1039L16.4609 18.1054C15.3165 18.8853 13.8862 19.3181 12.2399 19.3181C9.10801 19.3181 6.45563 17.196 5.50974 14.3001H1.53369V17.3918C3.70892 21.4436 7.73976 24 12.24 24Z"
            fill="#34A853"
          />
          <path
            d="M5.50983 14.3001C5.00016 12.8103 5.00016 11.1919 5.50983 9.70215V6.61047H1.53378C-0.107412 9.65631 -0.107412 14.3458 1.53378 17.3916L5.50983 14.3001Z"
            fill="#FBBC04"
          />
          <path
            d="M12.24 4.68186C13.9853 4.65326 15.6734 5.31107 16.9409 6.52277L20.4033 3.06042C18.1309 0.924572 15.251 0 12.24 0C7.73976 0 3.70892 2.55656 1.53369 6.60828L5.50973 9.69997C6.45073 6.79998 9.10801 4.68186 12.24 4.68186Z"
            fill="#EA4335"
          />
        </svg>
        Continue with Google
      </button>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default LoginForm;
