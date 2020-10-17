<script>
import { h } from 'vue'

export default {
  render: function () {
    if (this.loading) {
      const spinner = h('span', {'class': 'fa fa-refresh fa-spin is-size-4'})
      const spinnerWrapper = h('div', {'class': 'icon'}, [ spinner ])
      return h('div', {'class': 'has-text-centered has-text-grey-light'}, [ spinnerWrapper ])
    } else {
      return this.$slots.default()
    }
  },
  props: {
    loading: {
      type: Boolean,
      required: true
    }
  }
}
</script>
