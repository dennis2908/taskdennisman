<template>
	<div>
		<CRow>
			<CCol sm="12">
				<CCard style="overflow: scroll">
					<CForm novalidate style="height:500px">
						<CCardBody>
							<CInput type="hidden" required v-model="storeDM.state.formData.id" />
							<CInput type="text" v-model="storeDM.state.formData.kodePeran"
								description="Please enter your screen code." autocomplete="kodePeran" label="Act Code"
								placeholder="Enter Name..." required valid-feedback="Great!!"
								:invalid-feedback="formDataMessage.kodePeran" :is-valid="validatorCodeBranch" />
							<CInput type="text" v-model="storeDM.state.formData.namaPeran"
								description="Please enter your Name Sreen." autocomplete="namaPeran" label="Act Name"
								placeholder="Enter Name Branch..." required valid-feedback="Great!!"
								:invalid-feedback="formDataMessage.namaPeran" :is-valid="validatorNameBranch" />
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
import { storeDM } from '../../redux/storePeran'
export default {
	name: 'FormsUserCreate',
	data() {
		return {
			storeDM: storeDM,
			formDataMessage: {
				kodePeran: "",
				namaPeran: ""
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
			if (storeDM.state.formData.kodePeran !== "" && storeDM.state.formData.namaPeran !== "") {
				if (!storeDM.state.formData.id) {
					delete storeDM.state.formData.id;
					fetch("http://localhost:8080/api/perans", {
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
					fetch("http://localhost:8080/api/perans/" + storeDM.state.formData.id, {
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
			this.formDataMessage.kodePeran = "";
			if (typeof val !== 'undefined') {
				if (val.length < 3)
					this.formDataMessage.kodePeran = "Please provide at least 9 characters."
			}

			if (this.formDataMessage.kodePeran)
				return false;
			else
				return val;
		},
		validatorNameBranch(val) {
			this.formDataMessage.namaPeran = "";
			if (typeof val !== 'undefined') {
				if (val.length < 3)
					this.formDataMessage.namaPeran = "Please provide at least 9 characters."
			}

			if (this.formDataMessage.namaPeran)
				return false;
			else
				return val;
		}
	}
}
</script>
