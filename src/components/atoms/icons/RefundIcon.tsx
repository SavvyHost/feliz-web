import * as React from "react";
const RefundIcon = ({ action, className }: any) => (
  <img
    className={className}
    onClick={action}
    src="https://admin.khalwa.com/images/refund.svg"
    alt=""
  />
);
export default RefundIcon;
