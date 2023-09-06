<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
            <CCardBody>
			  Do you want to delete this item ?
            </CCardBody>
         </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import {hasWhiteSpace} from '@/views/../genFunctions/genFunctions'
import { storeDM } from '../../redux/store'
export default {
  name: 'FormsConfirm',
  data(){
   return{
     storeDM:storeDM,
     formData : {
	   username:"",
	   name:"",
	   password:"",
	 },
	 formDataMessage : {
	   username:"",
	   name:"",
	   password:"",
	 }
   
   }
  },
  watch : {
    value(value) {
	   console.log(value)
        // or generate/simulate a native events (not sure how, but its outside Vue's realm I think
    }
  },
  methods:{
   submit(event){
   if(!this.formDataMessage.password && !this.formDataMessage.password){
	     fetch("https://sharingvision-backend.herokuapp.com/user", {
		  method: "post",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify(storeDM.state.formData)
				}).then(res => res.json())
			  .then(
				(result) => {
					console.log(21313132)
					this.$emit('save');
				
			});	
	 }
   },
   validatorUsername (val) {
	   this.formDataMessage.username = "";
		 if(val.length < 3)
		   this.formDataMessage.username = "Please provide at least 3 characters."
		   
		 if(hasWhiteSpace(val))
		   this.formDataMessage.username += " Please remove white spaces"  
		 
         if(this.formDataMessage.username)		 
			return false;
		 else
		    return val;
	},
	validatorName (val) {
	   this.formDataMessage.name = "";
		 if(val.length < 3)
		   this.formDataMessage.name = "Please provide at least 3 characters."
		   	 
         if(this.formDataMessage.name)		 
			return false;
		 else
		    return val;
	},
	validatorPassword (val) {
	   this.formDataMessage.password = "";
		 if(val.length < 7)
		   this.formDataMessage.password = "Please provide at least 7 characters."
		   
		 if(hasWhiteSpace(val))
		   this.formDataMessage.password += " Please remove white spaces"  
		 
         if(this.formDataMessage.password)		 
			return false;
		 else
		    return val;
	}
  }
}
</script>
