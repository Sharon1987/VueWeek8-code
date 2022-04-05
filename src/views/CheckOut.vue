<template>
  <div class="container">
    <div class="row row-cols-1">
      <div class="col">
        <h4 class="fw-bold">訂購商品</h4>
        <table class="table">
          <thead>
            <tr>
              <th style="width:100px">品項</th>
              <th style="width:180px"></th>
              <th style="width:70px">數量</th>
              <th class="text-end" style="width: 100px">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id">
              <td>
                <div style="height: 100px; width:100px; background-size: cover; background-position: center center; "
                  :style="{ backgroundImage: `url(${product.product.imageUrl})` }">
                </div>
              </td>
              <td class="align-middle">
                {{ product.product.title }}</td>
                <td class="align-middle">
                {{ product.qty }}
              </td>
              <td class="ps-3 align-middle text-end">
                {{ $filters.currency(product.product.price) }} 元
              </td>
            </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td colspan="4" class="text-end"><h5 class="text-danger">總金額 {{$filters.currency(order.total)}} 元</h5> </td>
              </tr>
          </tfoot>
        </table>
      </div>
      <div class="col">
          <h4 class="fw-bold">訂單資訊<span class="fs-7 text-success">（{{order.is_paid ? '已付款':'未付款'}}）</span></h4>
        <table class="table">
          <thead>
            <tr>
              <th style="width: 150px"></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-middle">訂單金額</td>
              <td>
                <h5 class="text-danger align-middle">
                  {{ $filters.currency(order.total) }} 元
                </h5>
              </td>
            </tr>
            <tr>
              <td>訂單編號</td>
              <td>{{ order.id }}</td>
            </tr>
            <tr>
              <td>訂單日期</td>
              <td>{{ getDate(order.create_at) }}</td>
            </tr>
            <tr>
              <td>email</td>
              <td>{{ user.email }}</td>
            </tr>
            <tr>
              <td>收件人姓名</td>
              <td>{{ user.name }}</td>
            </tr>
            <tr>
              <td>收件人電話</td>
              <td>{{ user.tel }}</td>
            </tr>
            <tr>
              <td>收件地址</td>
              <td>{{ user.address }}</td>
            </tr>
            <tr>
              <td>備註</td>
              <td>
                <p class="col" v-if="order.message">{{ order.message }}</p>
                <p class="col" v-else>無</p>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" class="btn btn-danger  w-100"
          v-if="!order.is_paid" @click="payOrder">信用卡付款</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      order: {},
      user: {},
      products: {},
      is_paid: false
    }
  },
  //監聽是否已付款
  watch: {
    is_paid () {
      this.is_paid = this.order.is_paid
    }
  },
  methods: {
  //取得訂單    
    getOrder () {
      const {id} = this.$route.params
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/order/${id}`
      this.$http.get(url).then((res) => {
        this.order = res.data.order
        this.user = res.data.order.user
        this.products = res.data.order.products
      })
    },
  //取得訂單日期
    getDate (timestamp) {
      const date = new Date(timestamp * 1000)
      return date.toLocaleDateString()
    },
  // 付款
    payOrder () {
      const { id } = this.$route.params
      const url = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/pay/${id}`
      this.$http.post(url)
        .then(res => {
          alert(res.data.message)
          this.getOrder()
        })
    },
  },
  mounted () {
    this.getOrder()
  }
}
</script>