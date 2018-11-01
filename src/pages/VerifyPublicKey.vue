<template>
  <span class="form-group">
    <div>
      <h1>PublicKey Page: Verify PublicKey</h1>
    </div>
    <div>
      <div>
        <div>
          <label> identity <small> address </small></label>
          <input placeholder="0x314156..." v-model="identity">
        </div>
      </div>
    </div>
    <div>
      <div>
        <p>
          <label> publicKeyType <small class="ng-binding"> bytes32 </small> </label>
          <input type="text" placeholder="" v-model="publicKeyType">
        </p>
      </div>
    </div>
    <div>
      <div>
        <p>
          <label> publicKey <small> bytes32 </small> </label>
          <input type="text" placeholder="" v-model="publicKey">
        </p>
      </div>
    </div>
    <div>
      <div>
        <p>
          <label> validation --> </label>
          <label> {{validity}} </label>
        </p>
      </div>
    </div>
    <div>
    </div>
    <button type="button" name="button" @click="verifyPublicKey">Verify</button>
    <div>
      ============ for test after this line =============
    </div>
  </span>
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
      validity: null,
      changeEvent: '',
      pending: false,
      contractName: 'IDHubDIDRegistry',
      eventName: 'DIDPublicKeyChanged',
      events: []
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
    sayHi: function () {
      alert('Hi!')
    },
    verifyPublicKey () {
      console.log('VerifyPublicKey Button has been clicked')
      console.log('identity is ' + this.identity)
      console.log('validity is ' + this.validity)
      this.validity = null
      this.$store.state.contractInstance().validPublicKey(this.identity, this.publicKeyType, this.publicKey, (err, result) => {
        this.validity = result
      })
    }
  }
}
</script>

<style>

</style>
