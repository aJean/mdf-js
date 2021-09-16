<template>
  <div>
    <h3>home-layout</h3>
    <ul>
      <li><RouterLink to="/home/a">跳转到 a</RouterLink></li>
      <li><RouterLink to="/home/c">跳转到 c</RouterLink></li>
    </ul>
    <router-view />
  </div>
</template>