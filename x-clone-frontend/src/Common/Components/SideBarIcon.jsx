export const SidebarIcon = ({ Icon, text }) => (
  <div className="flex items-center p-2 hover:bg-gray-800 rounded-full cursor-pointer group">
    <Icon className="h-7 min-w-7 text-white group-hover:text-blue-400" />
    <span className="hidden xl:inline text-white group-hover:text-blue-400">
      {text}
    </span>
  </div>
);
