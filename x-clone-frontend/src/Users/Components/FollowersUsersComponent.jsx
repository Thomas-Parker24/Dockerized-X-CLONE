import { useContext, useEffect, useState } from 'react';
import { LogInContext } from '../../LogIn/Context';
import { GetFollowers } from '../Controller';
import { LoadingComponent } from '../../Common/Components';
import { toast } from 'sonner';
import { FollowUser } from '../Controller';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const FollowersUsersComponent = ({ UpdateParentFunction }) => {
  const { User } = useContext(LogInContext);
  const [IsGettingData, SetIsGettingData] = useState(true);
  const [Users, SetUsers] = useState([]);
  const { userName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    SetIsGettingData(true);
    GetFollowers(User, userName)
      .then((result) => {
        SetUsers(result.data);
      })
      .finally(() => {
        SetIsGettingData(false);
      });
  }, [userName]);

  const OnFollow = async (UsetUIDToFollow) => {
    const result = await FollowUser(User, UsetUIDToFollow);

    if (result.ok) {
      const TargetUserIndex = Users.findIndex((U) => U.uid === UsetUIDToFollow);
      const UsersList = [...Users];
      UsersList[TargetUserIndex].AlreadyFollowUser = true;
      SetUsers(UsersList);
      UpdateParentFunction();
      toast.success('User followed!');
    } else {
      toast.error('User followed failed.');
    }
  };

  return (
    <div className="min-w-lg bg-black text-white">
      {IsGettingData ? (
        <LoadingComponent />
      ) : Users.length === 0 ? (
        <>
          <div className="flex flex-col justify-center items-center mt-4">
            <p className="font-bold hover:underline">
              No one follow this user yet
            </p>
            <img src="/SadFace.png" className="size-48" />
          </div>
        </>
      ) : (
        <>
          {Users.map((user, index) => (
            <div
              key={index}
              className="flex items-start p-4 hover:bg-gray-900 border-b border-gray-800"
            >
              <img
                src={user.photo}
                alt={`${user.userName} avatar`}
                className="w-12 h-12 rounded-full mr-3 cursor-pointer"
                onClick={() => {
                  navigate(`/profile/${user?.userName}`, {
                    replace: true,
                  });
                }}
              />
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="font-bold hover:underline">
                      {user.name}
                    </span>
                  </div>
                  {!user?.AlreadyFollowUser ? (
                    <>
                      <button
                        className="px-4 py-1 text-sm font-bold text-black bg-white rounded-full transition-colors duration-300 hover:bg-blue-500 hover:text-white"
                        onClick={() => {
                          OnFollow(user.uid);
                        }}
                      >
                        Follow
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="text-gray-500">@{user.userName}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
