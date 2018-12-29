<template>
  <div class="widget-box">
    <github-corner />

    <el-row>
      <el-col
        v-for="(item,index) in report"
        :key="index"
        :span="6"
        :offset="index%3===0?1:2"
        style="margin-top:5px">
        <el-card shadow="none" :body-style="{ padding: '15px 0px',height:'250px'}">

          <div
            class="dashboard-text"
            style="padding-top:0px">
            <img :src="getImage(item.thumbnail)">
            <a
              :href="'http:\/\/daily.zhihu.com\/story\/'+item.news_id"
              target="_blank"><span style="display:block;font-size:14px">{{ item.title }}</span></a>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import { mapGetters } from 'vuex'
import { parseTime } from '@/utils/index'
import axios from 'axios'

export default {
  name: 'DashBoard',
  components: { GithubCorner },
  data() {
    return {
      currentDate: parseTime(new Date()),
      weather: null,
      loading: false,
      report: null,
      music: null,
      request: '',
      msg: '',
      history: [],
    }
  },
  computed: {
    ...mapGetters(['name', 'roles', 'AllRouters']),
  },
  created() {
    this.GetNowTime()
    this.GetReport()
  },
  methods: {
    getImage(url) {
      if (url !== undefined) {
        return url.replace('https://', 'https://images.weserv.nl/?url=')
      }
    },
    GetNowTime() {
      setInterval(() => {
        this.currentDate = parseTime(new Date())
      }, 1000)
    },
    chat() {
      this.history.push(this.request)
      axios
        .post('/Chat', {
          key: '050b4fa163454f13bf3372cb1715f5d4',
          info: this.request,
          userid: 'a123456',
        })
        .then((response) => {
          console.log(response)
          this.request = ''
          this.history.push(response.data.text)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    GetReport() {
      axios.get('/report/hot').then((response) => {
        console.log(response)
        this.report = response.data.recent
      })
    },
    GetMusic() {
      axios.get('/music?id=3778678&limit=30').then((response) => {
        this.music = response.data
        console.log(this.music)
      })
    },
  },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-card{
  border:none;
}

.dashboard {
  &-title {
    text-align: center;
    font-family: inherit;
    font-size: 40px;
  }
  &-container {
    text-align: center;

    margin: 30px;
  }
  &-text {
    text-align: center;
    margin: 0 30px 30px 30px;

    font-size: 1em;
    line-height: 30px;
    span {
      display: block;
      padding-top: 10px;
      color:black;
    }
  }
}
</style>
