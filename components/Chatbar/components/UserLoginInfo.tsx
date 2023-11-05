import React from 'react';

const UserLoginInfo = ({ username='a', avatar='a' }) => {
  return (
    <div className="flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 text-white transition-colors duration-200 hover:bg-gray-500/10">
      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
        {avatar || username.charAt(0)}
      </div>
      <div>{username}</div>
    </div>
  );
};

export default UserLoginInfo;
