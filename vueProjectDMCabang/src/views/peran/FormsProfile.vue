<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard>
          <CForm novalidate>
            <CCardBody>
			  <CInput
                type="hidden"
                required
				v-model="storeDM.state.formData.username"
               />
              <CInput
                type="text"
                description="Please enter your username."
                autocomplete="Username"
                label="Username"
                placeholder="Enter Username..."
                required
				v-model="storeDM.state.formData.username"
                valid-feedback="Great!!"
				:invalid-feedback="formDataMessage.username"
				:is-valid="validatorUsername"
              />
			  <CInput
                type="text"
                description="Please enter your name."
                autocomplete="name"
                label="Name"
                placeholder="Enter Name..."
                required
				v-model="storeDM.state.formData.name"
                valid-feedback="Great!!"
				:invalid-feedback="formDataMessage.name"
				:is-valid="validatorName"
              />
              <CInput
                type="text"
				v-model="storeDM.state.formData.password"
                description="Please enter your password."
                autocomplete="current-password"
                label="Password"
                placeholder="Enter Password..."
                required
                valid-feedback="Great!!"
				:invalid-feedback="formDataMessage.password"
				:is-valid="validatorPassword"
              />
            </CCardBody>
            <CCardFooter>
              <CButton type="submit" @click="submit($event)" size="sm" color="primary"><CIcon name="cil-check-circle"/> Submit</CButton>
            </CCardFooter>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import {hasWhiteSpace} from '@/views/../genFunctions/genFunctions'
import { storeDM } from '../../redux/store'
export default {
  name: 'FormsUserCreate',
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
