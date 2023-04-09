import { method } from 'lodash';
import requests from './ajax'

//登录
export const reqUserLogin = (data) => requests({ url: `/user/passport/login`, data, method: 'post' })