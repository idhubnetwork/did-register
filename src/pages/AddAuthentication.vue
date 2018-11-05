<template>
<span class="form-group">
    <div>
      <h1>Authentication Page: Add Authentication</h1>
    </div>
    <!-- ngRepeat: input in contract.functions[contract.selectedFunc.index].inputs track by $index -->
    <div>
      <div>
        <div>
          <label> identity <small>address</small></label>
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
          <label> validity <small> uint256 </small> </label>
          <input type="text" placeholder="" v-model="validity">
        </p>
      </div>
    </div>
    <button type="button" name="button" @click="clickAddAuthentication">AddAuthentication</button>
    <div class="temp">
    <div class="panel panel-default">
      <div class="panel-heading">Event Watch: {{ contractName }}.{{ eventName }}</div>
      <div class="panel-body">
        <button type="button" class="btn btn-default" @click="watch">Watch</button>
        <button type="button" class="btn btn-default" @click="clear">Clear</button>
        <pre>{{ events }}</pre>
      </div>
    </div>
      ============ for test after this line =============
      <p>identity is {{identity}}</p>
      <p>authenticationType is {{authenticationType}}</p>
      <p>authentication is {{authentication}}</p>
      <p>validity is {{validity}}</p>
    </div>
    <div>
      <p>Metamask: {{ web3.isInjected }}</p>
      <p>Network: {{ web3.networkId }}</p>
      <p>Account: {{ web3.coinbase }}</p>
      <p>Balance: {{ web3.balance }}</p>
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
      validity: '',
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
    clickAddAuthentication () {
      console.log('AddAuthentication Button has been clicked')
      this.pending = true
      this.changeEvent = ''
      this.$store.state.contractInstance().addAuthentication(this.identity, this.authenticationType, this.authentication, this.validity, {
        gas: 300000,
        value: 0,
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log('Err happens ' + err)
          this.pending = false
        } else {
          let DIDAuthenticationChangedEvent = this.$store.state.contractInstance().DIDAuthenticationChanged(result => result.identity == "0x7EbEE9a8A3530fd1e54017C39592A5a95af99d07")
          console.log('no error happens. ')
          // var myResults = DIDAuthenticationChangedEvent.watch((err, result) => {
          //   if (err) {
          //     console.log('=========could not get event DIDAuthenticationChanged()')
          //   } else {
          //     this.changeEvent = result.args
          //     this.pending = false
          //     console.log('=========here changeEvent happens.')
          //     console.log(result)
          //   }
          // })


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
    },
    watch(event) {
      event.target.disabled = true
      this.$store.state.contractInstance().DIDAuthenticationChanged().watch((err, event) => {
        if (err) {
          this.events = err
          console.log('watch errors')
        }
        if (event) {
          this.events.unshift(event)
          console.log('event happens')
        }
      })
    },
    clear() {
      this.events = []
    }
  }
}
</script>

<style>
</style>
