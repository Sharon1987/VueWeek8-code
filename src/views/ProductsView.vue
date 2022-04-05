<template>
<div class="d-flex">
            <a href="#"><i class="fas fa-heart me-5"></i></a>
            <a href="./cart-2.html"><i class="fas fa-shopping-cart"></i></a>
          </div>
    <nav class="navbar navbar-expand-lg navbar-light justify-content-center border border-start-0 border-end-0 border-top border-bottom">
      <div class="navbar-nav flex-row overflow-auto navbar-custom-scroll">
        <router-link to="products" class="nav-item nav-link text-nowrap px-2" @click="getProducts(1, '')">全部商品</router-link>
        <router-link to="products" class="nav-item nav-link text-nowrap px-2" @click="getProducts(1, '韓式香氛蠟燭')">香氛蠟燭</router-link>
        <!--router-link to="products" class="nav-item nav-link text-nowrap px-2" @click="getProducts(1, '客製商品')">客製商品</router-link-->
        <router-link to="products" class="nav-item nav-link text-nowrap px-2" @click="getProducts(1, '教學課程')">教學課程</router-link>
        <router-link to="products" class="nav-item nav-link text-nowrap px-2" @click="getProducts(1, '香氛小物')">香氛小物</router-link>
        
      </div>
    </nav>
    <div class="container mt-md-5 mt-3 mb-7">
      <div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 gy-4">
        <div class="col" v-for="product in products" :key="product.id">
          <div class="card border-1 mb-4 position-relative position-relative  h-100" style="padding:0.5rem">
            <!--img :src="product.imageUrl"
             class="card-img-top rounded-0"
             alt="..."
             /-->
            <div :style="{backgroundImage:`url(${product.imageUrl})`}"
            style="height: 320px; background-size: cover; background-position: center center"></div>
            <a href="#" class="text-dark">
              <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i>
            </a>
            <div class="card-body p-0">
              <h4 class="mb-0 mt-3">
                  {{ product.title }}</h4>
              <p class="card-text text-muted mb-0" style="height: 4.5 rem; overflow:hidden;">{{ product.description }}</p>
              <del class="text-muted mt-3" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <span class="text-muted mt-3">／特價 {{ product.price }}元</span>
            </div>
            <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-outline-secondary">
                      <router-link :to="`/product/${product.id}`">查看更多</router-link>
                    </button>
                    <button
                type="button"
                class="btn btn-danger"
                @click="addToCart(product.id)"
                :disabled="isLoadingItem === product.id"
              >
                <span
                  class="spinner-grow spinner-grow-sm"
                  v-show="isLoadingItem === product.id"></span>
                加到購物車
              </button>
                  </div>
          </div>
        </div>
      </div>
       <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
    </div>
</template>
<script>
import emitter from '@/utils/emitter'
import Pagination from '@/components/PaginationModal.vue'
export default {
  data () {
    return {
      pagination: {},
      currentPage: 1,
      tempProduct: {},
      products: [],
      isLoadingItem: '',
    }
  },
  inject: ['emitter'],
  components: {
    Pagination
  },
  methods: {
    getProducts (page = 1, category="") {
      this.currentPage = page
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products?page=${page}&category=${category}`
      this.$http.get(url).then((res) => {
      // console.log(res)
        this.products = res.data.products
        this.pagination = res.data.pagination;
      })
    },
    // 加入購物車
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.isLoadingItem = id
      this.$http.post(`${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`,
        {data}).then((res) => {
        console.log(res)
        this.getCart()
        this.isLoadingItem = ''
        emitter.emit('get-cart')
      })
    },
    //取得商品資訊，開啟modal
    getProduct (id) {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${id}`
      this.loadingStatus.loadingItem = id
      this.$http.get(url).then((response) => {
        this.loadingStatus.loadingItem = ''
        this.product = response.data.product
      }).catch((err) => {
        alert(err.data.message)
      })
    },
    //取得購物車清單
    getCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      this.$http.get(url).then((response) => {
        this.cart = response.data.data
      }).catch((err) => {
        alert(err.data.message)
      })
    },

  },
  mounted () {
    this.getProducts()
    this.getCart()
    
  }
}
</script>
