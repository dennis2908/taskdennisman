<template>
	<div>
		<CRow>
			<CCol sm="12">
				<CCard style="overflow:scroll;">
					<CForm novalidate style="height: 500px;">
						<CCardBody>
							<CInput type="hidden" required v-model="storeDM.state.formData.nama" />
							<CInput type="text" description="Please enter your name." autocomplete="name" label="Name"
								placeholder="Enter Name..." required v-model="storeDM.state.formData.nama"
								valid-feedback="Great!!" :invalid-feedback="formDataMessage.nama"
								:is-valid="validatorName" />
							<CInput type="text" v-model="storeDM.state.formData.password"
								description="Please enter your password." autocomplete="current-password" label="Password"
								placeholder="Enter Password..." required valid-feedback="Great!!"
								:invalid-feedback="formDataMessage.password" :is-valid="validatorPassword" />
							<CInput type="date" description="Please enter your date birth" autocomplete="Birth Date"
								label="Birth Date" placeholder="Enter Birth Date..." required
								v-model="storeDM.state.formData.tgl_daftar" valid-feedback="Great!!"
								:invalid-feedback="formDataMessage.tgl_daftar" :is-valid="validatorDate" />
							<CSelect description="Please enter your Account." label="Account" required
								valid-feedback="Great!!" v-model="storeDM.state.formData.idPengguna"
								:options="this.itemsPengguna" />
							<CSelect description="Please enter your Role." label="Role" required valid-feedback="Great!!"
								v-model="storeDM.state.formData.idPeran" :options="this.itemsPeran" />
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
import { hasWhiteSpace } from '@/views/../genFunctions/genFunctions'
import { storeDM } from '../../redux/store'
export default {
	name: 'FormsUserCreate',
	data() {
		return {
			storeDM: storeDM,
			formData: {
				nama: "",
				password: "",
				tgl_daftar: "",
				idPengguna: "",
				idPeran: ""
			},
			formDataMessage: {
				nama: "",
				password: "",
				tgl_daftar: "",
				idPengguna: "",
				idPeran: ""
			},

			itemsPengguna: [{ value: "", label: "Pilih Pengguna" }],
			itemsPeran: [{ value: "", label: "Pilih Peran" }]

		}
	},
	watch: {
		value(value) {
			console.log(value)
			// or generate/simulate a native events (not sure how, but its outside Vue's realm I think
		}
	},
	mounted() {
		this.loadPengguna();
		this.loadRole();
	},
	props: ['closeFormModal', 'loadMyData'],
	methods: {
		loadPengguna() {
			fetch("http://localhost:8080/api/penggunas/PenggunaData")
				.then(res => res.json())
				.then(
					(result) => {
						result.forEach((k, j) => {
							this.itemsPengguna.push({ value: k.id, label: k.id + " - " + k.nama + " - " + k.kodeCabang + " - " + k.namaCabang });
						});

					});
		},
		loadRole() {
			fetch("http://localhost:8080/api/perans")
				.then(res => res.json())
				.then(
					(result) => {
						result.forEach((k, j) => {
							this.itemsPeran.push({ value: k.id, label: k.kodePeran + " - " + k.namaPeran });
						});

					});
		},
		submit(event) {
			if (this.formDataMessage.nama === "" && this.formDataMessage.password === "" && this.formDataMessage.tgl_daftar === "" && this.formDataMessage.idPengguna === "" && this.formDataMessage.idPeran === "") {
				if (!storeDM.state.formData.id && !storeDM.state.formData.id) {
					delete storeDM.state.formData.id;
					fetch("http://localhost:8080/api/akuns", {
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
								this.closeModal();
								this.loadMyData();

							});
				}
				else {
					fetch("http://localhost:8080/api/akuns/" + storeDM.state.formData.id, {
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
		validatorName(val) {
			this.formDataMessage.nama = "";
			if (val.length < 3)
				this.formDataMessage.nama = "Please provide at least 3 characters."

			if (hasWhiteSpace(val))
				this.formDataMessage.nama += " Please remove white spaces"

			if (this.formDataMessage.nama)
				return false;
			else
				return val;
		},
		validatorDate(val) {
			this.formDataMessage.name = "";
			if (val.length < 3)
				this.formDataMessage.name = "Please provide at least 3 characters."

			if (this.formDataMessage.name)
				return false;
			else
				return val;
		},
		validatorPassword(val) {
			this.formDataMessage.password = "";
			if (val.length < 7)
				this.formDataMessage.password = "Please provide at least 7 characters."

			if (hasWhiteSpace(val))
				this.formDataMessage.password += " Please remove white spaces"

			if (this.formDataMessage.password)
				return false;
			else
				return val;
		}
	}
}
</script>
