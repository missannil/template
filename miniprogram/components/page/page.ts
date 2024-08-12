import { DefineComponent, RootComponent } from "annil";
import { M_color } from "../../module/color";

const rootComponent = RootComponent()({
  store: {
    colorVariables: () => M_color.colorVariables,
  },
});
const page = DefineComponent({
  name: "page",
  rootComponent,
  // subComponents:[]
});
export type $Page = typeof page;
