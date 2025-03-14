import { BiDotsHorizontalRounded } from 'react-icons/bi';

export const TrendComponent = ({ Title, Header, Information, trends }) => {
  return (
    <div className="w-full ml-4 mt-6">
      <div className="flex">
        <p className="flex-1 text-xs text-gray-500"> {Header} </p>
        <BiDotsHorizontalRounded className="mr-8 cursor-pointer" />
      </div>
      <p className="font-extrabold"> {Title} </p>
      <div className="flex space-x-2">
        <p className="text-xs text-gray-500"> {Information} </p>
        <p className="text-xs text-blue-500 cursor-pointer"> {trends} </p>
      </div>
    </div>
  );
};
