import { DefineComponent, RootComponent, SubComponent } from "annil";
import type { $Page } from "../../components/page/page";

const page = SubComponent<Root, $Page>()({});

type Root = typeof rootComponent;

const rootComponent = RootComponent()({
  isPage: true,
});
const index = DefineComponent({
  path: "/pages/index/index",
  rootComponent,
  subComponents: [page],
});
export type $Index = typeof index;
