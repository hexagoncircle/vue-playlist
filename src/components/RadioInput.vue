<template>
  <div class="input-wrapper">
    <input
      type="radio"
      :id="label"
      :name="name"
      :value="label"
      v-model="inputValue"
    >
    <label :for="label" >{{ label | capitalize }}</label>
  </div>
</template>

<script>
  export default {
    name: 'RadioInput',

    props: {
      name: String,
      label: String,
      value: String
    },

    computed: {
      inputValue: {
        get() {
          return this.value;
        },
        set() {
          this.$emit("change", this.label);
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/components/RadioInput";
</style>
