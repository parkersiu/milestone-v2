import React, { useState, useRef, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";

function MutableInput({ value, valueSet, placeHolder }) {
  const currentField = useRef(null);
  const [edit, editSet] = useState(false);
  const [textValue, setTextValue] = useState(value);

  //* Initiates textarea onClick, selects all text & creates sets height
  useEffect(() => {
    if (edit) {
      currentField.current.select();
      currentField.current.style.height =
        currentField.current.scrollHeight + "px";
    }
  }, [edit]);

  //* Changes size of text area as more text is added
  function auto_grow(e) {
    e.target.style.height = e.target.scrollHeight + "px";
  }

  //* Enter key & outsideclick handler
  const handleKeyPress = e => {
    if (e.key === "Enter" || e === "outside") {
      if (value === "") {
        setTextValue(placeHolder);
      }
      editSet(false);
    }
  };

  //* Handles value change & trims spaces in the beginning
  const handleInputChange = e => {
    setTextValue(e.target.value.trimStart());
  };

  return (
    <OutsideClickHandler onOutsideClick={() => handleKeyPress("outside")}>
      <div id="mi" className="flex justify-between font-bold text-xl p-2">
        {edit ? (
          <textarea
            id="mi-textarea"
            onInput={auto_grow}
            type="text"
            value={textValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            ref={currentField}
            rows="1"
            className="resize-none cursor-pointer"
          />
        ) : (
          <div onClick={() => editSet(true)} id="mi-div">
            {value}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

export default MutableInput;
