const showConfirmPrompt = true;
const types = {
	feat: {
		description: "功能相关",
		title: "功能"
	},
	css: {
		description: "css样式、sass文件等更改",
		title: "样式"
	},
	fix: {
		description: "缺陷修复",
		title: "修复"
	},
	refactor: {
		description: "修改已有的代码，但未涉及添加新功能或缺陷修复",
		title: "重构"
	},
	release: {
		description: "版本更新有关的行为",
		title: "发布"
	},
	test: {
		description: "与测试代码有关的行为，如编写测试用例，修复测试用例",
		title: "测试"
	},
	docs: {
		description: "文档变更",
		title: "文档"
	},
	style: {
		description: "代码格式调整（空白字符宽度、对齐、添加分隔、代码格式化符等）",
		title: "格式"
	},
	perf: {
		description: "性能优化，代码逻辑优化",
		title: "优化"
	},
	dependencies: {
		description: "项目依赖调整、升级等",
		title: "依赖"
	},
	build: {
		description: "构建工具调整",
		title: "构建"
	},
	ci: {
		description: "  自动化构建脚本变更及相关测试",
		title: "ci"
	},
	revert: {
		description: "撤回上一次提交",
		title: "撤回"
	},
	chore: {
		description: "其他变更",
		title: "其他"
	}
};
const maxHeaderWidth = 100;
const maxLineWidth = 100;
const sharedConfig = {
	showConfirmPrompt: showConfirmPrompt,
	types: types,
	maxHeaderWidth: maxHeaderWidth,
	maxLineWidth: maxLineWidth
};

export { sharedConfig as default, maxHeaderWidth, maxLineWidth, showConfirmPrompt, types };
