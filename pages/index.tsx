/* eslint-disable @next/next/no-img-element */

import React from "react";
import { useContextAuthenticatedUser } from "../demo/context/ContextAuthenticatedUser";
import { Image } from "primereact/image";

const Dashboard = () => {
  const { authenticatedUser } = useContextAuthenticatedUser();
  function ProfilePic() {
    return (
      <div style={{}}>
        <Image src={authenticatedUser.photoURL} alt="Image" preview />
      </div>
    );
  }
  return (
    <div className="grid">
      <div className="col-12 lg:col-6 xl:col-3">
        <div className="card mb-0">
          <div className="flex justify-content-between mb-3">
            <div>
              <span className="block text-500 font-medium mb-3">
                Welcome!!!
              </span>
              <div className="text-900 font-medium text-xl">
                {authenticatedUser.email}
              </div>
            </div>
            <div className="">
              <ProfilePic></ProfilePic>
            </div>
          </div>
          <span className="text-green-500 font-medium">
            {authenticatedUser.lastLoginAt.toISOString()}
          </span>
          <span className="text-500"> was your last visit.</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
