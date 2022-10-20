import React from "react";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <h3 className="sidebarTitle">Menu</h3>
        <ul className="sidebarList">
          <li className="sidebarListItem"  onClick={()=> router.push("/actuellement")}>Actuellement</li>
          <li className="sidebarListItem" onClick={()=> router.push("/sorties")}>Sorties</li>

          <li className="sidebarListItem" onClick={()=> router.push("/clients")}>Clients</li>

          <li className="sidebarListItem"  onClick={()=> router.push("/post")}>Valider</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
