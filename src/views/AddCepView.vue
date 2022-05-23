<template>
  <div>
    <AddCep />
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
