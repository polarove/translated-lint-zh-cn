'use strict';

const cac = require('cac');
const index = require('./shared/zh-cn.73554086.cjs');
const console$1 = require('console');
const process$1 = require('process');
const fs = require('fs');

const getDefaultConfig = async () => {
  let defaultTypes = [];
  let maxSubjectWidth = null;
  let maxBodyWidth = null;
  await import('./chunks/shared-config.cjs').then((res) => {
    defaultTypes = Object.keys(res.types).map((key) => {
      const defaultType = res.types;
      return defaultType[key].title;
    });
    maxSubjectWidth = res.maxHeaderWidth;
    maxBodyWidth = res.maxLineWidth;
  }).catch(() => {
    console$1.log(index.parseLogMsg("\u9ED8\u8BA4\u914D\u7F6E\u6587\u4EF6\u5931\u6548\uFF0C\u8BF7\u8FD0\u884C", "\u26A0\uFE0F"));
    console$1.log(
      index.parseLogMsg(
        "npm i @cz-translated-changelog/zh-cn@latest -D",
        "\u26A0\uFE0F"
      )
    );
    console$1.log(index.parseLogMsg("\u6216\u4F7F\u7528\u81EA\u5B9A\u81EA\u5B9A\u4E49\u914D\u7F6E\u6587\u4EF6", "\u26A0\uFE0F"));
    console$1.log(index.parseLogMsg("\u8DF3\u8FC7\u672C\u6B21\u68C0\u67E5...", "\u26A0\uFE0F"));
    process$1.exit(0);
  });
  const defaultConfig = {
    header: {
      types: defaultTypes,
      scopes: [],
      subject: {
        maxWidth: maxSubjectWidth,
        required: true
      },
      excalmationMark: "!"
    },
    body: {
      maxWidth: maxBodyWidth
    },
    breakings: {
      startsWith: "\u7834\u574F\u6027\u66F4\u65B0"
    },
    issue: {
      prefix: "#",
      startsWith: ["\u529F\u80FD"]
    },
    ignored: [
      { rule: "^v|merge|pull request|revert", flag: "i" },
      { rule: "^\\d+(\\.\\d+){0,2}(-)?.*$" }
    ]
  };
  return { defaultConfig };
};
const getCustomConfig = async (customConfigs, customConfigPath) => {
  await import(customConfigPath).then((res) => customConfigs = res.default).catch((err) => {
    console.error(err);
    process.exit(1);
  });
  return { customConfigs };
};

const processMsg = (msg, config) => {
  index.checkIgnore(msg, config.ignored);
  const { header, body, breakings, issue } = stripper(msg);
  index.checkHeader(header, breakings, config.header, config.breakings);
  index.checkBody(body, config.body);
  index.checkBreakings(breakings, config.breakings);
  index.checkIssue(issue, config.issue);
};
const stripper = (pureMsg) => {
  let msgList = pureMsg.split("\n").filter((line) => line.trim().length > 0);
  const header = msgList[0] ? msgList[0] : "";
  const body = msgList[1] ? msgList[1] : "";
  const breakings = msgList[2] ? msgList[2] : "";
  const issue = msgList[3] ? msgList[3] : "";
  return { header, body, breakings, issue };
};

const cli = cac.cac(index.PACKAGE_NAME);
cli.version(index.version).option("--path <path>", "\u63D0\u4EA4\u4FE1\u606F\u7684\u6587\u4EF6\u8DEF\u5F84").option("--config <path>", "\u914D\u7F6E\u6587\u4EF6\u8DEF\u5F84").help();
cli.command("").action(async (args) => {
  if (typeof args.path !== "string")
    return console.error(
      index.parseLogMsg("\u8BF7\u901A\u8FC7 --path \u53C2\u6570\u6307\u5B9A\u63D0\u4EA4\u4FE1\u606F\u6587\u4EF6\u7684\u8DEF\u5F84")
    );
  const message = fs.readFileSync(args.path, { encoding: "utf-8" });
  if (typeof args.config === "string") {
    const { customConfigs } = await getCustomConfig({}, args.config);
    processMsg(message, customConfigs);
  } else {
    const { defaultConfig } = await getDefaultConfig();
    processMsg(message, defaultConfig);
  }
  index.hadnleQualifiedCommit("\u63D0\u4EA4\u6D88\u606F\u901A\u8FC7\u68C0\u67E5\uFF01\u4F60\u771F\u68D2\uFF01");
});
cli.parse();