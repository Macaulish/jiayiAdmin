import axios from 'axios'
import qs from 'qs'


//axios.defaults.baseURL = 'http://39.106.167.104/';
axios.defaults.baseURL = 'http://192.168.0.105:8443/';
//axios.defaults.baseURL = 'http://www.jiayiworld.com/';

// axios.defaults.headers.cookies = 'JSESSIONID=456123';


axios.defaults.withCredentials = true;

export const util = {
	ajax(params){
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
					throw new Error(error);
				});
			});	

		}else{
			// headers = {
		 //        //'Content-type': 'application/json',
		 //        'Content-Type': 'application/x-www-form-urlencoded',
		 //        ...headers
		 //      };
			return new Promise((resolve,reject)=>{
				axios.post(url, data, {headers}).then(response=>{
					resolve(response);
				}).catch(error=>{
					//reject(error);
					throw new Error(error);
				});
			});	
		}
	},
	getAdminId(){
		return sessionStorage.getItem('adminId');
	}
}
