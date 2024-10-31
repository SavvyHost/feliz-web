import SelectMonth from "@/components/organisms/select/SelectMonth";
import SelectPlaces from "@/components/organisms/select/SelectPlcaes.";

import React from "react";

function Filter() {
  return (
    <div className="flex flex-col gap-2 w-full md:flex-row md:gap-x-2">
      <div className="w-full md:w-6/12">
        <SelectPlaces name="" />
      </div>
      <div className="w-full md:w-6/12">
        <SelectMonth name=" " />
      </div>
    </div>
  );
}

export default Filter;
