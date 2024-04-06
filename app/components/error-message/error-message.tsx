import React, { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  
  return <div className="badge badge-error">{children}</div>;
};

export default ErrorMessage;