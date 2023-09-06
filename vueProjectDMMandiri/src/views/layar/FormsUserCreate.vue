<template>
	<div>
		<CRow>
			<CCol sm="12">
				<CCard style="overflow: scroll">
					<CForm novalidate style="height:500px">
						<CCardBody>
							<CInput type="hidden" required v-model="storeDM.state.formData.id" />
							<CInput type="text" v-model="storeDM.state.formData.kodeLayar"
								description="Please enter your screen code." autocomplete="kodeLayar" label="Screen Code"
								placeholder="Enter Name..." required valid-feedback="Great!!"
								:invalid-feedback="formDataMessage.kodeLayar" :is-valid="validatorCodeBranch" />
							<CInput type="text" v-model="storeDM.state.formData.namaLayar"
								description="Please enter your Name Sreen." autocomplete="namaLayar" label="Screen Name"
								placeholder="Enter Name Branch..." required valid-feedback="Great!!"
								:invalid-feedback="formDataMessage.namaLayar" :is-valid="validatorNameBranch" />
						</CCardBody>
						<CCardFooter>
							<CButton type="button" @click="submit($event)" size="sm" color="primary">
								<CIcon name="cil-check-circle" /> Submit
							</CButton>
						</CCardFooter>
					</CForm>
				</CCard>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import { storeDM } from '../../redux/storeLayar'
export default {
	name: 'FormsUserCreate',
	data() {
		return {
			storeDM: storeDM,
			formDataMessage: {
				kodeLayar: "",
				namaLayar: ""
			}

		}
	},
	watch: {
		value(value) {
			console.log(value)
			// or generate/simulate a native events (not sure how, but its outside Vue's realm I think
		}
	},
	props: ['closeFormModal', 'loadMyData'],
	methods: {
		submit(event) {
			if (storeDM.state.formData.namaLayar !== "" && storeDM.state.formData.kodeLayar !== "") {
				if (!storeDM.state.formData.id) {
					delete storeDM.state.formData.id;
					fetch("http://localhost:8080/api/layars", {
						method: "post",
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(storeDM.state.formData)
					}).then(res => res.json())
						.then(
							(result) => {
								this.$emit('save');
								this.closeModal();
								this.loadMyData();

							});
				}
				else {
					fetch("http://localhost:8080/api/layars/" + storeDM.state.formData.id, {
						method: "put",
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
								this.closeModal();
								this.loadMyData();

							});

				}
			}
		},
		closeModal() {
			this.closeFormModal();
		},
		validatorCodeBranch(val) {
			this.formDataMessage.kodeLayar = "";
			if (typeof val !== 'undefined') {
				if (val.length < 3)
					this.formDataMessage.kodeLayar = "Please provide at least 9 characters."
			}

			if (this.formDataMessage.kodeLayar)
				return false;
			else
				return val;
		},
		validatorNameBranch(val) {
			this.formDataMessage.namaLayar = "";
			if (typeof val !== 'undefined') {
				if (val.length < 3)
					this.formDataMessage.namaLayar = "Please provide at least 9 characters."
			}

			if (this.formDataMessage.namaLayar)
				return false;
			else
				return val;
		}
	}
}
</script>
