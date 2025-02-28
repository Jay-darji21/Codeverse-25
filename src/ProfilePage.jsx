import React from "react";

const ProfilePage = () => {
  const storedData = JSON.parse(localStorage.getItem("freelancerData")) || {};

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Profile Details</h2>
      <p><strong>Name:</strong> {storedData.name}</p>
      <p><strong>Skills:</strong> {storedData.skills}</p>
      <p><strong>Projects:</strong> {storedData.project}</p>
      <p><strong>Experience:</strong> {storedData.experience} years</p>
      <Link to="/FreelancerFeature" className="block mt-4 text-blue-500">Go Back</Link>
    </div>
  );
};

export default ProfilePage;