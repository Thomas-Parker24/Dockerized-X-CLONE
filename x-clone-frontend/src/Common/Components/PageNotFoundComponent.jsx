import { Link } from 'react-router-dom';

export const PageNotFoundComponent = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-[rgb(65,65,66)]">
        <div className="w-1/5 bg-black rounded-3xl  flex flex-col items-center justify-center">
          <img src="/PageNotFound.png" className="size-72" />
          <div className="border-2 border-b-white rounded-full w-3/4 mb-4"></div>
          <p className="text-white font-extrabold text-xl mb-4">
            We couldn't find this site
          </p>
          <Link
            to="feed"
            className="bg-white mt-2 rounded-full w-3/4 h-8 font-semibold hover:bg-gray-200 mb-6 text-center"
          >
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};
