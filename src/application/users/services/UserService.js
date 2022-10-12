import BaseService from "../../../common/services/BaseService";
import axios from "axios";

class UserService extends BaseService {
    
    userPermissionPath = "userPermissions"
    constructor() {
        super("User");
    }

    async getByIdAsync(id, params) {
        return await axios.get(this.baseUrl + "/" + id + "/" + this.userPermissionPath, { params: params });
    };

    async addPermissionAsync(params){
        return await axios.post(this.baseUrl + "/" + this.userPermissionPath, params);
    }

    async removePermissionAsync(userPermissionId){
        return await axios.delete(this.baseUrl + "/" + this.userPermissionPath + "/" + userPermissionId);
    }
}
export default UserService;