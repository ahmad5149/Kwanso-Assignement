import { createContext, useState } from "react";

export const Context = createContext<any>([]);

function MyContext({ children }: any) {
  const [tasksList, setTaskList] = useState<any>([]);

  return (
    <Context.Provider value={{ tasksList, setTaskList }}>
      {children}
    </Context.Provider>
  );
}

export default MyContext;
