<template>
  <div>
    <h1>Leaderboard</h1>
    <div style="margin: auto; width: fit-content;">
      <table>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>Profit/Loss</th>
        </tr>
        <tr v-for="(item, i) in leaderboard" :key="item.userId">
          <td>{{(curPage - 1)*50 + i + 1}}</td>
          <td>{{item.username}}</td>
          <td>{{item.pnlValue}}</td>
        </tr>
      </table>
    </div>
    <div v-if="totalPages > 0" style="display: flex; margin: auto; width: fit-content; margin-top: 20px;">
      <button @click="setCurPage(curPage - 1)" :disabled="curPage === 1">&lt;</button>
      <div v-for="i in totalPages" :key="i" :style="['padding: 2px', i === curPage ? '' : 'text-decoration: underline']" @click="setCurPage(i)">{{ i }}</div>
      <button @click="setCurPage(curPage + 1)" :disabled="curPage === totalPages">></button>
    </div>
    <div style="margin-top: 20px; padding: 20px; background-color: #cccccc">
        <label>JWT:</label>
        <input type="text" v-model="token" @change="tokenChanged"/>
        <div>Use the following sample non-expiring JWTs</div>
    </div>
    <div style="margin-top: 10px; padding: 20px; background-color: #cccccc">
        <label>PnL:</label>
        <input type="number" v-model="pnlInput" />
        <button @click="submitPnL">Submit</button>
        <button @click="updatePnL">Update</button>
    </div>
    <div style="margin-top: 10px; padding: 20px; background-color: #cccccc">
      <label>Your rank: {{ rank }}</label>
      <button @click="getRank">Get Rank</button>
    </div>
  </div>
</template>

<script>
import apiService from './services/api.service';

export default {
  name: 'App',
  mounted() {
    this.fetchLeaderboard();
  },
  data() {
    return {
      leaderboard: [],
      token: '',
      pnlInput: null,
      rank: '',
      totalPages: 0,
      curPage: 1,
    };
  },
  methods: {
    fetchLeaderboard(pageNo = 1) {
      apiService.getLeaderboard(pageNo).then((data) => {
        this.leaderboard = data;
        apiService.getLeaderboardNumPages().then((totalPages) => {
          this.totalPages = totalPages;
        });
      });
    },
    submitPnL() {
      apiService.postPnL(this.pnlInput).then(() => {
        this.fetchLeaderboard();
      });
    },
    tokenChanged() {
      apiService.setToken(this.token);
    },
    updatePnL() {
      apiService.patchPnL(this.pnlInput).then(() => {
        this.fetchLeaderboard();
      });
    },
    getRank() {
      apiService.getRank().then((rank) => {
        this.rank = rank;
      });
    },
    setCurPage(pageNo) {
      this.curPage = pageNo;
      this.fetchLeaderboard(pageNo);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
