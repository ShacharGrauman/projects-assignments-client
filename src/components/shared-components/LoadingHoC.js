import React from "react";

/**
 * High Order Component for genericly deal with the status of a component being loaded
 * @param {* user's component} Component
 */

const LoadingHoC = Component => ({ isLoading, ...props }) => {
  return isLoading ? (
    <div>
      <h1>Loading Content</h1>
    </div>
  ) : (
    <Component {...props} />
  );
};

export default LoadingHoC;
