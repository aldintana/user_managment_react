import { createContext, useContext } from "react";
import UserStore from "./application/users/stores/UserStore";

const store = {
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
}

export default store;