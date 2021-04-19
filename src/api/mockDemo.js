/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from '../utils/request';

//1、获取swipe的图片列表
export const reqSwipes = ()=>ajax(`/swipes`,);

//2、获取所有病人信息列表
export const reqPatients = ()=>ajax(`/patients`);

//3、根据pid获取病人信息
export const reqPatientByPid = (pid)=>ajax(`/patient`,{pid},"POST");