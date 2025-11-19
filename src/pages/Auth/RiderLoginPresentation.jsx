import { Link } from "react-router-dom";

function RiderLoginPresentation({ handleFormSubmit, handleUserInput }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-wrap items-center h-screen px-10 py-6 mx-auto">
        <div className="hidden p-0 lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 md:block">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
            alt="Rider illustration"
            className="w-4/5 mx-auto"
          />
        </div>

        <form
          className="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2 md:ml-auto md:mt-0"
          onSubmit={handleFormSubmit}
        >
          <h2 className="mb-5 text-lg font-medium text-gray-900 title-font">
            Rider Login
          </h2>

          <div className="relative mb-4">
            <label
              htmlFor="email"
              className="text-sm leading-7 text-gray-600"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={handleUserInput}
              required
              placeholder="rider@example.com"
              className="w-full px-3 py-1 mt-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="text-sm leading-7 text-gray-600"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleUserInput}
              required
              placeholder="Enter your password"
              className="w-full px-3 py-1 mt-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            />
          </div>

          <button
            type="submit"
            className="w-full px-8 py-2 text-lg text-white bg-yellow-500 border-0 rounded focus:outline-none hover:bg-yellow-600"
          >
            Sign In
          </button>

          <p className="mt-3 text-xs text-gray-500">
            Don’t have an account?{" "}
            <Link to="/rider/signup" className="text-yellow-500">
              Register
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default RiderLoginPresentation;
