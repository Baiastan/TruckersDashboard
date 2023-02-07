import React, { useContext, useState } from "react";
import classes from "./PerLoad.module.scss";
import { FaTrash, FaPen } from "react-icons/fa";
import LoadsContext from "../../store/transactions-context";
import PerLoadEditForm from "./PerLoadEditForm";
import DateCreated from "../UtilComponents/DateCreated";

const Load = ({ load, dispacthFee }) => {
  const { deleteLoad } = useContext(LoadsContext);

  const [isEditing, setIsEditing] = useState(false);
  //const sign = type === "income" ? "plus" : "minus";

  const { note, dateCreated, amount, id, miles, rate, destination, from } =
    load;

  const handleDelete = () => {
    deleteLoad(id);
  };

  const handleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  return (
    <>
      {!isEditing ? (
        <tr className={classes["transaction-list"]}>
          <td className={classes.td_from}>{from}</td>
          <td className={classes.td_to}>{destination}</td>
          <td className={classes.td_note}>{note}</td>
          <td className={classes.td_date}>
            <DateCreated date={dateCreated} />
          </td>
          <td className={classes.td_miles}>{miles} mi</td>
          <td className={classes.td_rate}>${rate}</td>
          <td className={classes.td_amount}>${amount}</td>
          <td className={classes.td_netpay}>
            ${(amount * dispacthFee).toFixed(2)}
          </td>
          <td className={classes.td_trash}>
            <i onClick={handleDelete}>
              <FaTrash />
            </i>
          </td>
          <td className={classes.td_edit}>
            <i>
              <FaPen onClick={handleEdit} />
            </i>
          </td>
        </tr>
      ) : (
        <PerLoadEditForm
          note={note}
          amount={amount}
          id={id}
          from={from}
          destination={destination}
          rate={rate}
          date={dateCreated}
          miles={miles}
          setEditing={setIsEditing}
        >
          <td className={classes.td_netpay}>
            ${(amount * dispacthFee).toFixed(2)}
          </td>
          <td className={classes.td_trash}>
            <i>
              <FaTrash onClick={handleDelete} />
            </i>
          </td>
        </PerLoadEditForm>
      )}
    </>
  );
};

export default Load;
