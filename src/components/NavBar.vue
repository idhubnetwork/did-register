<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img :src="logo" alt="">
                <label class="has-text-white">&nbsp;&nbsp; {{ $t("message.brand") }}</label>
                <label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            </router-link>
            <div class="navbar-burger burger" :class="{ 'is-active': isActive }" @click="isActiveToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div id="navbarBasic" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start is-hoverable">
                <router-link class="navbar-item" to="/addpublickey" @click.native="isActiveToggle" exact>{{ $t("message.addPublicKey") }}</router-link>
                <router-link class="navbar-item" to="/addauthentication" @click.native="isActiveToggle" exact>{{ $t("message.addAuthentication") }}</router-link>
                <router-link class="navbar-item" to="/validpublickey" @click.native="isActiveToggle" exact>{{ $t("message.validPublicKey") }}</router-link>
                <router-link class="navbar-item" to="/validauthentication" @click.native="isActiveToggle" exact>{{ $t("message.validAuthentication") }}</router-link>
            </div>
            <div class="navbar-end is-hoverable buttons has-addons">
                <button class="button is-rounded is-small" :disabled="isCurrent('zh_CN')" @click="set('zh_CN')">简</button>
                <button class="button is-rounded is-small" :disabled="isCurrent('zh_TW')" @click="set('zh_TW')">繁</button>
                <button class="button is-rounded is-small" :disabled="isCurrent('en_US')" @click="set('en_US')">EN</button>
            </div>
        </div>
        <!-- <div class="navbar-end">
            <div class="navbar-item">
                <p class="control">
                    <table>
                        <tbody>
                            <tr>
                                <td>identity:</td>
                                <td>{{ identity }}</td>
                            </tr>
                            <tr>
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <td>owner:</td>
                                <td>{{ coinbase }}</td>
                            </tr>
                        </tbody>
                    </table>
                </p>
                <button class="button is-rounded is-small" v-if="auth" @click="logout">logout</button>
            </div>
        </div> -->


    </nav>
</template>

<script>
import logo from '@/img/logo.png'
import { axios } from '@/util.js'

export default {
    props: [
        'identity',
        'coinbase'
    ],
    data() {
        return {
            isActive: false,
            logo: logo
        }
    },
    methods: {
        isActiveToggle() {
            this.isActive = !this.isActive
        }, logout() {
            axios.get('/auth/logout').then(res => {
                // document.cookie = 'IDHUB_IDENTITY=; Max-Age=-1'
                location.href = '/'
            }).catch(err => console.log(err))
        }, isCurrent(locale) {
            return this.$i18n.locale === locale
        }, set(locale) {
            this.$i18n.locale = locale
            localStorage.setItem('language', locale)
        }
    },
    computed: {
        auth() {
            return document.cookie.indexOf('IDHUB_IDENTITY=') >= 0
        }
    },
    mounted () {
        if (!localStorage.getItem('language')) {
            this.$i18n.locale = 'en_US'
        }
        else {
            this.$i18n.locale = localStorage.getItem('language')
        }
        // set title
        window.document.title = this.$t("message.title")
    }, updated () {
      // set title
      window.document.title = this.$t("message.title")
    }
}
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #0c1854;
  padding: 0 30px 0 30px;
}

.navbar-item,
.navbar-link {
  color: rgba($color: #ffffff, $alpha: 0.5);
  margin: 10px 0;
  font-weight: bold;
}

a.navbar-link,
a.navbar-item {
  &:hover,
  &.is-active {
    color: #ffffff;
  }
}

.navbar-menu {
  .navbar-link,
  .navbar-item {
    &.is-active {
      border-bottom: 1px solid;
    }
  }
}

.button {
  background-color: transparent;
  color: #ffffff;
  font-weight: bold;
}

:disabled {
  background-color: #ffffff;
  color: #0c1854;
  opacity: 1;
}

.buttons {
  margin: 20px 20px 10px 20px;
}

.navbar-burger {
  color: #ffffff;
}
a.navbar-item:hover, a.navbar-item.is-active, .navbar-link:hover, .navbar-link.is-active{
  background-color: transparent;
}
.navbar-menu {
  background-color: transparent;
}

.navbar-item:hover {
  background-color: transparent;
}
</style>
