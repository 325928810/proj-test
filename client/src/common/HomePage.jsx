import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import { Button } from "primereact/button";
import styled from "styled-components";
const StyledFooter = styled.footer`
  background-color: #f9fafb; /* Primary color of PrimeReact library */
  color: #4B5563; /* Text color */
  text-align: center;
  padding: 10px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;
export default function Home() {
  const navigate = useNavigate();

  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const [visible, setVisible] = useState(false);

  const items = [
    {
      label: "דף הבית",
      command: () => {
        navigate("/");
      },
    },

    {
      label: "בחר שפה",
      items: [
        {
          label: "עברית",
          template: itemRenderer,
        },
        {
          label: "English",
          template: itemRenderer,
        },
        {
          label: "Español",
          template: itemRenderer,
        },
        {
          separator: true,
        },
      ],
    },
    {
      label: "קורסים",
      // items: kategotyToShow,

      command: () => {
        localStorage.getItem("token")
          ? navigate("/activeCourses")
          : navigate("/LoginToEnterCourses");
      },
      // visible:localStorage.getItem("token")?true:false
    },
    {
      label: "יצירת קשר",
      template: itemRenderer,
    },

    {
      label: "?רוצה להיות שותף",
    },
  ];

  const start = (
    <img
      alt="logo"
      src="http://localhost:1133/logoV.png"
      height="60"
      className="mr-2"
    ></img>
  );
  const end = (
    <>
      <div className="flex align-items-center gap-2">
        <Login />

        {localStorage.getItem("token") ? (
          <Button
            icon="pi pi-shopping-cart"
            className="p-button-rounded"
            onClick={() => {
              navigate("/basket");
            }}
          ></Button>
        ) : (
          <></>
        )}

        <InputText
          placeholder="Search"
          type="text"
          className="w-8rem sm:w-auto"
        />
      </div>
    </>
  );

  return (
    <>
      <div className="card">
        <Menubar model={items} start={start} end={end} />
      </div>
      <main>
        <Outlet />
      </main>

      <StyledFooter >
        <div>
          <p>© 2024 Your Website Name Contact: example@example.com</p>
        </div>
      </StyledFooter>
    </>
  );
}
