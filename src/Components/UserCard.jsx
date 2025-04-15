import React from 'react';

const UserCard = ({ user }) => {
  if (!user) return null;
  
  const { firstName, lastName, age, gender, photoUrl, about, skills } = user;

  // Convert the skills array into a single comma-separated string.
  const skillsString = Array.isArray(skills) ? skills.join(", ") : skills;

  return (
    <div className="card bg-inherit w-full max-w-xs sm:max-w-sm md:max-w-md shadow-lg border border-gray-700 rounded-3xl overflow-hidden">
      <figure className="px-6 sm:px-10 pt-6 sm:pt-10">
        <img
          src={photoUrl}
          alt="profile-pic"
          className="rounded-xl object-cover h-36 w-36 sm:h-48 sm:w-48"
        />
      </figure>
      <div className="card-body items-center text-center text-white p-4 sm:p-6">
        <h2 className="card-title text-xl sm:text-2xl font-bold">
          {firstName} {lastName}
        </h2>
        <p className="text-xs sm:text-sm">
          {age} yrs{gender && ` (${gender})`}
        </p>
        <p className="my-1 sm:my-2 text-sm sm:text-base">{about}</p>
        {/* Display skills as a comma-separated string */}
        <p className="text-xs sm:text-sm italic">{skillsString}</p>
        <div className="card-actions mt-3 sm:mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full">
          <button className="btn btn-error text-white shadow-md hover:bg-gray-600 w-full sm:w-auto">
            Ignore 💔
          </button>
          <button className="btn btn-success text-white shadow-md hover:bg-teal-600 w-full sm:w-auto">
            Interested ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;