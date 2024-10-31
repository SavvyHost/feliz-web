// import React, { useState } from "react";
// import { ChevronDown, Search } from "lucide-react";

// const SearchInput = () => {
//   const [location, setLocation] = useState("Where");
//   const [month, setMonth] = useState("");
//   const [option, setOption] = useState("");
//   const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
//   const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const locations = ["New York", "London", "Paris", "Tokyo"];
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const options = ["Packages", "Nile Cruise", "Excursions"];

//   return (
//     <div className="relative w-full">
//       {/* Search Input for Larger Screens */}
//       <div className="hidden md:flex flex-col md:flex-row items-center bg-white rounded-md mt-5 border border-gray-100 p-5 space-y-2 md:space-y-0 md:space-x-2 mx-auto max-w-4xl w-full">
//         {/* Location Dropdown */}
//         <div className="relative flex-1 hover:bg-gray-100 bg-white border-2 border-gray-300 p-2 rounded-lg ">
//           {" "}
//           {/* Increased min-width */}
//           <input
//             type="text"
//             value={location}
//             onFocus={() => setIsLocationDropdownOpen(true)}
//             onBlur={() =>
//               setTimeout(() => setIsLocationDropdownOpen(false), 200)
//             }
//             onChange={(e) => setLocation(e.target.value)}
//             placeholder="Where"
//             className="bg-transparent text-black focus:outline-none  cursor-pointer"
//           />
//           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-black" />
//           {isLocationDropdownOpen && (
//             <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
//               {locations.map((loc) => (
//                 <div
//                   key={loc}
//                   className="px-4 py-2 hover:bg-yellow-200 font-segoe text-sm cursor-pointer"
//                   onClick={() => {
//                     setLocation(loc);
//                     setIsLocationDropdownOpen(false);
//                   }}
//                 >
//                   {loc}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Month Input with Dropdown */}
//         <div className="relative flex-1  hover:bg-gray-100 bg-white border-2 border-gray-300 p-2 rounded-lg ">
//           {" "}
//           {/* Increased min-width */}
//           <input
//             type="text"
//             value={month}
//             onFocus={() => setIsMonthDropdownOpen(true)}
//             onBlur={() => setTimeout(() => setIsMonthDropdownOpen(false), 200)}
//             onChange={(e) => setMonth(e.target.value)}
//             placeholder="Select month"
//             className="bg-transparent focus:outline-none  cursor-pointer"
//           />
//           <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-transparent" />
//           {isMonthDropdownOpen && (
//             <div className="absolute z-10 mt-1 w-full bg-white border  border-gray-300 rounded-md shadow-lg">
//               <div className="grid grid-cols-2 p-3">
//                 <div className="flex flex-col">
//                   {months.slice(0, 6).map((m) => (
//                     <div
//                       key={m}
//                       className="p-2 cursor-pointer font-segoe text-sm"
//                       onClick={() => {
//                         setMonth(m);
//                         setIsMonthDropdownOpen(false);
//                       }}
//                     >
//                       {m}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex flex-col">
//                   {months.slice(6).map((m) => (
//                     <div
//                       key={m}
//                       className="p-2 cursor-pointer font-segoe text-sm"
//                       onClick={() => {
//                         setMonth(m);
//                         setIsMonthDropdownOpen(false);
//                       }}
//                     >
//                       {m}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Tailwind Dropdown for Options */}
//         <div className="relative flex-1 hover:bg-gray-100 bg-white border-2 border-gray-300 p-2 rounded-lg ">
//           {" "}
//           {/* Increased min-width */}
//           <select
//             value={option}
//             onChange={(e) => setOption(e.target.value)}
//             className="bg-transparent text-black w-full focus:outline-none  cursor-pointer"
//           >
//             <option value="" disabled>
//               Options
//             </option>
//             {options.map((opt) => (
//               <option key={opt} value={opt} className="cursor-pointer">
//                 {opt}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Search Button */}
//         <button className=" text-black hover:bg-gray-100 bg-white border-2 border-gray-300 p-2 rounded-lg  font-segoe  px-6 py-2 flex items-center text-center justify-center w-full md:w-auto">
//           <Search className="mr-2 w-5 h-5" />
//           Search
//         </button>
//       </div>

//       {/* Mobile Search Input */}
//       <div className="relative md:hidden w-full">
//         <input
//           type="text"
//           placeholder="Search For a tour or Activity"
//           className="w-full p-4 pl-12 bg-white text-black font-segoe rounded-md placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/30"
//           onClick={() => setIsModalOpen(true)}
//         />
//         <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none" />
//       </div>
//     </div>
//   );
// };

// export default SearchInput;

import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { Modal, Slide } from "@mui/material";
import Filter from "@/components/templates/laptop/Filter";

const SearchInput = () => {
  const [location, setLocation] = useState("Where");
  console.log("🚀 ~ SearchInput ~ location:", location);
  const [month, setMonth] = useState("");
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      {/* Search Input for Larger Screens */}
      <div className="hidden md:flex flex-col md:flex-row items-center bg-white rounded-md mt-5  p-5 space-y-2 md:space-y-0 md:space-x-2 mx-auto max-w-2xl w-full">
        <Filter />
        <button className=" transform translate-y-1 text-black hover:bg-gray-100 bg-white border-2 border-gray-300 p-2 rounded-lg  font-segoe  px-6 py-2 flex items-center text-center justify-center w-full md:w-auto">
          <Search className="mr-2 w-5 h-5" />
          Search
        </button>
      </div>
      <div className="relative md:hidden w-full">
        <input
          type="text"
          placeholder="Search For a tour or Activity"
          className="w-full p-4 pl-12 bg-white text-gray-400 font-segoe rounded-md placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-white/30"
          onClick={() => setIsModalOpen(true)}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700 pointer-events-none" />
      </div>
    </div>
  );
};

export default SearchInput;
