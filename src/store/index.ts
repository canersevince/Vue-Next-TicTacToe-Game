import {createStore} from 'vuex';
import Swal from 'sweetalert2';

export default createStore({
    state: {
        gameIsFinished: false,
        winner: null,
        remaining: 9,
        board: ["", "", "",
            "", "", "",
            "", "", ""
        ],
        playerWinCount: 0,
        computerWinCount: 0,
        playersTurn: true
    },
    mutations: {
        changeGameState(state: any, payload: boolean) {
            state.gameIsFinished = payload
        },
        // eslint-disable-next-line
        updateBoard(state: any, payload: any) {
            state.board[payload.i] = payload.by
        },
        // eslint-disable-next-line
        turnSwitch(state: any, payload: boolean) {
            state.playersTurn = payload
        },
        // eslint-disable-next-line
        increaseWinCount(state: any, payload: any) {
            state.winner = payload;
            if (payload == "Player") {
                state.playerWinCount = state.playerWinCount + 1
            } else if (payload == 'Draw') {
                state.computerWinCount = state.computerWinCount + 1
                state.playerWinCount = state.playerWinCount + 1
            } else {
                state.computerWinCount = state.computerWinCount + 1
            }
        },
        resetGameState(state: any) {
            console.log('Game over!')
            state.gameIsFinished = false;
            state.remaining = 9;
            state.board = ["", "", "",
                "", "", "",
                "", "", ""
            ];
            state.playersTurn = true;
            state.winner = null;
        },
        movement(state: any) {
            state.remaining--;
        }
    },
    actions: {
        resetGame(state: any) {
            state.commit('resetGameState')
            Swal.fire({
                title: 'Game Restarted!',
                timer: 1000,
                showConfirmButton: false,
                showCancelButton: false,
            }).then(res => {
                setTimeout(() => {
                    state.commit('changeGameState', false)
                },)
            })
        },
        // eslint-disable-next-line
        isGameFinished(state: any, payload: any) {
            // game logic
            //horizontal
            if ((state.getters['getState'].board[0] == state.getters['getState'].board[1] &&
                state.getters['getState'].board[1] == state.getters['getState'].board[2]) && (
                    state.getters['getState'].board[0] === payload
                )
                ||
                ((state.getters['getState'].board[3] == state.getters['getState'].board[4] &&
                        state.getters['getState'].board[4] == state.getters['getState'].board[5]) && (
                        state.getters['getState'].board[3] === payload
                    )
                )
                ||
                // cross
                ((state.getters['getState'].board[6] == state.getters['getState'].board[7] &&
                        state.getters['getState'].board[7] == state.getters['getState'].board[8]) && (
                        state.getters['getState'].board[6] === payload
                    )
                )
                ||
                ((state.getters['getState'].board[0] == state.getters['getState'].board[4] &&
                        state.getters['getState'].board[4] == state.getters['getState'].board[8]) && (
                        state.getters['getState'].board[0] === payload
                    )
                )
                ||
                ((state.getters['getState'].board[2] == state.getters['getState'].board[4] &&
                        state.getters['getState'].board[4] == state.getters['getState'].board[6]) && (
                        state.getters['getState'].board[2] === payload
                    )
                )
                ||
                // vertical
                ((state.getters['getState'].board[0] == state.getters['getState'].board[3] &&
                        state.getters['getState'].board[3] == state.getters['getState'].board[6]) && (
                        state.getters['getState'].board[0] === payload
                    )
                )
                ||
                ((state.getters['getState'].board[4] == state.getters['getState'].board[1] &&
                        state.getters['getState'].board[1] == state.getters['getState'].board[7]) && (
                        state.getters['getState'].board[4] === payload
                    )
                )
                ||
                ((state.getters['getState'].board[2] == state.getters['getState'].board[5] &&
                        state.getters['getState'].board[5] == state.getters['getState'].board[8]) && (
                        state.getters['getState'].board[2] === payload
                    )
                )) {
                state.commit('changeGameState', true)
                return true
            } else {
                return false
            }
        },
        // eslint-disable-next-line
        async playerClick(state: any, payload: any) {
            if (state.gameIsFinished) {
                return
            }
            let gameState;
            const self = state
            if (state.getters['getState'].board[payload] == "" && state.getters['getState'].remaining > 0) {
                if (state.getters['getState'].playersTurn == true) {
                    state.commit('updateBoard', {
                        by: "X",
                        i: payload
                    })
                    state.commit('movement')
                    if (state.getters['getState'].remaining == 0) {
                        console.log('0 space remaining!')
                        // check winner
                        const isPlayerWon = await state.dispatch('isGameFinished', 'X')
                        const isPlayerLost = await state.dispatch('isGameFinished', 'O')
                        console.log(isPlayerWon)
                        if (isPlayerWon) {
                            self.commit('increaseWinCount', 'Player')
                            await Swal.fire({
                                title: 'You Won!',
                                timer: 1000,
                                showCancelButton: false,
                                showConfirmButton: false
                            })
                            setTimeout(() => {
                                state.dispatch('resetGame')
                            }, 1000)
                            return;
                        } else if (isPlayerLost) {
                            state.commit('increaseWinCount', 'Draw')
                            await Swal.fire({
                                title: 'Draw!',
                                timer: 1000
                            })
                            setTimeout(() => {
                                state.dispatch('resetGame')
                            }, 1000)
                            return;
                        } else {
                            state.commit('increaseWinCount', 'Draw')
                            await Swal.fire({
                                title: 'Draw!',
                                timer: 500,
                                showConfirmButton: false,
                                showCancelButton: false
                            })
                            setTimeout(() => {
                                state.dispatch('resetGame')
                            }, 500)
                            return;
                        }
                    }

                    gameState = await state.dispatch('isGameFinished', 'X')
                    console.log(gameState)
                    if (gameState == true) {
                        self.commit('increaseWinCount', 'Player')
                        await Swal.fire({
                            title: 'You Won!',
                            timer: 1000,
                            showCancelButton: false,
                            showConfirmButton: false
                        })

                        setTimeout(() => {
                            state.dispatch('resetGame')
                        }, 1000)
                        return;
                    }
                    state.commit('turnSwitch', false)
                    setTimeout(() => {
                        state.dispatch('computerClick')
                    }, Math.ceil(Math.random() * 1500+1000))
                } else {
                    await Swal.fire({
                        title: 'Opponents turn!',
                        timer: 500,
                        showConfirmButton: false,
                        showCancelButton: false
                    })
                }
            }
        },
        async computerClick(state: any) {
            if (state.gameIsFinished) {
                return
            }
            state.commit('movement')
            const freeSpaces: any[] = [];
            let gameState;
            const arr = state.getters['getState'].board
            arr.forEach((i: string, index: any) => {
                if (i.length == 0) {
                    freeSpaces.push(index)
                }
            })
            const rand = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
            if (state.getters['getState'].remaining == 0) {
                gameState = await state.dispatch('isGameFinished', 'O')
                if (gameState == true) {
                    state.commit('increaseWinCount', 'Computer')
                    await Swal.fire({
                        title: 'You Won!',
                        timer: 1000,
                        showCancelButton: false,
                        showConfirmButton: false
                    })
                    setTimeout(() => {
                        state.dispatch('resetGame')
                    }, 1000)
                    return;
                }
                console.log('0 space remaining!')
                state.commit('increaseWinCount', 'Draw')
                await Swal.fire({
                    title: 'Draw!',
                    timer: 500,
                    showConfirmButton: false,
                    showCancelButton: false
                })
                setTimeout(() => {
                    state.dispatch('resetGame')
                }, 500)
                return;
            }
            state.commit('updateBoard', {
                by: "O",
                i: rand
            })
            gameState = await state.dispatch('isGameFinished', 'O')
            console.log(gameState)
            if (gameState == true) {
                state.commit('increaseWinCount', 'Computer')
                await Swal.fire({
                    title: 'Computer Won!',
                    timer: 500,
                    showConfirmButton: false,
                    showCancelButton: false
                })
                setTimeout(() => {
                    state.dispatch('resetGame')
                }, 500)
                return
            }
            state.commit('turnSwitch', true)
        }
    },
    getters: {
        // eslint-disable-next-line
        getState(state: any) {
            return state
        }
    },
    modules: {}
});
