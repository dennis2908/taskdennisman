<template>
	<CModal title="Confirmation" color="danger" :show.sync="storeDM.state.confirmModal">
		<FormsConfirm />
		<template #footer>
			<CButton @click="submit" color="danger">
				<CIcon name="cil-check-circle" /> Confirm
			</CButton>
			<CButton @click="storeDM.commit('changeConfirmModal', { modalState: false })" color="secondary">
				<CIcon name="cil-x-circle" /> Cancel
			</CButton>
		</template>

	</CModal>
</template>
<script>
import { storeDM } from '@/views/../redux/storePengguna'
import FormsConfirm from '@/views/pengguna/FormsConfirm'
export default {
	name: 'ModalConfirm',
	components: { FormsConfirm },
	data() {
		return {
			storeDM: storeDM

		}
	},
	props: ['loadTheData'],
	methods: {
		async submit() {
			await fetch("http://localhost:8080/api/penggunas/" + storeDM.state.formData.id, {
				method: "delete",
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			});
			storeDM.commit('changeConfirmModal', { modalState: false })
			this.loadTheData();

		}
	}

}
</script>