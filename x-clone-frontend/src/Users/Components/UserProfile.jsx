import { FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { useContext, useEffect, useState } from 'react';
import { FollowUser, getUserByUserName, UnfollowUser } from '../Controller';
import { LogInContext } from '../../LogIn/Context';
import { LoadingComponent } from '../../Common/Components';
import { FollowersUsersComponent, FollowedUsersComponent } from './';
import { useParams, useNavigate } from 'react-router-dom';
import { PostsByUser } from '../../Posts/Components';
import { PostsContext } from '../../Posts/Context';
import { toast } from 'sonner';

const TabsDictionary = {
  Posts: 'Posts',
  Followers: 'Followers',
  Following: 'Following',
};

export const UserProfile = () => {
  const { User, UserName } = useContext(LogInContext);
  const { ClearPostsCreatedByUser } = useContext(PostsContext);
  const [CurrentUser, SetCurrentUser] = useState();
  const [IsGettingData, SetIsGettingData] = useState(true);
  const [CurrentTabSelected, SetCurrentTabSelected] = useState(
    TabsDictionary.Posts
  );
  const { userName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    ClearPostsCreatedByUser();
    SetIsGettingData(true);
    getUserByUserName(User, userName)
      .then((response) => {
        SetCurrentUser(response.data.data);
      })
      .catch(() => {
        navigate('notFound', { replace: true });
      })
      .finally(() => {
        SetIsGettingData(false);
      });
  }, [userName]);

  function IncreaseByOneFollowedCount() {
    CurrentUser.followed += 1;
  }

  function DecreaseByOneFollowedCount() {
    CurrentUser.followed -= 1;
  }

  function GetCurrentViewByTab(SelectedTab) {
    switch (SelectedTab) {
      case TabsDictionary.Posts:
        return <PostsByUser />;

      case TabsDictionary.Following:
        return (
          <FollowedUsersComponent
            UpdateParentFunction={DecreaseByOneFollowedCount}
          />
        );

      case TabsDictionary.Followers:
        return (
          <FollowersUsersComponent
            UpdateParentFunction={IncreaseByOneFollowedCount}
          />
        );
    }
  }

  async function OnFollow() {
    const result = await FollowUser(User, CurrentUser.uid);

    if (result.ok) {
      const CurrentUserModified = {
        ...CurrentUser,
        CurrentUserFollowUser: true,
      };
      SetCurrentUser(CurrentUserModified);
      toast.success('You follow this user now!');
    } else {
      toast.error('An error ocurred!');
    }
  }
  async function OnUnfollow() {
    const result = await UnfollowUser(User, CurrentUser.uid);

    if (result.ok) {
      const CurrentUserModified = {
        ...CurrentUser,
        CurrentUserFollowUser: false,
      };
      SetCurrentUser(CurrentUserModified);
      toast.success("You don't follow this user now!");
    } else {
      toast.error('An error ocurred!');
    }
  }

  return (
    <div className=" bg-black text-white w-[634px]">
      {IsGettingData ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="h-48 bg-gray-800 relative">
            <img
              src={CurrentUser?.photo}
              alt={`${CurrentUser?.Name}'s profile`}
              className="absolute bottom-0 left-4 transform translate-y-1/2 w-32 h-32 rounded-full border-4 border-black"
            />
          </div>
          <div className="flex justify-end p-4">
            {CurrentUser?.userName === UserName ? (
              <>
                <div className="mb-6 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-800"></div>
              </>
            ) : CurrentUser?.CurrentUserFollowUser ? (
              <>
                <>
                  <button
                    className="px-4 py-2 text-sm font-bold text-black bg-white rounded-full transition-colors duration-300 hover:bg-blue-500 hover:text-white"
                    onClick={OnUnfollow}
                  >
                    Unfollow
                  </button>
                </>
              </>
            ) : (
              <>
                <button
                  className="px-4 py-2 text-sm font-bold text-black bg-white rounded-full transition-colors duration-300 hover:bg-blue-500 hover:text-white"
                  onClick={OnFollow}
                >
                  Follow
                </button>
              </>
            )}
          </div>
          <div className="p-4">
            <h1 className="font-bold text-xl flex items-center">
              {CurrentUser?.Name}
              {CurrentUser?.verified && (
                <FaCheckCircle className="text-blue-400 ml-1" />
              )}
            </h1>
            <p className="text-gray-500">@{CurrentUser?.userName}</p>
            <div className="flex items-center mt-2 text-gray-500">
              <FaCalendarAlt className="mr-2" />
              <span>Joined {CurrentUser?.CreatedAt}</span>
            </div>
            <div className="flex mt-2">
              <span className="mr-4">
                <strong>{CurrentUser?.followed}</strong> Following
              </span>
              <span>
                <strong>{CurrentUser?.followers}</strong> Followers
              </span>
            </div>
          </div>
          <div className="flex border-b border-gray-800">
            {[
              TabsDictionary.Posts,
              TabsDictionary.Following,
              TabsDictionary.Followers,
            ].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-4 hover:bg-gray-800 ${
                  CurrentTabSelected === tab
                    ? 'border-b-2 border-blue-400 font-bold'
                    : 'text-gray-500'
                }`}
                onClick={() => {
                  SetCurrentTabSelected(tab);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          {GetCurrentViewByTab(CurrentTabSelected)}
        </>
      )}
    </div>
  );
};
