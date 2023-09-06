<template>
  <div class="c-app flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol md="5">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm ref="form" @submit="submit($event)">
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <CInput
                    placeholder="Username"
                    autocomplete="username email"
                    label="Username"
                    v-model="formData.nama"
                    required="required"
                    valid-feedback="Great!!"
                    :invalid-feedback="formDataMessage.nama"
                    :is-valid="validatorUsername"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-user" />
                    </template>
                  </CInput>
                  <CInput
                    placeholder="Password"
                    label="Password"
                    v-model="formData.password"
                    type="password"
                    autocomplete="curent-password"
                    required="required"
                    valid-feedback="Great!!"
                    :invalid-feedback="formDataMessage.password"
                    :is-valid="validatorPassword"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CInput>
                  <CSelect
                    description="Please enter your role."
                    label="Role"
                    required
                    v-model="formData.idPeran"
                    :options="this.items"
                  >
                    <template #prepend-content>
                      <CIcon name="cil-lock-locked" />
                    </template>
                  </CSelect>
                  <CRow>
                    <CCol col="6" class="text-left">
                      <CButton color="primary" type="submit" class="px-4"
                        >Login</CButton
                      >
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>
<script>
import { hasWhiteSpace } from "@/views/../genFunctions/genFunctions";
export default {
  name: "Signin",
  data() {
    return {
      items: [],
      formData: {
        nama: "",
        password: "",
        idPeran: 1
      },
      formDataMessage: {
        nama: "",
        password: "",
        idPeran: 1
      },
      result: []
    };
  },
  watch: {
    value(value) {
      console.log(value);
      // or generate/simulate a native events (not sure how, but its outside Vue's realm I think
    }
  },
  mounted() {
    this.loadPeran();
    localStorage.setItem("DataVue", "");
    localStorage.setItem("Layar", "");
  },
  methods: {
    loadPeran() {
      fetch("http://localhost:8080/api/perans")
        .then((res) => res.json())
        .then((result) => {
          result.forEach((k, j) => {
            console.log(k);
            this.items.push({
              value: k.id,
              label: k.kodePeran + " - " + k.namaPeran
            });
          });
        });
    },
    async submit(event) {
      await fetch("http://localhost:8080/api/akuns/Login", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.formData)
      })
        .then((res) => res.json())
        .then((result) => {
          // this.$emit('save');
          // this.closeModal();
          // this.loadMyData();
          this.result = result;

          // console.log(55555,JSON.parse(localStorage.getItem('DataVue'))["id"])
          // return false;
        });
      console.log(Object.keys(this.result).length);
      if (this.result.length > 0) {
        localStorage.setItem("Layar", JSON.stringify(this.result));
        localStorage.setItem("DataVue", JSON.stringify(this.formData));
        console.log(localStorage.getItem("Layar"));
        console.log(localStorage.getItem("DataVue"));
        window.location.href = "";
      }
      // console.log(this.formData.username)
      // if (!this.formDataMessage.password && !this.formDataMessage.password && this.formData.username === "console" && this.formData.password === "myconsole") {
      //   localStorage.setItem('DataVue', window.btoa(window.btoa(window.btoa(window.btoa(this.formData.username)))));
      //   location.reload()
      // }
      // else {
      //   this.formData.username = ""
      //   this.formData.password = ""
      // }
    },
    validatorUsername(val) {
      this.formDataMessage.username = "";
      if (val.length < 4)
        this.formDataMessage.username = "Please provide at least 4 characters.";

      if (hasWhiteSpace(val))
        this.formDataMessage.username += " Please remove white spaces";

      if (this.formDataMessage.username) return false;
      else return val;
    },
    validatorPassword(val) {
      this.formDataMessage.password = "";
      if (val.length < 4)
        this.formDataMessage.password = "Please provide at least 4 characters.";

      if (hasWhiteSpace(val))
        this.formDataMessage.password += " Please remove white spaces";

      if (this.formDataMessage.password) return false;
      else return val;
    }
  }
};
</script>
