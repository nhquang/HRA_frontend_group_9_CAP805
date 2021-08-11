import Vue from 'vue';
import SimpleVueValidation from 'simple-vue-validator';
import tippy from 'tippy.js';
Vue.use(SimpleVueValidation);

export const formValidation = {
    data() {
        return { 
            validator: SimpleVueValidation.Validator,
        }
    },
    methods: {
        resetFormError() {
            this.validation.errors = [];
           
            document.querySelectorAll('.error').forEach(element => {
                element.classList.remove("error");
                element._tippy.destroy();
            });
        },
        tooltipError() {
            var key = '';
            var msg = '';
            for(var i=0; i<this.validation.errors.length; i++) {
                key = this.validation.errors[i].field;
                msg = this.validation.errors[i].message;
                if(document.querySelector('#'+key) != null) {
                    tippy(document.querySelector('#'+key), {content: msg, maxWidth: '13rem', trigger: 'focus mouseenter'});
                    document.querySelector('#'+key).classList.add('error');
                }
                else {
                    this.$toaster(msg, 'danger');
                }
            } 
        },
        elementTootltipError(key, message) {
            if(document.querySelector('#'+key) != null) {
                tippy(document.querySelector('#'+key), {content: message, maxWidth: '13rem', trigger: 'focus mouseenter'});
                document.querySelector('#'+key).classList.add('error');
            }
            else {
                this.$toaster(message, 'danger');
            }
        },
        validate(field_name, error) {
            if(error._messages.length > 0){
                var obj = {};
                obj['field'] = field_name;
                obj['message'] = error._messages[0];
                this.validation.errors.push(obj);
            }
        },
        apiError(error) {
            error.forEach(item => {
                if(document.querySelector('#'+item.param) != null) {
                    tippy(document.querySelector('#'+item.param), {content: item.msg, maxWidth: '13rem', trigger: 'focus focusin mouseenter'});
                    document.querySelector('#'+item.param).classList.add('error');
                }
                else {
                    this.$toaster(item.msg, 'danger');
                }
            });
        },

        required(field_name) {
            return field_name+' is required';
        },
        maxLength(field_name, length) {
            return 'The length of '+field_name+' must be less than or equal to '+length;
        },
        minLength(field_name, length) {
            return 'The length of '+field_name+' must be greater than or equal to '+length;
        },
        digit(field_name) {
             return field_name+' must be a number';
        },
        match(field_name) {
            return field_name+' did not matched';
        }
    }
}