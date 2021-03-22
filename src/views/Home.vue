<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AxiosResponse, AxiosError } from "axios";
import { getTopics } from "@/api/topics";
export default defineComponent({
  name: "Home",
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
