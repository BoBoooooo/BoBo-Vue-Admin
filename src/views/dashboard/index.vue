<template>
<div id="app">

   <v-app id="inspire" class="no-bg">
    <v-container fluid grid-list-md class="no-padding">


      <v-layout row wrap>
        <v-flex d-flex xs12 sm6 md8>
             <v-card>
          <v-toolbar color="purple" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-toolbar-title>系统公告</v-toolbar-title>
             <v-spacer></v-spacer>
            <!-- <v-btn icon>
              <v-icon>calendar</v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon>notice</v-icon>
            </v-btn> -->
          </v-toolbar>
          <v-list two-line>
            <template v-for="(item, index) in items">
              <v-list-tile :key="index" avatar ripple @click="Detail(item.id)">
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <!-- <v-list-tile-sub-title class="text--primary">{{ item.headline }}</v-list-tile-sub-title> -->
                  <!-- <v-list-tile-sub-title style="margin-top:10px">{{item.content}}</v-list-tile-sub-title> -->
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-list-tile-action-text>{{ item.date }}</v-list-tile-action-text>
                  <v-icon color="grey lighten-1">star_border</v-icon>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </v-card>
        </v-flex>

        <v-flex d-flex xs12 sm6 md4 child-flex>
          <v-card
      class="mx-auto"
      max-width="400"
    >
      <v-card
        dark
        flat
      >
        <v-btn
          absolute
          bottom
          color="pink"
          right
          fab
        >
          <v-icon>face</v-icon>
        </v-btn>

           <v-toolbar color="purple" dark>
            <v-toolbar-side-icon></v-toolbar-side-icon>

          <h3 class="title font-weight-light text-xs-center grow">简介</h3>
          <v-avatar>
            <v-img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"></v-img>
          </v-avatar>
          </v-toolbar>


        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest.jpg"
          gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
        >
          <v-container fill-height>
            <v-layout align-center>
              <strong class="display-4 font-weight-regular mr-4">17</strong>
              <v-layout column justify-end>
                <div class="headline font-weight-light">Sunday</div>
                <div class="text-uppercase font-weight-light">February 2019</div>
              </v-layout>
            </v-layout>
          </v-container>
        </v-img>
      </v-card>
      <v-card-text class="py-0">
        <v-timeline
          align-top
          dense
        >
          <v-timeline-item
            color="pink"
            small
          >
            <v-layout pt-3>
              <v-flex xs3>
                <strong>毕设题目</strong>
              </v-flex>
              <v-flex>
                <strong>企业员工工资管理系统</strong>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            color="indigo lighten-3"
            small
          >
            <v-layout wrap pt-3>
              <v-flex xs3>
                <strong>姓名</strong>
              </v-flex>
              <v-flex>
                <strong>刘元</strong>

              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            color="cyan"
            small
          >
            <v-layout pt-3>
              <v-flex xs3>
                <strong>学号</strong>
              </v-flex>
              <v-flex>
                <strong>2015023208</strong>
              </v-flex>
            </v-layout>
          </v-timeline-item>

          <v-timeline-item
            color="amber lighten-3"
            small
          >
            <v-layout pt-3>
              <v-flex xs3>
                <strong>班级</strong>
              </v-flex>
              <v-flex>
                <strong>软件二班</strong>
              </v-flex>
            </v-layout>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
        </v-flex>
      </v-layout>


        <v-dialog v-model="dialog" full-width>
        <v-card>
          <v-card-title>
            <p class="headline">{{entity.title}}</p>
                     <p style="text-align:center;width:100%"><v-icon small>timer</v-icon>发布时间  {{entity.date}}</p>

          </v-card-title>
          <v-card-text v-html="entity.content">

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" flat="flat" @click="dialog = false">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </v-app>


</div>
</template>

<script>

export default {
  name: 'dashboard',

  data() {
    return {
      entity: {
        title: '',
        content: '',
        date: '',
      },
      dialog: false,
      listQuery: {
        totalCount: null,
        pageSize: 10,
        pageNumber: 1,
        searchArr: [
          {
            SearchKey: '',
            SearchValue: '',
            SearchOperator: '',
          },
        ],
      },

      items: [
        // {
        //   action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        // },
        // {
        //   action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend.",
        // },
        // {
        //   action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?',
        // },
        // {
        //   action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
        // },
        // {
        //   action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        // },
      ],
    }
  },
  methods: {
    NoticeList() {
      this.axios({
        url: '/six_notice/list',
        method: 'post',
        data: this.listQuery,
      }).then((response) => {
        this.items = response.data.list;
        this.listQuery.totalCount = response.total;
      })
    },

    Detail(id) {
      this.axios({
        url: '/six_notice/detail',
        method: 'post',
        params: { id },
      }).then((response) => {
        this.entity = response.data;
        this.dialog = true;
      });
    },

  },
  created() {
    this.NoticeList()
  },
}
</script>
<style lang="scss" scoped>
.v-toolbar__content{
  height:55px!important;
}
.v-dialog{
  .headline{
    width: 100%;
    text-align: center;
  }
}
</style>
