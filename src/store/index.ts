import { createStore } from 'vuex'
import { Endereco } from '@/model/endereco'

export default createStore({
  state: {
    ceps: ['76808072', '76804364'],
    enderecos: Array<Endereco>()
  },
  getters: {
  },
  mutations: {
    INSERT_CEP(state, cep){
      state.ceps.push(cep)
    },
    INSERT_ENDERECO(state, endereco: Endereco){
      state.enderecos.push(endereco)
    },
    REMOVE_ENDERECO(state, cep: string){
      const indice = state.enderecos.findIndex(e=>e.cep === cep);
      state.enderecos.splice(indice, 1);
    }
  },
  actions: {
    async insertCep({commit}, payload) {
      commit('INSERT_CEP', payload)
    },
    async insertEndereco({commit}, payload: Endereco) {
      commit('INSERT_ENDERECO', payload)
    },
    async removeEndereco({commit}, payload: string) {
      commit('REMOVE_ENDERECO', payload)
    }
  },
  modules: {
  }
})
