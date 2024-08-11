import typescript from "rollup-plugin-typescript2";
export default [
  {
    input: "./cloudBase/cloudfunctions/getStandardGoodsList/index.ts",
    output: { file: "./cloudBase/cloudfunctions/getStandardGoodsList/index.js", format: "cjs" },
    plugins: [typescript({
      tsconfig: "tsconfig.cloudBase.json",
    })],
  },
];
