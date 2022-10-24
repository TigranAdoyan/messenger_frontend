import React, {useEffect, useState} from "react";

function SideBar({ list = [], activeTab, setActiveTab }) {
    // debugger;
    useEffect(() => {
      if (list.length) {
         setActiveTab({
            id: list[0][list[0].type].id,
            type: list[0].type
         })
      }
   }, [list])

   return (
       <div className="usersBarContainer">
          {
             list.map(item => {
                const isActive = activeTab && activeTab.id === item[item.type].id && activeTab.type === item.type;
                // debugger;
                const className = `usersBarContainer_item ${isActive ? 'usersBarContainer_item_active' : ''}`

                return (
                    <span
                        key={item.email}
                        className={className}
                        onClick={() => {
                           if (!isActive) {
                              setActiveTab({
                                 id: item[item.type].id,
                                 type: item.type
                              })}
                           }
                        }
                    >
                       <span style={{fontSize: '15px'}}> {item.type === 'user' ? item.user.username : item.group.title} </span>
                       <span style={{fontSize: '15px'}}> {item.type.charAt(0).toUpperCase()} </span>
                    </span>
                )
             })
          }
       </div>
   );
}

export default SideBar;
