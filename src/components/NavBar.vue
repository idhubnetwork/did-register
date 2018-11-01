<template>
    <nav class="navbar is-transparent">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img :src="logo" alt="">Home
            </router-link>

            <div class="navbar-burger burger" @click="isActiveToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <div class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start is-hoverable">
                <router-link class="navbar-item" to="/addpublickey" @click.native="isActiveToggle" exact>AddPublicKey</router-link>
                <router-link class="navbar-item" to="/addauthentication" @click.native="isActiveToggle" exact>AddAuthentication</router-link>
                <router-link class="navbar-item" to="/verifypublickey" @click.native="isActiveToggle" exact>VerifyPublicKey</router-link>
                <router-link class="navbar-item" to="/verifyauthentication" @click.native="isActiveToggle" exact>VerifyAuthentication</router-link>
            </div>
        </div>

        <div class="navbar-end">
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

                &nbsp;&nbsp;

                <button class="button is-rounded is-small" v-if="auth" @click="logout">logout</button>
            </div>
        </div>

        <!-- <div class="navbar-end is-hoverable buttons has-addons">
            <button class="button is-rounded is-small" :disabled="isCurrent('zh_CN')" @click="set('zh_CN')">簡</button>
            <button class="button is-rounded is-small" :disabled="isCurrent('zh_TW')" @click="set('zh_TW')">繁</button>
            <button class="button is-rounded is-small" :disabled="isCurrent('en_US')" @click="set('en_US')">EN</button>
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
    ], data() {
        return {
            logo: logo,
            isActive: false
        }
    }, methods: {
        isActiveToggle() {
            this.isActive = !this.isActive
        }, logout() {
            axios.get('/auth/logout').then(res => {
                // document.cookie = 'IDHUB_IDENTITY=; Max-Age=-1'
                location.href = '/'
            }).catch(err => console.log(err))
        }
    }, computed: {
        auth() {
            return document.cookie.indexOf('IDHUB_IDENTITY=') >= 0
        }
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

.navbar-menu {
  &.is-active {
    background-color: transparent;
  }
}

p.control {
  font-size: 13px;
  font-weight: normal;
  line-height: 10px;
}
</style>
