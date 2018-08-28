import axios from 'axios'
import qs from 'qs'
import router from "../../router/index";

axios.defaults.baseURL = 'http://39.106.167.104/';
//axios.defaults.baseURL = 'http://192.168.0.104:8443/';
//axios.defaults.baseURL = 'http://www.jiayiworld.com/';
// axios.defaults.headers.cookies = 'JSESSIONID=456123';

axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;

// response响应拦截 拦截器
axios.interceptors.response.use(
response => {
    console.log(response);
    return response;
},
error => {
	console.log(error);
	console.log(error.response);
	//router.push({name: 'login'});
	return response;
    if (error.response) {
        switch (error.response.status) {
            case 401:
                // 返回 401 清除token信息并跳转到登录页面
                store.commit(types.LOGOUT);
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                })
        }
    }
});

export const util = {
	$http(params){
		let {headers = {}, url = '', method = 'post', data = {} } = params;
	
		// headers = {	
  //           'Authorization': 'Bearer ',
  //           "Cookie" : 'JSESSIONID=123321',

		// }

		//console.log(data);

		if(method=='get'){
  			return new Promise((resolve,reject)=>{
				axios.get(url, {params: data}, {headers}).then(response=>{
					resolve(response);
				}).catch(error=>{
					//reject(error);
					console.log(error);
					//throw new Error(error);
				});
			});	
		}else{
			return new Promise((resolve,reject)=>{
				axios.post(url, data, {headers}).then(response=>{
					resolve(response);
				}).catch(error=>{
					//reject(error);
					console.log(error);
					//throw new Error(error);
				});
			});	
		}
	},
	getAdminId(){
		return sessionStorage.getItem('adminId');
	},
	trim(str){
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}
}
