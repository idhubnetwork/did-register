<template>
<div>
    <h1 class="title">Add PublicKey</h1>
    <div>
        <label> identity <small>address</small></label>
        <input placeholder="0x314156..." v-model="identity">
    </div>
    <div>
        <p>
          <label> publicKeyType <small class="ng-binding"> bytes32 </small> </label>
          <input type="text" placeholder="" v-model="publicKeyType">
        </p>
    </div>
    <div>
        <p>
          <label> publicKey <small> bytes32 </small> </label>
          <input type="text" placeholder="" v-model="publicKey">
        </p>
    </div>
    <div>
        <p>
          <label> validity <small> uint256 </small> </label>
          <input type="text" placeholder="" v-model="validity">
        </p>
    </div>
    <button type="button" name="button" @click="clickAddPublickKey">AddPublicKey</button>
    <div class="temp">
      ============ for test after this line =============
      <p>identity is {{identity}}</p>
      <p>publicKeyType is {{publicKeyType}}</p>
      <p>publicKey is {{publicKey}}</p>
      <p>validity is {{validity}}</p>
    </div>
    <div>
      <p>Metamask: {{ web3.isInjected }}</p>
      <p>Network: {{ web3.networkId }}</p>
      <p>Account: {{ web3.coinbase }}</p>
      <p>Balance: {{ web3.balance }}</p>
    </div>

  </div>
</template>

<script>
export default {
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from casino-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  data () {
    return {
      identity: '',
      publicKeyType: '',
      publicKey: '',
      validity: '',
      changeEvent: '',
      pending: false
    }
  },
  computed: {
    web3 () {
      return this.$store.state.web3
    }
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  },
  methods: {
    clickAddPublickKey () {
      console.log('AddPublicKey Button has been clicked')
      this.pending = true
      this.changeEvent = ''
      this.$store.state.contractInstance().addPublicKey(this.identity, this.publicKeyType, this.publicKey, this.validity, {
        gas: 300000,
        value: 0,
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log('Err happens ' + err)
          this.pending = false
        } else {
          let DIDPublicKeyChangedEvent = this.$store.state.contractInstance().DIDPublicKeyChanged(result => result.identity == "0x7EbEE9a8A3530fd1e54017C39592A5a95af99d07")
          console.log('no error happens. ')
          var myResults = DIDPublicKeyChangedEvent.watch((err, result) => {
            if (err) {
              console.log('=========could not get event DIDPublicKeyChanged()')
            } else {
              this.changeEvent = result.args
              this.pending = false
              console.log('=========here changeEvent happens.')
              console.log(result)
            }
          })
          // DIDPublicKeyChangedEvent.watch((err, result) => {
          //   if (err) {
          //     console.log('could not get event DIDPublicKeyChanged()')
          //   } else {
          //     this.changeEvent = result.args
          //     this.pending = false
          //     console.log('here changeEvent happens')
          //   }
          // })
        }
      })
    }
  }
}
</script>

<style scoped>
a.is-active {
  border-bottom-color: #3273dc;
  color: #3200dc;
}
</style>
