import { makeAutoObservable } from "mobx";

type ColorType = {
  primary: string; /* 主题色 */
  "primary-dark": string; /* 主题深色 */
  "neutral-light": string; /* 中性浅色 */
  neutral: string; /* 中性色 */
  "neutral-dark": string; /* 中性深色 */
  accent: string; /* 强调色 */
};

class Color {
  public colors: ColorType = {
    primary: "green", // 默认绿色
    "primary-dark": "#2f855a", // 默认深绿色
    "neutral-light": "#fff", // 默认白色
    neutral: "#aaa", // 默认灰色
    "neutral-dark": "#000", // 默认黑色
    accent: "#f40", // 默认红色
  };
  public get colorVariables() {
    return Object.entries(this.colors)
      .map(([key, value]) => `--color-${key}: ${value};`)
      .join("")
      .trim()
      .concat("color: var(--color-primary);", "background-color: var(--color-neutral-light);");
  }
  public changeColor(key: keyof ColorType, value: string) {
    this.colors[key] = value;
  }
  public constructor() {
    makeAutoObservable(this);
  }
}

export const M_color = new Color();
