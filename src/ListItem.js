import React, { useState, useCallback, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const ListItem = ({
  name,
  isEditing,
  itemIndex,
  onEdit,
  onDelete,
  onUpdate,
}) => {
  const [itemName, setItemName] = useState(name);

  useEffect(() => {
    console.log("Item changed", name, isEditing);
  }, [isEditing]);

  // Edit control
  const handleEdit = () => {
    onEdit(itemIndex);
  };
  const handleDelete = () => {
    onDelete(itemIndex);
  };

  // Change item name
  const handleUpdate = useCallback(() => {
    if (itemName) onUpdate(itemName, itemIndex);
  }, [itemName, itemIndex, onUpdate]);

  const handleItemNameChange = (e) => {
    e.preventDefault();
    setItemName(e.target.value);
  };

  return (
    <>
      <h1>{isEditing ? "true" : "false"}</h1>
      {!isEditing ? (
        <>
          <div>{name}</div>
          <FaEdit onClick={handleEdit} />
          <FaTrash onClick={handleDelete} />
        </>
      ) : (
        <>
          <input value={itemName} onChange={handleItemNameChange} />
          <button type="submit" onClick={handleUpdate}>
            Update
          </button>
        </>
      )}
    </>
  );
};

export default ListItem;
