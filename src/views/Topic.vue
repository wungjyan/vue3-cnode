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
import { useRoute } from "vue-router";
import { getTopicContent } from "@/api/topics";

export default defineComponent({
  name: "Topic",
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

    return {
      getFormatTime,
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
}
.markdown-text img {
  width: 95%;
}
</style>
