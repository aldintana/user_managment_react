import { createContext, useContext } from "react";
import UserStore from "./application/users/stores/UserStore";
import UserPermissionStore from "./application/userPermissions/stores/UserPermissionStore";
const store = {
    userStore: new UserStore(),
    userPermissionStore: new UserPermissionStore()
}

export const StoreContext = createContext(store);

export const useStore = () => {
    return useContext(StoreContext);
}

export default store;