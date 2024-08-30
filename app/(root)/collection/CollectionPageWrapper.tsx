import React from "react";

const CollectionPageWrapper = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      {children}
    </>
  );
};
export default CollectionPageWrapper;
