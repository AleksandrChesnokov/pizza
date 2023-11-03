import { setSortIndex, updateSearchValue } from "../../rtk/sortSlice";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography, ConfigProvider } from "antd";

import magnifier from "../../img/free-icon-magnifier-2319177.png";

export function SearchBox() {
  const dispatch = useDispatch();

  const { searchValue, filterValue } = useSelector((state) => state.sort);

  function handleInputValue(e) {
    dispatch(updateSearchValue(e.target.value));
  }

  const items = [
    {
      key: "1",
      label: "цене",
      icon: <CaretUpOutlined />,
    },
    {
      key: "2",
      label: "цене",
      icon: <CaretDownOutlined />,
    },
    {
      key: "3",
      label: "рейтингу",
      icon: <CaretUpOutlined />,
    },
    {
      key: "4",
      label: "рейтингу",
      icon: <CaretDownOutlined />,
    },
  ];

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
              onClick={() => dispatch(updateSearchValue(""))}
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
        <ConfigProvider
          theme={{
            token: {
              colorLink: "#368736c7",
              colorPrimary: "#368736c7",
              fontFamily: "Jost",
            },
            components: {
              Dropdown: {
                itemSelectedColor: "#368736c7",
                colorPrimary: "green",
              },
            },
          }}
        >
          <Dropdown
            menu={{
              onSelect: (e) => dispatch(setSortIndex(+e.key)),
              items,
              selectable: true,
              defaultSelectedKeys: ["1"],
            }}
          >
            <Typography.Link>
              <Space>
                {items.map((item) =>
                  +item.key === filterValue ? (
                    <span key={nanoid()}>
                      {item.label} {item.icon}
                    </span>
                  ) : null
                )}
              </Space>
            </Typography.Link>
          </Dropdown>
        </ConfigProvider>
      </div>
    </div>
  );
}
