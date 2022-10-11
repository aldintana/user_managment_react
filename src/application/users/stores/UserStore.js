import { makeAutoObservable, runInAction } from "mobx"
import React from "react";
import UserService from "../services/UserService";

class UserStore {
    userList = [];
    searchText = React.createRef('');
    
    constructor() {
        this.userService = new UserService();
        makeAutoObservable(this);
    }

    async getUsersAsync() {
        var response = await this.userService.getAsync();
        runInAction(() => {
            console.log('usao');
            this.userList = response.data.items
        });
    }

    async deleteUserAsync(id){
        var response = await this.userService.deleteAsync(id);
    }

    get noUsers() {
        return this.userList && this.userList.length === 0;
    };
}

export default UserStore;