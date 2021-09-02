/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import request from '../utils/requestMock'

//1、获取swipe的图片列表
export const reqSwipes = ()=>request(`/swipes`,);

//2、获取所有病人信息列表
export const reqPatients = ()=>request(`/patients`);

//3、根据pid获取病人信息
export const reqPatientByPid = (pid)=>request(`/patient`,{pid},"POST");

//4、获取所有table信息列表
export const reqTableData = ()=>request(`/tableData`);

export const reqTableData1 = ()=>request(`/tableData`);