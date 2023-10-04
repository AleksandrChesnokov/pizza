import { useState, useRef, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { filterNum, addSearchValue } from "../../rtk/sortSlice";
import { useDispatch, useSelector } from "react-redux";

import magnifier from "../../img/free-icon-magnifier-2319177.png";

export function SearchBox() {
  const popupList = ["цене ▲", "цене ▼", "рейтингу ▲", "рейтингу ▼"];

  const [sort, setSort] = useState("цене ▲");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef(null);
  const dispatch = useDispatch();

  const searchValue = useSelector((state) => state.sort.searchValue);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsPopupOpen(false);
    }
  };

  useEffect(() => {
    if (isPopupOpen) {
      document.addEventListener("click", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isPopupOpen]);

  function handleSetFilter(item, index) {
    setSort(`${item}`);
    dispatch(filterNum(index));
  }

  function handleInputValue(e) {
    dispatch(addSearchValue(e.target.value));
  }

  let content = popupList.map((item, index) => (
    <li key={nanoid()} onClick={() => handleSetFilter(item, index)}>
      {item}
    </li>
  ));

  return (
    <div className="search">
      <div className="search-box">
        <div className="search-box__button">
          <img
            className="search-box__magnifier"
            src={magnifier}
            alt="magnifier"
          />{" "}
        </div>
        <div className="search-box__input-container">
          <input
            type="text"
            placeholder="Поиск пиццы..."
            className="search__input"
            value={searchValue}
            onChange={handleInputValue}
          />
          {searchValue && (
            <svg
              onClick={() => dispatch(addSearchValue(""))}
              className="close"
              height="48"
              viewBox="0 0 48 48"
              width="48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M38 12.83l-2.83-2.83-11.17 11.17-11.17-11.17-2.83 2.83 11.17 11.17-11.17 11.17 2.83 2.83 11.17-11.17 11.17 11.17 2.83-2.83-11.17-11.17z" />
              <path d="M0 0h48v48h-48z" fill="none" />
            </svg>
          )}
        </div>
      </div>
      <div className="search__sort">
        сортировка по:{" "}
        <span className="search__popular" onClick={togglePopup} ref={popupRef}>
          {sort}
        </span>
        <div className="test1">
          {isPopupOpen && <ul className="test">{content}</ul>}
        </div>
      </div>
    </div>
  );
}
