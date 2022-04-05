<template>
<div class="container">
      <div style="
      height: 200px;
      max-height: 200px;
      background-image: url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
      background-position: center center;
      background-size: cover;
      "
      :style="{backgroundImage: `url(${product.imageUrl})`}"
      >
      </div>
      <div class="row justify-content-between mt-4 mb-7">
        <div class="col-md-7">
          <h2 class="mb-0">{{ product.title }}</h2>
          <p class="fw-bold">NT${{ product.price }}</p>
          <p>{{ product.content }}</p>
          <div class="my-4">
            <img v-for="image in product.imagesUrl" :key="image" :src="image"
            alt="product.title"
            class="img-fluid mt-4">
          </div>
          <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
            <div class="card border-0">
              <div class="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                <div class="d-flex justify-content-between align-items-center pe-1">
                  <h4 class="mb-0">
                    {{ product.title }}
                  </h4>
                  <i class="fas fa-minus"></i>
                </div>
              </div>
              <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div class="card-body pb-5">
                  {{product.description}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="input-group mb-3 border mt-3">
        <div class="input-group">
              <input type="number" class="form-control" min="1" v-model.number="qty" placeholder="1">
              <button type="button"
              class="btn add-btn btn-danger"
              @click="addToCart(product.id)"
              :disabled="isLoadingItem === product.id">
              <span
                class="spinner-border spinner-border-sm"
                v-show="isLoadingItem === product.id"
              ></span
              >加入購物車
            </button>
                    </div>  
      </div>
    </div>
      </div>
</div>
</template>
<script>
import emitter from '@/utils/emitter'
export default {
  data () {
    return {
      cartData: {},
      product: [],
      id: ''
    }
  },
  methods: {
    getProduct () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`
      this.$http.get(url).then((res) => {
      // console.log(res)
        this.product = res.data.product
      })
    },
    addToCart () {
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`
      const data = {
        product_id: this.id,
        qty: 1
      }
      this.$http.post(url, { data }).then((res) => {
        console.log(res)
        // this.product = res.data.product
        emitter.emit('get-cart')
      })
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.getProduct()
  }
}
</script>
