<template>
<div class="modal fade" id="productDetail" tabindex="-1" role="dialog"
       aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>{{ product.title }}</span>
              </h5>
              <button type="button" class="btn-close"
                      data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-6">
                  <img class="img-fluid" :src="product.imageUrl" alt="">
                  <!--product.imageUrl 顯示主圖，若用product.imagesUrl,可用以顯示多圖,但用在這裡會有圖片無法顯示的問題-->
                </div>
                <div class="col-sm-6">
                  <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
                  <p>商品描述：{{ product.description }}</p>
                  <p>商品內容：{{ product.content }}</p>
                  <!--如果顯示價格和原價一樣，就顯示一個價格，如果不一樣，就顯示原價和特價-->
                  <div class="h5" v-if="!product.price">{{ product.origin_price }} 元</div>
                  <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
                  <div class="h5" v-if="product.price">現在只要 {{ product.price }} 元</div>
                  <div>
                    <div class="input-group">
                      <input type="number" class="form-control"
                            v-model.number="qty" min="1">
                      <button type="button" class="btn btn-primary"
                              @click="$emit('add-to-cart', product.id, qty)">加入購物車</button>  
                    </div>        
                   <div> 
                   </div>
                  </div>
                </div>
                <!-- col-sm-6 end -->
              </div>
            </div>
          </div>
        </div>
      </div>
</template>
<script>

export default {
    template: '#productDetail',
    props: {
      product: {
        type: Object,
        default() {
          return {
          }
        }
      }
    },
    data () {
      return {
        status: {},
        modal: '',
        qty: 1
      };
    },
    mounted () {
      this.modal = new bootstrap.Modal(this.$refs.modal, {
        keyboard: false,
        backdrop: 'static'
      })
    },
    methods: {
      openModal () {
        this.modal.show()
      },
      hideModal () {
        this.modal.hide()
      },
    },
  }
</script>
