import Vue from 'vue';
import 'tippy.js/dist/tippy.css';
import axios from 'axios';

// function
Vue.prototype.$toaster = function(message, type = 'success') {
	this.$bvToast.toast(message, {
		title: '',
		variant: type,
		toaster: 'b-toaster-bottom-right',
		appendToast: true,
	})
}

Vue.prototype.$confirm = async function(text, settings = {}) {
	var options = {
		title: settings.hasOwnProperty('title') ? settings.title : '',
		size: settings.hasOwnProperty('size') ? settings.size : 'sm',
		okTitle: settings.hasOwnProperty('okTitle') ? settings.okTitle : 'Ok',
		okVariant: 'alert',
		cancelTitle: settings.hasOwnProperty('cancelTitle') ? settings.cancelTitle : 'Cancel',
		cancelVariant: 'alert',
		footerClass: settings.hasOwnProperty('footerClass') ? settings.footerClass : 'p-1',
		hideHeader: settings.hasOwnProperty('hideHeader') ? settings.hideHeader : true,
		hideHeaderClose:  settings.hasOwnProperty('hideHeaderClose') ? settings.hideHeaderClose : true,
		centered: true,
		noEnforceFocus: true,
		noCloseOnBackdrop: true,
		noFade: false,
		noStacking: true,
		isOkModal: settings.hasOwnProperty('isOkModal') ? true : false
	}
	if(!options.isOkModal) {
		var response = await this.$bvModal.msgBoxConfirm(text, options);
		var result = settings.hasOwnProperty('result') ? settings.result : false;
		if(result) {
			return response;
		} 
		if(response) {
			return response;
		}
	}
	else {
		var response = await this.$bvModal.msgBoxOk(text, options);
		var result = settings.hasOwnProperty('result') ? settings.result : false;
		if(result) {
			return response;
		} 
		if(response) {
			return response;
		}
	}
	return false;
}

Vue.prototype.$errorHandling = function(error) {
	if(error.response) {
		if(error.response.status == 400 || error.response.status == 404) {  
			if(error.response.data.hasOwnProperty('message') && error.response.data.message != '') {
				this.$toaster(error.response.data.message, 'danger');
			}
			if(error.response.data.hasOwnProperty('errors')) {
				error.response.data.errors.forEach(item => {
					if(document.querySelector('#'+item.param) != null) {
						tippy(document.querySelector('#'+item.param), {content: item.msg, maxWidth: '13rem', trigger: 'focus focusin mouseenter'});
						document.querySelector('#'+item.param).classList.add('error');
					}
					else {
						this.$toaster(item.msg, 'danger');
					}
				});
			}
		} else if(error.response.status == 401) {
			this.$cookies.remove("_l_hrm");
			this.$cookies.remove("_t_hrm");
			window.location.reload();
		} else if(error.response.status == 500) {
			if(error.response.data.hasOwnProperty('message') && error.response.data.message != '') {
				this.$toaster(error.response.data.message, 'danger');
			}
		}
	}
	this.$store.state.loading = false;
}


// Vue.prototype.$apiPost = async function(url, data) {
// 	if(this.$cookies.isKey('_t_hrm')) {
// 		let headers = {
// 			Authorization: 'Bearer '+ this.$cookies.get('_t_hrm')
// 		};
// 		try {
// 			var response = await axios.post(this.$store.state.apiUrl+url, data, { headers: headers });
// 			if(response.status == 200 && response.status == 201) {
// 				if(response.data.hasOwnProperty('token')) {
// 					this.$cookies.set("_t_hrm", response.data.token);
// 					this.$cookies.set("_l_hrm", true);
// 					window.location.reload();
// 				  }
// 				return response.data;
// 			}
// 		}
// 		catch(error) {
// 			if(error.response) {
// 				if(error.response.status == 400 || error.response.status == 404) {  
// 					if(error.response.data.hasOwnProperty('message') && error.response.data.message != '') {
// 						this.$toaster(error.response.data.message, 'danger');
// 					}
// 					error.response.erros.forEach(item => {
// 						if(document.querySelector('#'+item.param) != null) {
// 							tippy(document.querySelector('#'+item.param), {content: item.msg, maxWidth: '13rem', trigger: 'focus focusin mouseenter'});
// 							document.querySelector('#'+item.param).classList.add('error');
// 						}
// 						else {
// 							this.$toaster(item.msg, 'danger');
// 						}
// 					});
// 				}
// 				else if(error.response.status == 401) {
// 					this.$cookies.remove("_l_hrm");
// 					this.$cookies.remove("_t_hrm");
// 					window.location.reload();
// 				}
// 			}
// 		}
// 	}
// 	else {
// 		this.$cookies.remove("_l_hrm");
// 		this.$cookies.remove("_t_hrm");
// 		window.location.reload();
// 	}
// }