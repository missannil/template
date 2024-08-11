import { instanceConfig } from "annil";

instanceConfig.setInjectInfo({
  options: {
    addGlobalClass: true,
    virtualHost: true,
    // styleIsolation: "apply-shared",
    multipleSlots: true,
    pureDataPattern: /^_/,
  },
});

// 声明注入类型
// declare module "annil" {
// 	interface IInjectInfo {
// 		// data: {
// 		// 	//...
// 		// };
// 	}
// }
