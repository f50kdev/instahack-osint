import React from "react";

const ProfileCard = ({ profile }) => {
  if (!profile) return null;
  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6 w-full max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <div className="bg-gradient-to-tr from-pink-500 to-yellow-400 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mr-4">
          {profile.name[0]}
        </div>
        <div>
          <div className="text-xl font-semibold">{profile.name}</div>
          <div className="text-gray-400">{profile.user}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-gray-300 mb-4">
        <div>
          <div className="font-bold text-lg">{profile.posts}</div>
          <div className="text-xs">Posts</div>
        </div>
        <div>
          <div className="font-bold text-lg">{profile.followers}</div>
          <div className="text-xs">Seguidores</div>
        </div>
        <div>
          <div className="font-bold text-lg">{profile.following}</div>
          <div className="text-xs">Seguindo</div>
        </div>
        <div>
          <div className="font-bold text-lg">{profile.location}</div>
          <div className="text-xs">Localização</div>
        </div>
      </div>
      <div className="flex justify-between text-sm text-gray-400">
        <div>Fuso horário: <span className="text-gray-200">{profile.timezone}</span></div>
        <div>Pico: <span className="text-gray-200">{profile.activityPeak}</span></div>
      </div>
    </div>
  );
};

export default ProfileCard; 