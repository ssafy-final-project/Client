<template>
  <nav id="nav" class="d-flex mx-auto">
    <slot></slot>
  </nav>
</template>

<style scoped lang="scss">
::v-deep(.nav-item) {
  width: 200px;
  height: 60px;
  border: 1px solid lightgrey;
  border-right: none;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: black;

  &:last-child {
    border-right: 1px solid lightgrey;
  }
}

::v-deep(.router-link-exact-active) {
  background-color: #121212;
  color: whitesmoke;
}
</style>
