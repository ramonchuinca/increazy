<template>
  <form class="row g-3">
    <div class="col-2">
      <input
        type="text"
        class="form-control"
        placeholder="insira o CEP"
        v-model="cepText"
      />
    </div>
    <div class="col-2">
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-purple" @click="saveCep">
          <img
            src="@/assets/icone-plus.svg"
            class="bi bi-bookmark-plus-fill text-primary"
          />
          Adicionar endereço
        </button>
      </div>
    </div>
  </form>
  <div class="mt-5 mb-5">
    <ul class="list-group">
      <li v-for="cep in ceps" class="list-group-item">
        <img src="@/assets/icone-lugar.svg" /> <b>CEP </b>
        <label>{{ cep }}</label>
      </li>
    </ul>
  </div>
  <div class="row g-3">
    <div class="col-2 offset-2">
      <div class="d-grid gap-2">
        <button type="button" class="btn btn-purple" @click="gerarEnderecos">
          <label> Gerar endereço </label>
        </button>
      </div>
    </div>
  </div>

  <hr />
  <div class="card mb-3 card-custom" v-for="endereco in enderecos">
    <div class="row g-0">
      <div class="col-md-1">
        <div class="card-body">
          <div class="card-text">
            <img src="@/assets/icone-lugar.svg" />
          </div>
        </div>
      </div>
      <div class="col-7">
        <div class="card-body">
          <div class="card-text">
            <b>{{ endereco.logradouro }}, {{ endereco.bairro }} </b>

            <br />

            <small class="text-muted">
              {{ endereco.localidade }} - {{ endereco.uf }}
            </small>
          </div>
        </div>
      </div>
      <div class="col-3" style="border-right: 2px solid #e0e6ea">
        <div class="card-body">
          <div class="card-text">
            <div class="text-end">
              <label>{{ endereco.cep }}</label>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1">
        <div class="card-body">
          <div class="card-text">
            <div class="text-end">
              <img
                src="@/assets/icone-lixo.svg"
                @click="removeEndereco(endereco.cep)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import axios from "axios";
import { Endereco } from "@/model/endereco";

export default defineComponent({
  data() {
    return {
      cepText: "",
    };
  },
  computed: {
    ceps() {
      return store.state.ceps;
    },
    enderecos() {
      return store.state.enderecos;
    },
  },
  methods: {
    saveCep() {
      const validacep = /^[0-9]{8}$/;
      const cepValido = validacep.test(this.cepText);

      if (cepValido) {
        const cepExisteNosCeps = store.state.ceps.includes(this.cepText);
        const cepExisteNosEnderecos = store.state.enderecos.findIndex(
          (e) => e.cep === this.cepText
        );

        console.log("cepExisteNosEnderecos");
        console.log(cepExisteNosEnderecos);
        console.log(cepExisteNosEnderecos != -1);
        if (cepExisteNosCeps === false && cepExisteNosEnderecos == -1) {
          store.dispatch("insertCep", this.cepText);
        } else {
          this.$toast.warning(`O cep ${this.cepText} já exixte!`);
        }
      } else {
        this.$toast.warning("Cep inválido!");
      }

      this.cepText = "";
    },
    gerarEnderecos() {
      const ceps = store.state.ceps;
      ceps.forEach((value) => this.buscarEndereco(value));
    },
    buscarEndereco(value: string) {
      axios
        .get(`https://viacep.com.br/ws/${value}/json`)
        .then((response) => {
          const data = response.data;
          const cepInexistente: boolean = data.erro;
          if (cepInexistente) {
            this.$toast.error(`O CEP ${value} está inválido!`);
          } else {
            let endereco = new Endereco(
              data.cep,
              data.localidade,
              data.uf,
              data.bairro,
              data.logradouro
            );
            store.dispatch("insertEndereco", endereco);
          }

          store.state.ceps.splice(store.state.ceps.indexOf(value), 1);
        })
        .catch(() => {
          this.$toast.error(`Ocorreu um erro ao buscar o CEP: ${value}`);
        });
    },
    removeEndereco(cep: string) {
      store.dispatch("removeEndereco", cep);
    },
  },
});
</script>

<style scoped lang="scss">
$primary-color: #b600ee;
.btn-purple {
  color: #fff;
  background-color: $primary-color;
  border-color: $primary-color;
}

.list-group-item {
  border: none;
}

.card-custom {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(32, 39, 44, 0.1);
  border-radius: 8px;
  width: 609px;
}

.text-end {
  color: $primary-color;
}
</style>
