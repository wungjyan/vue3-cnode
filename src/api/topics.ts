import request from "@/utils/request";
import { AxiosPromise } from "axios";

export interface getTopicsArgsInterface {
  page: number;
  tab: string;
  limit: number;
  mdrender?: string;
}
// 获取主题列表
export const getTopics = (params: getTopicsArgsInterface): AxiosPromise => {
  return request({
    url: "/topics",
    method: "get",
    params,
  });
};

interface getTopicContentArgsInterface {
  id: number | string;
  mdrender?: string;
  accesstoken?: string;
}
// 获取主题详情
export const getTopicContent = (
  params: getTopicContentArgsInterface
): AxiosPromise => {
  return request({
    url: "/topic/" + params.id,
    method: "get",
    params,
  });
};

interface createTopicsArgsInterface {
  accesstoken: string;
  title: string;
  tab: string;
  content: string;
}
// 新建主题
export const createTopics = (
  params: createTopicsArgsInterface
): AxiosPromise => {
  return request({
    url: "/topics",
    method: "get",
    params,
  });
};
