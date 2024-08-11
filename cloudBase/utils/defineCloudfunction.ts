import type { IfEquals } from "hry-types/src/Any/IfEquals";

/**
 * 云函数事件参数
 */
export type CloudEvent<TData extends object = {}> = {
  userInfo: { openId: string; appId: string };
} & TData;

export function defineCloudfunction<
  TName extends string,
  TData extends object,
  TResult,
>(
  _funcName: TName,
  func: (event: CloudEvent<TData>) => Promise<TResult>,
): IfEquals<TData, object, { name: TName; result: TResult }, { name: TName; data: TData; result: TResult }> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  return exports.main = func as any;
}

export type CloudFuncType = {
  name: string;
  data?: object;
  result: unknown;
};
