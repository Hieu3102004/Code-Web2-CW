<template>
  <div id="app">
    <div class="ui inverted segment navbar">
      <div class="ui center aligned container">
        <div class="ui large secondary inverted pointing menu compact">

          <router-link to="/responses" exact class="item">
            <i class="comment outline icon"></i> Library
          </router-link>

          <router-link to="/responses/new" class="item">
            <i class="plus circle icon"></i> New Response
          </router-link>

          <router-link to="/statistics" class="item">
            <i class="chart bar outline icon"></i> Stats
          </router-link>

          <router-link to="/test" class="item">
            <i class="graduation cap icon"></i> Test
          </router-link>

        </div>
      </div>
    </div>

    <div class="ui text container">
      <flash-message class="myFlash"></flash-message>
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app > div.navbar {
  margin-bottom: 2em;
  background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%) !important;
  border: none !important;
  border-radius: 0 !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1) !important;
}

.ui.secondary.inverted.pointing.menu {
  border-bottom: 1px solid rgba(255,255,255,0.1) !important;
}
.ui.secondary.inverted.pointing.menu .item {
  font-weight: 500;
  letter-spacing: 0.5px;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.ui.secondary.inverted.pointing.menu .item:hover {
  opacity: 1;
}
.ui.secondary.inverted.pointing.menu .active.item {
  border-color: #fff !important;
  color: #fff !important;
  font-weight: bold;
  opacity: 1;
}

.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50px;
  right: 0;
}

input {
  width: 300px;
}

div.label {
  width: 120px;
}

div.input {
  margin-bottom: 10px;
}

button.ui.button {
  margin-top: 15px;
  display: block;
}
</style>