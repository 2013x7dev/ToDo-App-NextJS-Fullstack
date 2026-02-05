// 传统写法（等效但更冗长）
// import HomePage from "../page";
// export default HomePage;

// 这里的 { default } 不是在解构一个对象
// 它是在告诉 JavaScript 模块系统："从 ../page 导入默认导出，并将其重新导出为默认导出"
export { default } from "../page";
