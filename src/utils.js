export const sideEffect = func => arg => { func(arg); return arg }

export function loadingWrapper (promise, { loadingVar, errorVar }) {
  this[loadingVar] = true
  this[errorVar] = null
  return promise
    .then(sideEffect(() => { this[loadingVar] = false; this[errorVar] = false }))
    .catch(exc => { this[loadingVar] = false; this[errorVar] = exc.toString(); throw exc })
}

/* plugin for automatically binding ${name}Error and ${name}Loading values to async methods
 Usage:
  export default {
    loading: ['getFromApi'],
    methods: {
      getFromApi() {
        return axios.get(...)  // function must return promise!
      }
    },
  }

 Now data contains getFromApiLoading and getFromApiError synced with last call of a method
 */
export const loadingMixin = {
  beforeCreate () {
    const loadingMethodsList = this.$options.loading || []
    for (const k of loadingMethodsList) {
      const method = this.$options.methods[k]
      if (!method) throw new Error(`Not found method ${k}`)
      this.$options.methods[k] = function () {
        const result = method.apply(this, arguments)
        if (result && result.then) {
          return loadingWrapper.call(this, result, { loadingVar: `${k}Loading`, errorVar: `${k}Error` })
        }
        return result
      }
    }
  },
  data() {
    const additionalData = {}
    for (const k of (this.$options.loading || [])) {
      additionalData[`${k}Loading`] = false
      additionalData[`${k}Error`] = null
    }
    return additionalData
  }
}

export const currencyFilter = value => '$ ' + value.toString()
  .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

export const delay = time => new Promise(resolve => setTimeout(resolve, delay * 1000))