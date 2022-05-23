<template>
  <nav class="navbar navbar-expand-sm navbar-purple bg-purple">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo.svg" />
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav ms-left">
          <button type="button" class="btn btn-outline-light me-2">
            <b class="informacao">Surreal São Paulo</b>
            <label class="sub-informacao">VTEX</label>
          </button>
        </div>
        <div class="navbar-nav ms-auto">
          <button type="button" class="btn btn-outline-light me-2 button-user">
            <img src="@/assets/icone-bell.svg" />
          </button>
          <button type="button" class="btn btn-outline-light me-2 button-user">
            Olá, Joaquim <img src="@/assets/usuario.svg" />
          </button>
        </div>
      </div>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-auto bg-light sticky-top">
        <div
          class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top"
        >
          <ul
            class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center justify-content-between w-100 px-0 align-items-center"
          >
            <li class="nav-item">
              <a
                href="#"
                class="nav-link py-3 px-2"
                title=""
                data-bs-toggle="tooltip"
                data-bs-placement="right"
              >
                <img src="@/assets/icone-busca.svg" />
              </a>
            </li>
            <li>
              <a
                href="#"
                class="nav-link py-3 px-2"
                title=""
                data-bs-toggle="tooltip"
                data-bs-placement="right"
              >
                <img src="@/assets/icone-folder.svg" />
              </a>
            </li>
          </ul>
          <div class="">
            <div class="dropdown">
              <a
                href="#"
                class="d-flex align-items-center justify-content-center p-3 link-dark text-decoration-none fixed-user"
                data-bs-toggle="tooltip"
              >
                <img class="img-ajuste" src="@/assets/icone-ajuste.svg" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sm p-3 min-vh-100">
        <AddCep />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import AddCep from "@/components/AddCep.vue";

@Options({
  components: {
    AddCep,
  },
})
export default class AddCepView extends Vue {}
</script>

<style scoped lang="scss">
.navbar-purple .navbar-brand {
  color: #ffffff;
}
.bg-purple {
  background-color: #9206e9;
}

.informacao {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  /* identical to box height */

  display: flex;
  align-items: center;
}
.sub-informacao {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.02em;
}

.button-user {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  display: flex;
  align-items: center;

  border: none;
}
// $primary-color: #b600ee;

.fixed-user {
  position: fixed;
  // right: 0;
  bottom: 0;
  left: 0;
  z-index: 1030;
}

.img-ajuste {
  background: #20272c;
  border-radius: 10px;
}
</style>
