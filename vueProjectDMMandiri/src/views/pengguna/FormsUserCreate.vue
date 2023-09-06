<template>
  <div>
    <CRow>
      <CCol sm="12">
        <CCard style="overflow: scroll">
          <CForm novalidate style="height: 500px">
            <CCardBody>
              <CInput
                type="hidden"
                required
                v-model="storeDM.state.formData.id"
              />
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
                :invalid-feedback="formDataMessage.cabang"
                :is-valid="validatorOffice"
                required
                valid-feedback="Great!!"
                v-model="storeDM.state.formData.cabang"
                :options="this.items"
              />
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
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { hasWhiteSpace } from "@/views/../genFunctions/genFunctions";
import { storeDM } from "../../redux/storePengguna";
export default {
  name: "FormsUserCreate",
  data() {
    return {
      items: [{ value: "", label: "Pilih Cabang" }],
      storeDM: storeDM,
      formDataMessage: {
        nama: "",
        alamat: "",
        kodePos: "",
        provinsi: "",
        cabang: ""
      }
    };
  },
  watch: {
    value(value) {
      console.log(value);
      // or generate/simulate a native events (not sure how, but its outside Vue's realm I think
    }
  },
  props: ["closeFormModal", "loadMyData", "cabangx"],
  mounted() {
    // this.items = [];
    this.loadCabang();
  },
  methods: {
    loadCabang() {
      fetch("http://localhost:8080/api/cabangs")
        .then((res) => res.json())
        .then((result) => {
          result.forEach((k, j) => {
            if (j == 0) storeDM.state.formData.cabang = k.id;

            this.items.push({
              value: k.id,
              label: k.kodeCabang + " - " + k.namaCabang
            });
          });
        });
    },
    submit(event) {
      if (
        storeDM.state.formData.nama !== "" &&
        storeDM.state.formData.alamat !== "" &&
        storeDM.state.formData.kodePos !== "" &&
        storeDM.state.formData.provinsi !== "" &&
        storeDM.state.formData.cabang !== ""
      ) {
        if (!storeDM.state.formData.id && !storeDM.state.formData.id) {
          delete storeDM.state.formData.id;
          fetch("http://localhost:8080/api/penggunas", {
            method: "post",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(storeDM.state.formData)
          })
            .then((res) => res.json())
            .then((result) => {
              this.$emit("save");
              this.closeModal();
              this.loadMyData();
            });
        } else {
          console.log(444444444, storeDM.state.formData.alamat);
          fetch(
            "http://localhost:8080/api/penggunas/" + storeDM.state.formData.id,
            {
              method: "put",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(storeDM.state.formData)
            }
          )
            .then((res) => res.json())
            .then((result) => {
              console.log(21313132);
              this.$emit("save");
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
        this.formDataMessage.nama = "Please provide at least 3 characters.";

      if (this.formDataMessage.nama) return false;
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
    }
  }
};
</script>
