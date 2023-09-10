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
                v-model="storeDM.state.formData.kodeCabang"
                description="Please enter your branch code."
                autocomplete="kodeCabang"
                label="Code Branch"
                placeholder="Enter Code Branch"
                required
                valid-feedback="Great!!"
                :invalid-feedback="formDataMessage.kodeCabang"
                :is-valid="validatorCodeBranch"
              />
              <CInput
                type="text"
                v-model="storeDM.state.formData.namaCabang"
                description="Please enter your branch name."
                autocomplete="namaCabang"
                label="Name Branch"
                placeholder="Enter Name Branch..."
                required
                valid-feedback="Great!!"
                :invalid-feedback="formDataMessage.namaCabang"
                :is-valid="validatorNameBranch"
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
import { storeDM } from "../../redux/storeCabang";
export default {
  name: "FormsUserCreate",
  data() {
    return {
      storeDM: storeDM,
      formDataMessage: {
        kodeCabang: "",
        namaCabang: ""
      }
    };
  },
  watch: {
    value(value) {
      console.log(value);
      // or generate/simulate a native events (not sure how, but its outside Vue's realm I think
    }
  },
  props: ["closeFormModal", "loadMyData"],
  methods: {
    submit(event) {
      if (
        storeDM.state.formData.kodeCabang !== "" &&
        storeDM.state.formData.namaCabang !== ""
      ) {
        if (!storeDM.state.formData.id) {
          delete storeDM.state.formData.id;
          fetch("http://localhost:8080/api/cabangs", {
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
          fetch(
            "http://localhost:8080/api/cabangs/" + storeDM.state.formData.id,
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
    validatorCodeBranch(val) {
      this.formDataMessage.kodeCabang = "";
      if (typeof val !== "undefined") {
        if (val.length < 3)
          this.formDataMessage.kodeCabang =
            "Please provide at least 9 characters.";
      }

      if (this.formDataMessage.kodeCabang) return false;
      else return val;
    },
    validatorNameBranch(val) {
      this.formDataMessage.namaCabang = "";
      if (typeof val !== "undefined") {
        if (val.length < 3)
          this.formDataMessage.namaCabang =
            "Please provide at least 9 characters.";
      }

      if (this.formDataMessage.namaCabang) return false;
      else return val;
    }
  }
};
</script>
