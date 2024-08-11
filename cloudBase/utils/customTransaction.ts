// export type Busy = { status: "busy"; data: unknown };

// /**
//  * @param db
//  * @param handle
//  * @param count 默认10重试
//  * @returns
//  */
// export async function concurrentTransaction<T>(
//   db: DB.Database,
//   func: (transaction: DB.Transaction) => Promise<T>,
//   times = 10,
// ): Promise<T | Busy> {
//   let count = 0;
//   async function recursion(): Promise<T | Busy> {
//     try {
//       return await db.runTransaction(func, 0);
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       // 数据不对引起的，通过rollback抛出的
//       // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
//       if (error.status === "fail") {
//         return error as T;
//       }
//       if (count < times) {
//         count++;

//         return await recursion();
//       } else {
//         // 事务冲突引起的
//         return { status: "busy", data: error };
//       }
//     }
//   }

//   return await recursion();
// }
