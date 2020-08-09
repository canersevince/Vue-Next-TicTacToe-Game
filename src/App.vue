<template>
    <div id="app">
        <div class="main">
            <div id="top_bar">
                <ul>
                    <li>
                        <a href="http://www.github.com/canersevince"><i class="fab fa-github"></i></a></li>
                </ul>
            </div>
            <Score></Score>
            <Board></Board>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from 'vue';
    import Board from './components/board.vue';
    import Score from './components/score.vue';

    export default defineComponent({
        components: {
            Board,
            Score
        },
    })
</script>
<style lang="scss">
    @import "assets/dark-swal.css";

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    a{
        text-decoration: none;
    }
    ul{
        list-style: none;
        li{
            margin: 0;
        }
    }

    p, h1, h2, h3, h4, h5, h6, span{
        font-family: Helvetica, sans-serif;
    }
    #app {
        min-width: 100vw;
        min-height: 100vh;
        background: #fdfdfd;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding-top: 10px;
    }

    #top_bar{
        height: 50px;
        background: #ddd;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 7px 7px 20px #8f8f8f,
        -7px -7px 10px #ffffff;
        ul{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            li{
                a{
                    text-decoration: none;
                    color: #333;
                    i{
                        font-size: 24px;
                    }
                }
            }
        }
    }

    .swal2-popup {
        background: #333;
    }
</style>
