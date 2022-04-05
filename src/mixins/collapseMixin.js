import Collapse from 'bootstrap/js/dist/collapse'

export default {
    methods: {
        closeNavHam () {
            this.collapse.hide()
        },
        toggleNavHam () {
            this.cpllapse.toggle()
        }
    },
    mounted () {
      this.collapse = new Collapse(this.$refs.collapse, {
          toggle: false
      })
    }
}