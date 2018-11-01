<template>
  <span class="form-group">
    <div>
      <h1>Authentication Page: Verify Authentication</h1>
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
          <label> authenticationType <small class="ng-binding"> bytes32 </small> </label>
          <input type="text" placeholder="" v-model="authenticationType">
        </p>
      </div>
    </div>
    <div>
      <div>
        <p>
          <label> authentication <small> bytes32 </small> </label>
          <input type="text" placeholder="" v-model="authentication">
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
    <button type="button" name="button" @click="verifyAuthentication">Verify</button>
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
      authenticationType: '',
      authentication: '',
      validity: null,
      changeEvent: '',
      pending: false,
      contractName: 'IDHubDIDRegistry',
      eventName: 'DIDAuthenticationChanged',
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
    verifyAuthentication () {
      console.log('VerifyAuthentication Button has been clicked')
      console.log('identity is ' + this.identity)
      console.log('validity is ' + this.validity)
      this.validity = null
      this.$store.state.contractInstance().validAuthentication(this.identity, this.authenticationType, this.authentication, (err, result) => {
        this.validity = result
      })
    }
  }
}
</script>

<style>

</style>
