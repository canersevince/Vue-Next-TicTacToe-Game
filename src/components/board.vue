<template>
    <div class="main" style="margin-top: 10px">
        <div @click="playerAction(i)" class="tile" v-for="(tile, i) in state.board"
             :style="{ cursor: isClickable(tile)}" :key="i">
            <transition name="flip">
                <span class="xox" v-if="tile != ''">{{tile}}</span>
                <span v-else></span>
            </transition>
        </div>
    </div>
</template>
<script lang="ts">
    import {defineComponent, reactive} from "vue";
    import store from '../store/index'

    export default defineComponent({
        name: "board",
        setup() {

            const state = store.state

            function isClickable(tile: any) {
                if (!state.playersTurn) return 'not-allowed'
                if (tile.length == 0) {
                    return 'pointer'
                }
                return 'default'
            }

            const playerAction = (i: number) => {
                store.dispatch('playerClick', i)
            }
            return {
                state,
                playerAction,
                isClickable
            }
        }
    })
</script>

<style scoped lang="scss">
    .main {
        width: 35vw;
        height: 100%;
        display: flex;
        align-self: center;
        justify-self: center;
        align-content: center;
        justify-content: center;
        flex-wrap: wrap;
        border-collapse: collapse;

        .tile {
            flex: 1 1 31%; /*grow | shrink | basis */
            width: 80px;
            height: 160px;
            padding: 5px;
            margin: 1px;
            background: #ffffff;
            box-shadow: 20px 20px 60px #d9d9d9,
            -20px -20px 60px #ffffff;
            border: 4px solid #fdfdfd;
            display: flex;
            align-items: center;
            justify-content: center;

            .xox {
                align-self: center;
                justify-self: center;
                font-family: Helvetica, sans-serif;
                font-size: 56px;
                color: #888;
            }
        }
    }

</style>
