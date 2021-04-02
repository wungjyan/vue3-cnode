<template>
  <div v-if="topic" class="topic-page">
    <header>
      <div class="title">
        <span v-show="topic.good" class="good-tag">精华</span>
        <span class="name">{{ topic.title }}</span>
      </div>
      <div class="info">
        <span>发布于 {{ getFormatTime(topic.create_at) }}，</span>
        <span>作者 {{ topic.author.loginname }}，</span>
        <span>{{ topic.visit_count }} 次浏览，</span>
        <span>来自 {{ topic.tab }}</span>
      </div>
    </header>
    <main class="main-content" v-html="topic.content"></main>
    <div class="reply-box">
      <div class="header">
        <span>{{ topic.reply_count }}回复</span>
        <span @click="addReply">添加评论</span>
      </div>
      <replies-list :list="topic.replies"></replies-list>
    </div>

    <div class="goback" @click="goBack">返回</div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  toRefs,
  getCurrentInstance,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { getTopicContent } from "@/api/topics";
import RepliesList from "./components/RepliesList.vue";

export default defineComponent({
  name: "Topic",
  components: { RepliesList },
  setup() {
    const state = reactive({
      topic: null,
    });

    const route = useRoute();
    const id = route.params.id as number | string;

    onMounted(() => {
      const ajaxData = {
        id: id,
      };
      getTopicContent(ajaxData).then((res) => {
        console.log(res);
        if (res.data.success) {
          state.topic = res.data.data;
        }
      });
    });

    const { ctx } = getCurrentInstance() as any;
    const getFormatTime = (timeStr: string) => {
      return ctx.$dayjs(timeStr).fromNow();
    };

    // 添加评论
    const addReply = () => {
      console.log(11);
    };

    // 返回
    const router = useRouter();
    const goBack = () => {
      router.go(-1);
    };
    return {
      getFormatTime,
      addReply,
      goBack,
      ...toRefs(state),
    };
  },
});
</script>

<style lang="less" scoped>
.topic-page {
  header {
    padding: 5px 10px;
    border-bottom: 1px solid #838383;
    .title {
      .good-tag {
        display: inline-block;
        background: #80bd01;
        padding: 2px 4px;
        border-radius: 3px;
        color: #fff;
        font-size: 16px;
        margin-right: 5px;
      }
      .name {
        font-size: 20px;
        font-weight: 700;
        color: #333;
      }
    }
    .info {
      font-size: 12px;
      color: #838383;
    }
  }
  .main-content {
    font-size: 14px;
    color: #333;
    padding: 10px;
  }
  .reply-box {
    margin-top: 10px;
    .header {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      background-color: #f6f6f6;
      padding: 5px 10px;
    }
  }
  .goback {
    position: fixed;
    left: 0;
    top: 200px;
    width: 45px;
    height: 30px;
    padding-left: 5px;
    line-height: 30px;
    font-size: 16px;
    color: #ffffff;
    background: rgba(0, 0, 0, 0.5);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
}
</style>
