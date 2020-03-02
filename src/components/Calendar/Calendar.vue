<!--
 * @file: 日历插件
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年02月27 10:51:24
 -->
<!-- 组件说明 -->
<template>
  <div>
    <FullCalendar locale="zh-cn"
                  style="background:white"
                  ref="fullCalendar"
                  @eventClick="handleEventClick"
                  @dateClick="handleDateClick"
                  :events="events"
                  selectable
                  :header="{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      }"
                  :buttonText="buttonText"
                  defaultView="dayGridMonth"
                  :plugins="calendarPlugins" />
    <GenerateFormDialog ref="dialog"
                        @afterSave="refreshCalendar"
                        tableName="workcalendar">

    </GenerateFormDialog>
  </div>

</template>

<script>
import FullCalendar from '@fullcalendar/vue';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import GenerateFormDialog from '@/components/BaseDialog/GenerateFormDialog';

export default {
  name: 'Calendar',
  components: {
    FullCalendar,
    GenerateFormDialog,
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin],
      buttonText: {
        today: '今天',
        month: '月',
        week: '周',
        day: '天',
      },
      events: [],
    };
  },
  created() {
    this.initEvents();
  },
  computed: {},
  methods: {
    initEvents() {
      // 初始化日历event
    },
    handleDateClick(arg) {
      this.$refs.dialog.showDialog({}, 0, {
        start: arg.dateStr,
        userid: this.$store.getters.userid,
      });
    },
    handleEventClick(info) {
      this.$refs.dialog.showDialog(
        {},
        1,
        this.events.find(item => item.id === info.event.id),
      );
    },
    async refreshCalendar() {
      await this.initEvents();
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
