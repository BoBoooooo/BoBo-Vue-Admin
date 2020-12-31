/*
 * @file: websocket
 * @copyright: BoBo
 * @author: BoBo
 * @Date: 2019-07-15 12:48:33
 */

const webSocket = {
  state: {
    // ws实例
    websocket: null,
    // onmessage 服务端返回的数据
    serverData: null,
  },
  mutations: {
    SET_WEBSOCKET: (state, websocket) => {
      state.websocket = websocket;
    },
    SET_DATA: (state, data) => {
      state.serverData = data;
    },
    RESET_DATA: (state) => {
      state.serverData = null;
    },
  },
  actions: {
    // 连接
    initWebSocket({ commit }, userName) {
      const wsuri = `${process.env.VUE_APP_WS_URL}/${userName}`;// ws地址
      let ws = new WebSocket(wsuri);
      commit('SET_WEBSOCKET', ws);
      ws.onopen = () => {
        setInterval(() => {
          ws.send('ping');
        }, 180000);
      };
      ws.onmessage = (e) => {
        // success代表服务器通信成功(心跳包检测)
        if (e.data.includes('success')) {
          // console.log(e.data);
        } else {
          commit('RESET_DATA');
          commit('SET_DATA', e.data);
        }
      };
      // 断开自动重连一次
      ws.onclose = () => {
        ws = new WebSocket(wsuri);
        commit('SET_WEBSOCKET', ws);
      };
    },

  },
};

export default webSocket;
