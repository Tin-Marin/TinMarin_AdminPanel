<template>
  <div class="loader">
    <div class="frame">
      <div class="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  template: 'loader'
}
</script>

<style scoped>
.loader {
  background-color: rgba(0, 0, 0, 0.1);
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 10;
}
.frame {
  align-items: center;
  display: flex;
  height: inherit;
  justify-content: center;
  margin: auto;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #1976d2;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>
