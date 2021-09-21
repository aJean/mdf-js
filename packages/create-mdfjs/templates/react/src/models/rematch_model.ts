import { createModel } from 'mdf';

/**
 * @file 测试 rematch model
 */

type PlayersState = {
  players: string[];
};

export default createModel({
  state: {
    players: ['alss', 'ddold', 'nono'],
  } as PlayersState,

  effects: (dispatch) => {
    const { rematch_model } = dispatch;

    return {
      async setPlayers(): Promise<any> {
        rematch_model.SET_PLAYERS(['alss - 1', 'ddold - 2', 'nono - 3']);
      },
    };
  },

  reducers: {
    /**
     * use immer
     */
    SET_PLAYERS: (state: PlayersState, players: string[]) => {
      state.players = players;
      return state;
    },
  },
});
