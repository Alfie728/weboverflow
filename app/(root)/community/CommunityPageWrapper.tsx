import React from "react";

const CommunityPageWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      {children}
    </>
  );
};
export default CommunityPageWrapper;
