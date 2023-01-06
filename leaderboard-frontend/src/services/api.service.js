import axios from 'axios';
import config from '../config';

const baseURL = `${config.BASE_DOMAIN}/api`;

class ApiService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL,
    });
  }

  setToken(token) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async getLeaderboard(pageNo) {
    try {
      const res = await this.axiosInstance.get('/leaderboard', {
        params: {
          pageNo,
        },
      });
      return res.data;
    } catch (err) {
      alert(`Error: ${err.response.data}`);
      return [];
    }
  }

  async getLeaderboardNumPages() {
    try {
      const res = await this.axiosInstance.get('/leaderboard/totalPages');
      return res.data;
    } catch (err) {
      alert(`Error ${err.resonse.data}`);
      return 0;
    }
  }

  async getRank() {
    try {
      const res = await this.axiosInstance.get('/rank');
      return res.data;
    } catch (err) {
      alert(`Error: ${err.response.data}`);
      return null;
    }
  }

  async postPnL(pnl) {
    try {
      await this.axiosInstance.post('/pnl', { pnl });
    } catch (err) {
      alert(`Error: ${err.response.data}`);
    }
  }

  async patchPnL(pnl) {
    try {
      await this.axiosInstance.patch('/pnl', { pnl });
    } catch (err) {
      alert(`Error: ${err.response.data}`);
    }
  }
}

const apiService = new ApiService();

export default apiService;
