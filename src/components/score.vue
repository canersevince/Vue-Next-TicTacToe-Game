<template>
    <header>
        <div>
            <transition mode="out-in" name="zoom">
                <h2 v-if="state.playersTurn">Your Turn</h2>
                <h2 v-else>
                    Opponents Turn
                </h2>
            </transition>
        </div>
        <section>
            <div>
                <h2>
                    You
                </h2>
                <p class="score player">{{state.playerWinCount}}</p>
            </div>
            <div>
                <h2>Comp.</h2>
                <p class="score computer">{{state.computerWinCount}}</p>
            </div>
        </section>
    </header>
</template>

<script lang="ts">
    import {defineComponent, reactive} from "vue";
    import store from '../store/index'

    export default defineComponent({
        name: "score",
        setup() {
            return {
                state: store.state
            }
        }
    })
</script>

<style scoped lang="scss">
    header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;

        section {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        div {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;

            &:first-child {
                p {
                    align-self: flex-start;
                    justify-self: flex-start;
                    text-align: left;
                }
            }

            &:nth-child(3) {
                p {
                    align-self: flex-end;
                    justify-self: flex-end;
                    text-align: right;
                }
            }

            p {
                margin-top: 5px;
            }

            h2 {
                font-family: Helvetica, sans-serif;
                color: #ddd;
                padding: 4px 8px;
                background: #888;
                border-radius: 6px;
                box-shadow: 20px 20px 60px #d9d9d9,
                -20px -20px 60px #ffffff;
            }
        }
    }

    .score {
        margin: 10px 0;
        height: 50px;
        width: 50px;
        font-size: 18px;
        font-family: Helvetica, sans-serif;
        color: #444;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(145deg, #ffffff, #e1e1e1);
        box-shadow: 7px 7px 10px #8f8f8f,
        -7px -7px 10px #ffffff;
    }
</style>
