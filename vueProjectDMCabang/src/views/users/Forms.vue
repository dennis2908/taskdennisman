<template>
  <div>
    <CRow>
      <CCol md="6">
        <CCard v-if="showFormPengguna">
          <CCardHeader> <strong>Tambah</strong> Pengguna </CCardHeader>
          <CCardBody>
            <CForm>
              <CInput
                type="text"
                v-model="storeDM.state.formData.nama"
                description="Please enter your name."
                autocomplete="name"
                label="Name"
                placeholder="Enter Name..."
                required
                valid-feedback="Great!!"
                :invalid-feedback="formDataMessage.nama"
                :is-valid="validatorName"
              />
              <CInput
                type="text"
                v-model="storeDM.state.formData.alamat"
                description="Please enter your Address."
                autocomplete="address"
                label="Address"
                placeholder="Enter Address..."
                required
                valid-feedback="Great!!"
                :invalid-feedback="formDataMessage.alamat"
                :is-valid="validatorAddress"
              />
              <CInput
                type="text"
                v-model="storeDM.state.formData.kodePos"
                description="Please enter your Zip Code."
                autocomplete="kodePos"
                label="Zip Code"
                placeholder="Enter Zip Code..."
                required
                valid-feedback="Great!!"
                :invalid-feedback="formDataMessage.kodePos"
                :is-valid="validatorZipCode"
              />
              <CInput
                type="text"
                v-model="storeDM.state.formData.provinsi"
                description="Please enter your Province."
                autocomplete="provinsi"
                label="Province"
                placeholder="Enter Province..."
                required
                valid-feedback="Great!!"
                :invalid-feedback="formDataMessage.provinsi"
                :is-valid="validatorProvince"
              />
              <CSelect
                description="Please enter your Office."
                label="Office"
                required
                v-model="storeDM.state.formData.cabang"
                :options="this.itemsCabang"
              />
            </CForm>
          </CCardBody>
          <CCardFooter>
            <CButton
              type="button"
              @click="submit($event)"
              size="sm"
              color="primary"
            >
              <CIcon name="cil-check-circle" /> Submit
            </CButton>
          </CCardFooter>
        </CCard>
        <CCard v-if="showFormAkun">
          <CCardHeader> <strong>Tambah</strong> Akun </CCardHeader>
          <CForm novalidate>
            <CCardBody>
              <CInput
                type="text"
                description="Please enter your name."
                autocomplete="name"
                label="Name"
                placeholder="Enter Name..."
                required
                v-model="storeDM.state.formData.namaAkun"
                valid-feedback="Great!!"
                :invalid-feedback="formDataMessage.namaAkun"
                :is-valid="validatorNameAkun"
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
              <CInput
                type="date"
                description="Please enter your date birth"
                autocomplete="Birth Date"
                label="Birth Date"
                placeholder="Enter Birth Date..."
                required
                v-model="storeDM.state.formData.tgl_daftar"
                valid-feedback="Great!!"
                :invalid-feedback="formDataMessage.tgl_daftar"
                :is-valid="validatorDate"
              />
              <CSelect
                description="Please enter your Role."
                label="Role"
                required
                v-model="storeDM.state.formData.idPeran"
                :options="this.itemsPeran"
              />
            </CCardBody>
            <CCardFooter>
              <CButton
                type="button"
                @click="submitData($event)"
                size="sm"
                color="primary"
              >
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
import { storeDM } from "../../redux/storePenggunaAkun";
import { hasWhiteSpace } from "@/views/../genFunctions/genFunctions";
export default {
  name: "Forms",
  data() {
    return {
      showFormAkun: false,
      showFormPengguna: true,
      selected: [], // Must be an array reference!
      show: true,
      itemsCabang: [],
      itemsPeran: [],
      formDataMessage: {
        nama: "",
        alamat: "",
        kodePos: "",
        provinsi: "",
        namaAkun: "",
        password: "",
        tgl_daftar: "",
        idPeran: ""
      },
      storeDM: storeDM
    };
  },
  mounted() {
    this.loadCabang();
    this.loadRole();
  },
  methods: {
    submit() {
      if (
        this.formDataMessage.nama === "" &&
        this.formDataMessage.alamat === "" &&
        this.formDataMessage.provinsi === ""
      ) {
        this.showFormPengguna = false;
        this.showFormAkun = true;
      }
    },
    submitData(event) {
      fetch("http://localhost:8080/api/penggunas/PenggunaAkun", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(storeDM.state.formData)
      })
        .then((res) => res.json())
        .then((result) => {
          storeDM.state.formData.nama = "";
          storeDM.state.formData.alamat = "";
          storeDM.state.formData.kodePos = "";
          storeDM.state.formData.provinsi = "";
          storeDM.state.formData.cabang = "";
          storeDM.state.formData.namaAkun = "";
          storeDM.state.formData.password = "";
          storeDM.state.formData.tgl_daftar = "";
          storeDM.state.formData.idPeran = "";
          this.showFormPengguna = true;
          this.showFormAkun = false;
        });
    },
    validator(val) {
      return val ? val.length >= 4 : false;
    },
    loadCabang() {
      fetch("http://localhost:8080/api/cabangs")
        .then((res) => res.json())
        .then((result) => {
          result.forEach((k, j) => {
            if (j == 0) storeDM.state.formData.cabang = k.id;

            this.itemsCabang.push({
              value: k.id,
              label: k.kodeCabang + " - " + k.namaCabang
            });
          });
        });
    },
    loadRole() {
      fetch("http://localhost:8080/api/perans")
        .then((res) => res.json())
        .then((result) => {
          result.forEach((k, j) => {
            if (j == 0) storeDM.state.formData.idPeran = k.id;

            this.itemsPeran.push({
              value: k.id,
              label: k.kodePeran + " - " + k.namaPeran
            });
          });
        });
    },
    validatorName(val) {
      this.formDataMessage.nama = "";
      if (val.length < 3)
        this.formDataMessage.nama = "Please provide at least 3 characters.";

      if (this.formDataMessage.nama) return false;
      else return val;
    },
    validatorNameAkun(val) {
      this.formDataMessage.namaAkun = "";
      if (val.length < 3)
        this.formDataMessage.namaAkun = "Please provide at least 3 characters.";

      if (this.formDataMessage.namaAkun) return false;
      else return val;
    },
    validatorAddress(val) {
      this.formDataMessage.alamat = "";
      if (val.length < 3)
        this.formDataMessage.alamat = "Please provide at least 9 characters.";

      if (this.formDataMessage.alamat) return false;
      else return val;
    },
    validatorZipCode(val) {
      this.formDataMessage.kodePos = "";
      if (val.length < 3)
        this.formDataMessage.kodePos = "Please provide at least 9 characters.";

      if (hasWhiteSpace(val))
        this.formDataMessage.kodePos += " Please remove white spaces";

      if (this.formDataMessage.KodePos) return false;
      else return val;
    },
    validatorProvince(val) {
      this.formDataMessage.provinsi = "";

      if (this.formDataMessage.provinsi) return false;
      else return val;
    },
    validatorOffice(val) {
      this.formDataMessage.office = "";
      if (hasWhiteSpace(val))
        this.formDataMessage.office += " Please remove white spaces";

      if (this.formDataMessage.office) return false;
      else return val;
    },

    validatorDate(val) {
      this.formDataMessage.name = "";
      if (val.length < 3)
        this.formDataMessage.name = "Please provide at least 3 characters.";

      if (this.formDataMessage.name) return false;
      else return val;
    },
    validatorPassword(val) {
      this.formDataMessage.password = "";
      if (val.length < 7)
        this.formDataMessage.password = "Please provide at least 7 characters.";

      if (hasWhiteSpace(val))
        this.formDataMessage.password += " Please remove white spaces";

      if (this.formDataMessage.password) return false;
      else return val;
    }
  }
};
</script>
