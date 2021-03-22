<template>
  <div class="home">
    <van-button>测试</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AxiosResponse, AxiosError } from "axios";
import { getTopics } from "@/api/topics";
import { Button } from "vant";

export default defineComponent({
  name: "Home",
  components: {
    [Button.name]: Button,
  },
  setup() {
    const obj = { page: 1, tab: "ask", limit: 10 };
    getTopics(obj)
      .then((res: AxiosResponse): void => {
        console.log(res);
      })
      .catch((err: AxiosError): void => {
        console.log(err);
      });
  },
});
</script>
