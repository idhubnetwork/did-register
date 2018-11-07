<template>
    <nav class="navbar is-link" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">
                <img :src="logo" alt="">
                <label class="has-text-white">&nbsp;&nbsp; IDHub DID Register</label>
            </router-link>
            <a role="button" class="navbar-burger burger" :class="{ 'is-active': isActive }" @click="isActiveToggle">
                <span></span>
                <span></span>
                <span></span>
            </a>
        </div>
        <div id="navbarBasic" class="navbar-menu" :class="{ 'is-active': isActive }">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/addpublickey" exact>AddPublicKey</router-link>
                <router-link class="navbar-item" to="/addauthentication" exact>AddAuthentication</router-link>
                <router-link class="navbar-item" to="/validpublickey" exact>ValidPublicKey</router-link>
                <router-link class="navbar-item" to="/validauthentication" exact>ValidAuthentication</router-link>
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
            isActive: false,
            logo: logo
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
</style>
