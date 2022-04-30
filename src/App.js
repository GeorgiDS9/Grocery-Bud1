import React, { useState, useEffect, useCallback } from "react";
import ListItem from "./ListItem";
import Alert from "./Alert";
import Input from "./Input";

// const item = {
//   name: "",
//   isEditing: false,
// };

function App() {
  // list of items persist to local storage
  const [list, setList] = useState([]);
  // TODO make the editing work
  // click on edit icon and change state to true, know what itemIndex, then
  const [isEditing, setIsEditing] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  const handleSubmit = (item) => {
    const itemAltreadyExists = list.some((listItem) => listItem.name === item);
    showAlert(true, "success", "value added");

    if (itemAltreadyExists) {
      showAlert(true, "danger", "item already exists");
    } else {
      console.log("Item", item);
      setList([
        ...list,
        {
          name: item.trim(),
          isEditing: false,
        },
      ]);
    }
  };

  console.log(list);

  const handleOnEdit = useCallback(
    (itemIndex) => {
      const copiedList = list;
      copiedList[itemIndex].isEditing = true;
      console.log("CopiedList", copiedList);
      setList(copiedList);
      console.log("this is called");
    },
    [list]
  );

  const handleOnDelete = (itemIndex) => {
    const filteredList = list.filter((_listItem, index) => index !== itemIndex);
    setList(filteredList);
    showAlert(true, "danger", "value deleted");
  };

  const handleOnUpdate = useCallback(
    (itemName, index) => {
      const copiedList = list;
      copiedList[index].isEditing = false;
      copiedList[index].name = itemName;
      console.log("CopiedList", copiedList);
      setList(copiedList);
      showAlert(true, "success", "value changed");
    },
    [list]
  );

  const showAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };
  return (
    <>
      {/* {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />} */}
      <h2>grocery bud setup</h2>
      <Input onSubmit={handleSubmit} />
      {list.map((item, index) => {
        return (
          <ListItem
            name={item.name}
            isEditing={item.isEditing}
            itemIndex={index}
            key={item.name}
            onEdit={handleOnEdit}
            onDelete={handleOnDelete}
            onUpdate={handleOnUpdate}
          />
        );
      })}
      <button onClick={clearList}>clear items</button>
    </>
  );
}

export default App;
