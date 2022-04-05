<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Violetta Art Institute</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
        <ul  class="navbar-nav">
          <li><router-link to="/admin/products" class="nav-link" @click="closeNavHam">產品</router-link></li>
          <li><router-link to="/admin/orders" class="nav-link" @click="closeNavHam">訂單</router-link></li>
          <li><router-link to="/admin/coupons" class="nav-link" @click="closeNavHam">優惠券</router-link></li>
          <a href="#" @click.prevent="logout" class="nav-link">登出</a>
        </ul>
        <div class="navbar-nav ms-auto">
          <router-link to="/user/cart" class="nav-link">購物車</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>

export default {
  inject: ['emitter'],
  methods: {
    logout() {
      const api = `${process.env.VUE_APP_API}/logout`;
      this.$http.post(api)
        .then((response) => {
          this.$httpMessageState(response, '登出');
          if (response.data.success) {
            this.$router.push('/');
          }
        }).catch((error) => {
          this.$httpMessageState(error.response, '錯誤訊息');
        });
    },
  },
};
</script>
