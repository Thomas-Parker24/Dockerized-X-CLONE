import { useContext } from 'react';
import { LogInContext } from '../Context/LogInContext';
import { useNavigate } from 'react-router-dom';
import { LogOutUser } from '../Controller';

export const LogOutComponent = () => {
  const { LogOut, User } = useContext(LogInContext);
  const navigate = useNavigate();

  const OnCancel = () => {
    navigate('/feed', { replace: true });
  };

  const OnLogOut = async () => {
    const result = await LogOutUser(User);

    if (result.ok) {
      LogOut();
      navigate('/LogIn', { replace: true });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[rgb(65,65,66)] flex items-center justify-center">
        <div className="w-1/5 bg-black rounded-3xl  flex flex-col items-center justify-center">
          <img src="mainLogo.svg" className="size-20 mb-2 mt-4" />
          <div className="border-2 border-b-white rounded-full w-2/4 mb-4"></div>
          <div className="flex- flex-col items-start ">
            <p className="text-white font-semibold text-xl mt-2 mb-4 ml-6">
              Log out of X?
            </p>
            <p className="text-gray-400 text-base mb-4 ml-6 mr-6">
              You can always log back in at any time. If you just want to switch
              accounts, you can do that by adding an existing account.
            </p>
          </div>
          <button
            className="bg-white mt-2 rounded-full w-3/4 h-8 font-semibold hover:bg-gray-200"
            onClick={OnLogOut}
          >
            Log out
          </button>
          <button
            className="bg-black mt-4 mb-6 rounded-full w-3/4 h-8 border-solid border-2 border-gray-500 font-semibold hover:bg-gray-900 text-white"
            onClick={OnCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};
