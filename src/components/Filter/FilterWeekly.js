import React, { useContext, useState } from "react";
import classes from "./Filter.module.scss";
import LoadsContext from "../../store/transactions-context";
import ExpensesContext from "../../store/expenses-context";
import { months } from "../../lib/default-data";

const dateFormatter = (dateStr) => {
  const arr = dateStr.split("/");

  const month = months[+arr[0] - 1];
  const day = arr[1];
  const year = arr[2];

  return { month, day, year };
};

const FilterWeekly = () => {
  const { setLoadsWeekly, weeklyLoadsKeys: keys } = useContext(LoadsContext);
  const { setExpensesWeekly } = useContext(ExpensesContext);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);

  const handleSelectedWeek = (e) => {
    const keyDate = e.target.value;

    if (keyDate === keys[0]) {
      setIsCurrentWeek(true);
    } else {
      setIsCurrentWeek(false);
    }

    setLoadsWeekly(keyDate);
    setExpensesWeekly(keyDate);
  };

  return (
    <div className={classes.weekly_wrapper}>
      <div>
        {isCurrentWeek && <label htmlFor="week">Current Week</label>}

        <select onChange={handleSelectedWeek} id="week" defaultValue={keys[0]}>
          {keys.map((key) => {
            const { day, month, year } = dateFormatter(key);

            return (
              <option key={key} value={`${key}`}>
                {`${day} ${month} ${year}`}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default FilterWeekly;

// import React, { useState } from "react";

// const CustomDropdown = ({ options }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(options[0]);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionClick = (option) => {
//     setSelectedOption(option);
//     setIsOpen(false);
//   };

//   return (
//     <div className="custom-dropdown">
//       <div className="selected-option" onClick={toggleDropdown}>
//         {selectedOption}
//       </div>
//       {isOpen && (
//         <ul className="options">
//           {options.map((option) => (
//             <li
//               key={option}
//               className="option"
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CustomDropdown;
