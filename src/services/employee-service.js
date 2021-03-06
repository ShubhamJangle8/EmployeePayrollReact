import config from "../config/config";
import AxiosService from "../services/axios-service"

export default class EmployeeService {
  baseUrl = config.baseUrl;
  addEmployee(data) {
    return AxiosService.postService(`${this.baseUrl}employee/create`, data);
  }
  updateEmployee(data) {
    return AxiosService.putService(`${this.baseUrl}employee/update/${data.id}`, data);
  }
  getAllEmployee() {
    return AxiosService.getService(`${this.baseUrl}employee/getall`);
  }
  getEmployee(id) {
    return AxiosService.getService(`${this.baseUrl}employee/get/${id}`);
  }
  deleteEmployee(id) {
    return AxiosService.deleteService(`${this.baseUrl}employee/delete/${id}`);
  }
}