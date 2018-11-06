<template>
<div>
    <div class="container">
      <h1 class="title">addPublicKey</h1>
      <div class="panel">(addPublicKey function description here.)</div>
    </div>
    <div class="container has-background-white second-container">
        <div class="subtitle is-fluid">
            <strong>WRITE</strong> IDHubDIDRegistry Contract: 0x1DbF8e4B47EA53a2b932850F7FEC8585C6A9c1d2
        </div>
        <div class="subtitle is-fluid">
            <strong> identity </strong>
            <small class="has-text-grey"> address </small>
            <div class="control">
                <input class="input" type="text" placeholder="0x3141592..." v-model="identity">
            </div>
        </div>
        <div class="subtitle is-fluid">
            <strong> publicKeyType </strong>
            <small class="has-text-grey"> bytes32 </small>
            <div class="control">
                <input class="input" type="text" placeholder="" v-model="publicKeyType">
            </div>
        </div>
        <div class="subtitle is-fluid">
            <strong class="is-size-5"> publicKey </strong>
            <small class="has-text-grey"> bytes32 </small>
            <div class="control">
                <input class="input" type="text" placeholder="" v-model="publicKey">
            </div>
        </div>
        <div class="subtitle is-fluid">
            <strong> validity </strong>
            <small class="has-text-grey"> uint256 </small>
            <div class="control">
                <input class="input" type="text" placeholder="" v-model="validity">
            </div>
        </div>
        <a class="subtitle button" name="button" @click="clickAddPublickKey">
            AddPublicKey
        </a>
    </div>
        <!-- <div class="temp">
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
    </div> -->
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
.container {
  padding: 0rem 4rem 1rem 4rem;
}
.second-container {
  padding: 1rem 4rem 2rem 4rem;
}
.subtitle {
  line-height: 175%;
}
</style>
