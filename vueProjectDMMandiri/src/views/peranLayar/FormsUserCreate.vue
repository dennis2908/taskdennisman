<template>
	<div>
		<CRow>
			<CCol sm="12">
				<CCard style="overflow: scroll">
					<CForm validate style="height:500px" @submit="submit">
						<CCardBody>
							<CInput type="hidden" required v-model="storeDM.state.formData.id" />
							<CSelect description="Please enter your Role." label="Role" valid-feedback="Great!!"
								:invalid-feedback="formDataMessage.idPeran" :is-valid="validatorScreen"
								v-model="storeDM.state.formData.idPeran" :options="this.itemsPeran" required />
							<CSelect description="Please enter your Screen." label="Screen" valid-feedback="Great!!"
								:invalid-feedback="formDataMessage.idLayar" :is-valid="validatorRole"
								v-model="storeDM.state.formData.idLayar" :options="this.itemsLayar" required />
						</CCardBody>
						<CCardFooter>
							<CButton type="submit" size="sm" color="primary">
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
import { storeDM } from '../../redux/storePeranLayar'
export default {
	name: 'FormsUserCreate',
	data() {
		return {
			storeDM: storeDM,
			formDataMessage: {
				idPeran: "",
				idLayar: ""
			},
			itemsLayar: [{ value: "", label: "Pilih Layar" }],
			itemsPeran: [{ value: "", label: "Pilih Peran" }],

		}
	},
	watch: {
		value(value) {
			console.log(value)
			// or generate/simulate a native events (not sure how, but its outside Vue's realm I think
		}
	},
	props: ['closeFormModal', 'loadMyData'],
	mounted() {
		this.loadPeran();
		this.loadLayar();
	},
	methods: {
		loadPeran() {
			fetch("http://localhost:8080/api/perans")
				.then(res => res.json())
				.then(
					(result) => {


						result.forEach((k, j) => {
							this.itemsPeran.push({ value: k.id, label: k.kodePeran + " - " + k.namaPeran });
						});

					});
		},
		loadLayar() {
			fetch("http://localhost:8080/api/layars")
				.then(res => res.json())
				.then(
					(result) => {


						result.forEach((k, j) => {
							this.itemsLayar.push({ value: k.id, label: k.kodeLayar + " - " + k.namaLayar });
						});

					});
		},
		submit() {
			if (storeDM.state.formData.idLayar !== "" && storeDM.state.formData.idPeran !== "") {
				if (!storeDM.state.formData.id) {
					delete storeDM.state.formData.id;
					fetch("http://localhost:8080/api/peranLayars", {
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
					fetch("http://localhost:8080/api/peranLayars/" + storeDM.state.formData.id, {
						method: "put",
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
			}
		},
		closeModal() {
			this.closeFormModal();
		},
		validatorScreen(val) {
			this.formDataMessage.idLayar = "";
			if (typeof val !== 'undefined') {
				if (val.length < 1)
					this.formDataMessage.idPeran = "Please choose screen."
			}

			if (this.formDataMessage.idPeran)
				return false;
			else
				return val;
		},
		validatorRole(val) {
			this.formDataMessage.idPeran = "";
			if (typeof val !== 'undefined') {
				if (val.length < 1)
					this.formDataMessage.idPeran = "Please choose role."
			}

			if (this.formDataMessage.idPeran)
				return false;
			else
				return val;
		},
	}
}
</script>
