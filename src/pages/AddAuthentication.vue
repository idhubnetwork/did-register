<template>
<div>
    <div class="container">
      <h1 class="title">addAuthentication</h1>
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
            <strong> authenticationType </strong>
            <small class="has-text-grey"> bytes32 </small>
            <div class="control">
                <input class="input" type="text" placeholder="" v-model="authenticationType">
            </div>
        </div>
        <div class="subtitle is-fluid">
            <strong class="is-size-5"> authentication </strong>
            <small class="has-text-grey"> bytes32 </small>
            <div class="control">
                <input class="input" type="text" placeholder="" v-model="authentication">
            </div>
        </div>
        <div class="subtitle is-fluid">
            <strong> validity </strong>
            <small class="has-text-grey"> uint256 </small>
            <div class="control">
                <input class="input" type="text" placeholder="" v-model="validity">
            </div>
        </div>
        <a class="subtitle button is-info is-rounded" name="button" @click="clickAddAuthentication">
            AddAuthentication
        </a>
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
