import { makeAutoObservable, runInAction } from "mobx"
import React from "react";
import UserService from "../services/UserService";

class UserStore {
    userList = [];
    totalCount = 0;
    searchText = React.createRef('');
    constructor() {
        this.userService = new UserService();
        makeAutoObservable(this);
    }

    async getUsersAsync(currentPage, pageSize, sortName, sortDirection) {
        var response = await this.userService.getAsync(
            {
                textSearch: this.searchText.current ? this.searchText.current.value : '',
                currentPage: currentPage ? currentPage : 1,
                pageSize: pageSize ? pageSize : 10,
                sortName: sortName,
                sortDirection: sortDirection
            }
        );
        runInAction(() => {
            this.userList = response.data.items;
            this.totalCount = response.data.totalCount;
        });
    }

    async deleteUserAsync(id){
        await this.userService.deleteAsync(id);
        this.getUsersAsync();
    }

    get noUsers() {
        return this.userList && this.userList.length === 0;
    };
}

export default UserStore;