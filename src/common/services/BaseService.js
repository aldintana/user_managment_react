import axios from "axios";

class BaseService {
    baseUrl = "https://localhost:44343/api/";
    constructor(resource) {
        this.baseUrl += resource;
    }

    async deleteAsync(id) {
        return await axios.delete(this.baseUrl + '/' + id);
    };

    async getAsync(params) {
        return await axios.get(this.baseUrl, { params });
    };

    async getByIdAsync(id) {
        return await axios.get(this.baseUrl + '/' + id);
    };

    async insertAsync(request) {
        return await axios.post(this.baseUrl, request);
    };

    async updateAsync(request, id) {
        return await axios.put(this.baseUrl + '/' + id, request);
    };
}

export default BaseService;