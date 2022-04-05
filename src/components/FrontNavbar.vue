<template>
   <div class="bg-white sticky-top">
      <div class="container">
        <nav class="navbar px-0 navbar-expand-lg navbar-light bg-white">
            <router-link to="/" class="navbar-brand position-absolute"
            style="left: 50%; transform: translate(-50%, -50%); top: 55%; font-size: 1.5rem">Violetta Art Institute</router-link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse bg-white custom-header-md-open" id="navbarNav">
            <ul class="navbar-nav">
              <!--li class="nav-item active"-->
              <li class="nav-item active">
                <router-link to="/about" class="nav-link">品牌介紹</router-link>
              </li>
               <li class="nav-item">
                <router-link to="/products" class="nav-link">產品介紹</router-link>
              </li>
              <!--li class="nav-item">
                <router-link to="cart" class="nav-link">購物車</router-link>
              </li-->
              <!--li class="nav-item">
                <router-link to="#" class="nav-link">Blog</router-link>
              </li-->
            </ul>
          </div>
          <div class="d-flex">
            <!--a href="#"><i class="fas fa-heart me-5"></i></a-->
            <router-link to="/cart" class="btn btn-md position-relative px-4"><i class="bi bi-cart3 fs-3"></i>
            <span class="position-absolute top-20 start-200 translate-small badge rounded-pill bg-danger">
    {{ cartData?.carts?.length }}<span class="visually-hidden">unread messages</span>
  </span></router-link>
          </div>
        </nav>
      </div>
    </div>
</template>
<script>
import emitter from '@/utils/emitter'
export default {
  data () {
    return {
      cartData: {}
    }
  },
  methods: {
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((res) => {
        // console.log(res)
        this.cartData = res.data.data
      })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => {
      this.getCart()
    })
  }
}
</script>
