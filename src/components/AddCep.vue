<template>
  <div class="cepSearch">
    <div class="cepInput">
      <input type="text" placeholder="insira o CEP" v-model="cepText" />
      <button type="button" @click="saveCep">
        <label>
          <img src="@/assets/icone-plus.svg" /> Adicionar endereço
        </label>
      </button>
    </div>
    <div class="cepList">
      <ul>
        <li v-for="cep in ceps">
          <img src="@/assets/icone-lugar.svg" /> <b>CEP</b>
          <label>{{ cep }}</label>
        </li>
      </ul>
    </div>
    <div>
      <button type="button" @click="gerarEnderecos">
        <label> Gerar endereço </label>
      </button>
    </div>
    <hr />
    <div style="margin-top: 30px" v-for="endereco in enderecos">
      <img src="@/assets/icone-lugar.svg" />
      <br />
      <b>{{ endereco.logradouro }}, {{ endereco.bairro }}</b>
      <br />
      <label>{{ endereco.localidade }} - {{ endereco.uf }}</label>
      <br />
      <label>{{ endereco.cep }}</label>
      <br />
      <img
        src="@/assets/icone-lixo.svg"
        @click="removeEndereco(endereco.cep)"
      />
      <br />
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

        if (cepExisteNosCeps === false && cepExisteNosEnderecos <= 0) {
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
              data.localidade
            );
            store.dispatch("insertEndereco", endereco);

            store.state.ceps.splice(store.state.ceps.indexOf(value), 1);
          }
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

.cepList {
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: flexbox;
    margin: 0 0px;
  }
}

.cepSearch {
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 211px;
  gap: 10px;

  position: absolute;
  width: 292px;
  height: 52px;
  left: 460px;
  top: 121px;
}

button {
  background: $primary-color;
  border-color: #b600ee;
  border-radius: 8px;
  color: #ffffff;
}

.cepInput {
  align-items: center;
  align-content: center;
  align-self: center;

  input {
    width: 90px;
    height: 22px;

    color: #75818c;

    flex: none;
    order: 0;
    flex-grow: 0;
  }
}

body {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;

  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
}
</style>
