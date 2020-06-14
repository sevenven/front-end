// useContext用于在快速在函数组件中导入上下文
import React, { useContext } from "react";
import { Context } from "../AppContext";

export default function UseContextPage(props) {
  const ctx = useContext(Context);
  return (
    <div>
      <h3>UseContextPage</h3>
      <p>{ctx.user.name}</p>
    </div>
  );
}
