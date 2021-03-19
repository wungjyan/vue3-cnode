import request from "@/utils/request";
import { AxiosPromise } from "axios";

interface getTopicsArgs {
  page: number;
  tab: string;
  limit: number;
  mdrender?: string;
}
// 获取主题列表
export const getTopics = (params: getTopicsArgs): AxiosPromise => {
  return request({
    url: "/topics",
    method: "get",
    params,
  });
};

interface getTopicContentArgs {
  id: number | string;
  mdrender?: string;
  accesstoken?: string;
}
// 获取主题详情
export const getTopicContent = (params: getTopicContentArgs): AxiosPromise => {
  return request({
    url: "/topic/" + params.id,
    method: "get",
    params,
  });
};

interface createTopicsArgs {
  accesstoken: string;
  title: string;
  tab: string;
  content: string;
}
// 新建主题
export const createTopics = (params: createTopicsArgs): AxiosPromise => {
  return request({
    url: "/topics",
    method: "get",
    params,
  });
};
