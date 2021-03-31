<template>
  <div class="home">
    <div class="header">头部</div>
    <van-tabs v-model:active="active" @change="onSwitchTab" sticky>
      <van-tab v-for="tab in tabTypes" :key="tab.val" :title="tab.name">
        <van-loading
          class="loading-box"
          v-show="showLoading"
          type="spinner"
          color="#333333"
        />
        <van-list
          v-model:loading="loading"
          :finished="finished"
          :immediate-check="false"
          @load="onLoad"
          finished-text="没有更多了"
        >
          <div class="topic-cell" v-for="item in list" :key="item.id">
            <div class="avatar">
              <img :src="item.author.avatar_url" alt="avatar" />
            </div>
            <div class="info">
              <div class="top-cell">
                <div :class="item.top || item.good ? 'green' : 'gray'">
                  {{ getCurTabTag(item) }}
                </div>
                <div class="topic-title">{{ item.title }}</div>
              </div>
              <p class="bottom-cell">
                <span class="read">
                  <i class="replies-count">{{ item.reply_count }}</i>
                  <i class="seperator">/</i>
                  <i class="visits-count">{{ item.visit_count }}</i>
                </span>
                <span class="time">{{
                  getFormatTime(item.last_reply_at)
                }}</span>
              </p>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs, createApp } from "vue";
import { AxiosResponse, AxiosError } from "axios";
import { getTopics, getTopicsArgsInterface } from "@/api/topics";
import { Tab, Tabs, List, Loading } from "vant";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);
export default defineComponent({
  name: "Home",
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [List.name]: List,
    [Loading.name]: Loading,
  },
  setup() {
    const tabTypes = [
      { name: "综合", val: "all" },
      { name: "精华", val: "good" },
      { name: "分享", val: "share" },
      { name: "问答", val: "ask" },
      { name: "招聘", val: "job" },
    ];
    const state = reactive({
      active: 0,
      list: [],
      loading: false,
      finished: false,
      page: 1,
      showLoading: false,
    });

    onMounted(() => {
      getAjaxData();
    });
    // 切换 tab
    const onSwitchTab = (index: number) => {
      state.list = [];
      state.active = index;
      state.page = 1;
      getAjaxData();
    };

    // 获取数据
    const getAjaxData = () => {
      state.showLoading = true;
      const params: getTopicsArgsInterface = {
        page: state.page,
        tab: tabTypes[state.active].val,
        limit: 20,
      };
      getTopics(params)
        .then((res: AxiosResponse): void => {
          console.log(res);
          if (state.page === 1) {
            state.list = res.data.data;
          } else {
            state.list = state.list.concat(res.data.data);
          }
          state.loading = false;
          if (res.data.data.length < 20) {
            state.finished = true;
          } else {
            state.finished = false;
          }
          state.showLoading = false;
        })
        .catch((err: AxiosError): void => {
          console.log(err);
        });
    };

    // load
    const onLoad = () => {
      console.log("load");
      if (!state.finished) {
        state.page = state.page + 1;
        getAjaxData();
      }
    };

    // tag map
    const getCurTabTag = (item: any): string => {
      enum TabTag {
        all = "综合",
        good = "精华",
        share = "分享",
        ask = "问答",
        job = "招聘",
      }
      if (item.good) {
        return "精华";
      } else {
        const tab: string = item.tab;
        return (TabTag as any)[tab];
      }
    };

    // time format
    const getFormatTime = (timeStr: string) => {
      return dayjs(timeStr).fromNow();
    };

    return {
      tabTypes,
      onSwitchTab,
      onLoad,
      getCurTabTag,
      getFormatTime,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
}
.home {
  height: 100%;
}
.header {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-weight: bold;
  background: #ee0a24;
}
.loading-box {
  text-align: center;
  margin-top: 100px;
}
.topic-cell {
  width: 100%;
  height: 70px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
  display: flex;
  .avatar {
    width: 75px;
    min-width: 75px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 45px;
      height: 45px;
    }
  }
  .info {
    width: calc(100% - 75px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    .top-cell {
      display: flex;
      flex-wrap: nowrap;
      white-space: nowrap;
      word-break: keep-all;
      .green {
        background: #80bd01;
        padding: 2px 4px;
        border-radius: 3px;
        color: #fff;
        font-size: 12px;
      }
      .gray {
        background: #e5e5e5;
        padding: 2px 4px;
        border-radius: 3px;
        color: #999999;
        font-size: 12px;
      }
      .topic-title {
        flex: 1;
        font-size: 14px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 5px;
      }
    }
    .bottom-cell {
      display: flex;
      justify-content: space-between;
      padding: 0 10px 0 36px;
      font-size: 12px;
      margin-top: 10px;
      box-sizing: border-box;
      .read {
        color: #333333;
        .replies-count {
          color: #9e78c0;
        }
        .visits-count {
          color: #b4b4b4;
        }
      }
      .time {
        color: #778087;
      }
    }
  }
}
</style>
