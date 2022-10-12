import { makeAutoObservable, runInAction } from "mobx"
import React from "react";
import UserService from "../services/UserService";

class UserStore {
    userList = [];
    totalCount = 0;
    searchText = React.createRef('');

    firstName = React.createRef('');
    lastName = React.createRef('');
    username = React.createRef('');
    email = React.createRef('');
    password = React.createRef('');
    status = React.createRef('');

    constructor() {
        this.userService = new UserService();
        makeAutoObservable(this);
    }
   
    async deleteUserAsync(id){
        await this.userService.deleteAsync(id);
        this.getUsersAsync();
    }

    async getUserByIdAsync(id) {
        var response = await this.userService.getByIdAsync(id);

        this.firstName.current.value = response.data.firstName;
        this.lastName.current.value = response.data.lastName;
        this.email.current.value = response.data.email;
        this.status.current.value = response.data.status;
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

    async saveUser(id, isCreate) {
        var response = null;
        var model = {
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            email: this.email.current.value,
            status: this.status.current.value
        }
        try
        {
            if (isCreate) {
                response = await this.userService.insertAsync(Object.assign(model, { username: this.username.current.value, password: this.password.current.value }));
            } else {
                response = await this.userService.updateAsync(model, id)
            }

            window.location.href = '/';
            alert("Success");
        }catch(ex)
        {
            alert("Error occured");
        }
    }

    get noUsers() {
        return this.userList && this.userList.length === 0;
    };
}

export default UserStore;