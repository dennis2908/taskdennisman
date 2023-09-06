import { createStore } from 'redux'
import Vuex from 'vuex'

const initialState = {
	modulState: "",
	HeadModal: "",
	ShowHideAl: "d-none",
	loading: true,
	activePage: 1,
	titleModal: ""
}

const reducer = (state = initialState, action) => {
	if (action.type === "CHANGE_STATE") {
		if (action.payload.modulState)
			state.modulState = action.payload.modulState;
		if (action.payload.HeadModal)
			state.HeadModal = action.payload.HeadModal;
		if (action.payload.ShowHideAl)
			state.ShowHideAl = action.payload.ShowHideAl;
		if (action.payload.loading) {
			state.loading = action.payload.loading;
		}
		if (action.payload.titleModal) {
			state.titleModal = action.payload.titleModal;

		}
		//break;
		console.log(state)


	}

	return state
}

const storeDM = new Vuex.Store({
	state: {
		active: 'login',
		login: true,
		register: false,
		titleModal: "Tambah Akun Baru",
		warningModal: false,
		confirmModal: false,
		formData: {
			id: '',
			nama: '',
			password: '',
			tgl_daftar: '',
			idPengguna:"",
			idPeran: ""
		},
		id: 2
	},
	actions: {
		changeTitle({ title }) {
			this.state.titleModal = title
			console.log(title)
		},
	},
	mutations: {
		toggleActive: (state) => {
			return state.active = !state.active;
		},
		changeTitleModal(state, { title }) {
			state.titleModal = title;
		},
		changeWarningModal(state, { modalState }) {
			state.warningModal = modalState;
		},
		changeConfirmModal(state, { modalState }) {
			state.confirmModal = modalState;
		},
		EmptyFormData(state) {
			state.formData.id = "";
			state.formData.nama = "";
			state.formData.password = "";
			state.formData.tgl_daftar = "";
			state.formData.idPengguna = "";
			state.formData.idPeran = "";
		},
		changeFormData(state, { getData }) {
			state.formData.id = getData.id;
			state.formData.nama = getData.nama;
			state.formData.password = getData.password;
			if (Object.keys(getData).length > 0) {
				if (typeof getData.tgl_daftar !== 'undefined') {
					state.formData.tgl_daftar = getData.tgl_daftar.substring(0, 10);
				}
			}

			state.formData.idPengguna = getData.idPengguna;
			state.formData.idPeran = getData.idPeran;
			// state.formData.tgl_daftar = getData.tgl_daftar;
		}
	},
})

const store = createStore(reducer)

//const store} = useContext(ReactReduxContext)

export { store, storeDM }