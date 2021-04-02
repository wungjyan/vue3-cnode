<template>
  <ul class="replies-list">
    <li class="reply-item" v-for="(info, idx) in repliesList" :key="info.id">
      <div class="info-cell">
        <div class="user-info">
          <img class="avatar" :src="info.author.avatar_url" alt="avatar" />
          <span class="name">{{ info.author.loginname }}</span>
          <span class="site"
            >{{ listLen - idx }}楼•{{ getFormatTime(info.create_at) }}</span
          >
        </div>
        <div class="user-action">
          <i class="iconfont icon-dianzan"></i>
          <span>{{ info.ups.length }}</span>
        </div>
      </div>
      <div class="reply-content" v-html="info.content"></div>
    </li>
  </ul>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance } from "vue";
export default defineComponent({
  name: "RepliesList",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props: any) {
    console.log(props.list);

    let repliesList = computed(() => {
      let list = props.list;
      return list.reverse();
    });

    let listLen = computed(() => props.list.length);

    const { ctx } = getCurrentInstance() as any;
    const getFormatTime = (timeStr: string) => {
      return ctx.$dayjs(timeStr).fromNow();
    };

    return {
      listLen,
      repliesList,
      getFormatTime,
    };
  },
});
</script>

<style lang="less" scoped>
.replies-list {
  .reply-item {
    padding: 10px;
    border-top: 1px solid #eeeeee;
    margin-bottom: 10px;
    .info-cell {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-info {
        display: flex;
        justify-content: flex-start;
        font-size: 12px;
        .avatar {
          width: 30px;
          height: 30px;
        }
        .name {
          color: #333;
          margin: 0 5px;
        }
        .site {
          color: #08c;
        }
      }
      .user-action {
        color: gray;
        font-size: 15px;
      }
    }
    .reply-content {
      margin-top: 5px;
    }
  }
}
</style>
