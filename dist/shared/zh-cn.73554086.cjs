'use strict';

const console$1 = require('console');
const process = require('process');

const name = "@translated-lint/zh-cn";
const version = "0.0.29";

const PACKAGE_NAME = name;

const parseLogMsg = (msg, affix) => {
  const append = `[${PACKAGE_NAME}]\uFF1A`;
  const affixs = affix ? affix : "";
  return append.concat(affixs).concat(msg);
};
const handleBadCommit = (msg, affix = "\u26A0\uFE0F") => {
  console.error(parseLogMsg("\u672A\u901A\u8FC7\u63D0\u4EA4\u6D88\u606F\u68C0\u67E5", affix));
  console.log(parseLogMsg(msg, affix));
};
const hadnleQualifiedCommit = (msg, affix = "\u2764\uFE0F  ") => {
  console.log(parseLogMsg(msg, affix));
};

const checkWidth = (partName, part, maxWidth, exitCode) => {
  if (maxWidth && part.length > maxWidth) {
    handleBadCommit(
      `${partName}\u5DF2\u8FBE${part.length}\u4E2A\u5B57\u7B26\uFF0C\u6700\u591A${maxWidth}\u4E2A\u5B57\u7B26\uFF0C\u8BF7\u4FEE\u6539\u540E\u518D\u8BD5`
    );
    process.exit(exitCode);
  }
};
const checkRequired = (partName, part, required, exitCode) => {
  if (required && part && part.trim().length <= 0) {
    handleBadCommit(`${partName}\u4E0D\u80FD\u4E3A\u7A7A`);
    process.exit(exitCode);
  }
};
const checkInclude = (partName, part, range, exitCode) => {
  if (part && range && range.length > 0 && !range.includes(part)) {
    handleBadCommit(
      `${partName}\u5FC5\u987B\u662F[${range.join(",")}]\u4E2D\u7684\u4E00\u4E2A\uFF0C\u8BF7\u4FEE\u6539\u540E\u91CD\u8BD5\u3002`
    );
    process.exit(exitCode);
  }
};
const checkIgnore = (msg, ignoredCases) => {
  if (ignoredCases && ignoredCases.length > 0) {
    const shouldBeIgnored = ignoredCases.some(
      (reg) => new RegExp(reg.rule, reg.flag).test(msg.trim())
    );
    if (shouldBeIgnored) {
      hadnleQualifiedCommit("\u6839\u636E\u7ED9\u5B9A\u89C4\u5219\uFF0C\u5FFD\u7565\u672C\u6B21\u68C0\u67E5");
      process.exit(0);
    }
  }
};
const checkHeader = (header, breakings, headerRule, breakingsRule) => {
  const w = header.split("\uFF1A");
  if (w.length < 2) {
    handleBadCommit("\u6807\u9898\u5E94\u4E3A\u{1F447}\uFF0C\u8BF7\u786E\u4FDD\u4F7F\u7528\u4E2D\u6587\u5192\u53F7");
    console$1.log(parseLogMsg("\u7C7B\u578B(\u8303\u56F4)\uFF1A\u4E3B\u9898\u5185\u5BB9"));
    console$1.log(parseLogMsg("\u8BF7\u4FEE\u6539\u540E\u518D\u8BD5"));
    process.exit(100);
  }
  const hasScope = header.includes("(");
  const type = hasScope ? header.split("(")[0].trim() : w[0].trim();
  const scope = hasScope ? header.match(/\(.+\)/)?.[0].replace(/[()]/g, "") : null;
  const subject = w[1].trim();
  const checkType = (type2) => {
    const typeRule = headerRule.types;
    checkInclude("\u7C7B\u578B", type2, typeRule, 101);
    return true;
  };
  const checkScope = (scope2) => {
    const scopeRule = headerRule.scopes;
    checkInclude("\u8303\u56F4", scope2, scopeRule, 102);
    return true;
  };
  const checkSubject = (subject2) => {
    const subjectRule = headerRule.subject;
    checkWidth("\u6807\u9898", subject2, subjectRule.maxWidth, 103);
    checkRequired("\u6807\u9898", subject2, subjectRule.required, 103);
    return true;
  };
  const checkBreakingMark = () => {
    const breakingMark = headerRule.excalmationMark;
    const breakingStartsWith = breakingsRule?.startsWith;
    if (breakingMark && breakingStartsWith && breakings.substring(breakingStartsWith.length).trim().length > 0 && !header.includes(breakingMark)) {
      handleBadCommit("\u672C\u6B21\u66F4\u65B0\u4E3A\u7834\u574F\u6027\u66F4\u65B0\uFF0C\u4F46\u7F3A\u5C11\u76F8\u5173\u6807\u5FD7\u{1F447}");
      console$1.log(parseLogMsg(`\u7834\u574F\u6027\u66F4\u65B0\u6240\u9700\u6807\u5FD7\uFF1A${breakingMark}`));
      console$1.log(parseLogMsg("\u8BF7\u4FEE\u6539\u540E\u518D\u8BD5"));
      process.exit(104);
    }
    return true;
  };
  return {
    type: checkType(type),
    scope: checkScope(scope),
    subject: checkSubject(subject),
    breakingMark: checkBreakingMark()
  };
};
const checkBody = (body, bodyRule) => {
  checkWidth("\u8BE6\u7EC6\u8BF4\u660E", body, bodyRule.maxWidth, 201);
  checkRequired("\u8BE6\u7EC6\u8BF4\u660E", body, bodyRule.required, 202);
  return true;
};
const checkBreakings = (breakings, breakingsRule) => {
  if (breakingsRule) {
    checkWidth("\u7834\u574F\u6027\u66F4\u65B0", breakings, breakingsRule.maxWidth, 301);
    checkRequired("\u7834\u574F\u6027\u66F4\u65B0", breakings, breakingsRule.required, 302);
  }
  const breakingsShouldBeStartWith = breakingsRule?.startsWith;
  if (breakings.length > 0 && breakingsShouldBeStartWith && !breakings.startsWith(breakingsShouldBeStartWith)) {
    handleBadCommit(`\u7834\u574F\u6027\u66F4\u65B0\u7684\u8BE6\u7EC6\u8BF4\u660E\u5E94\u5F53\u4EE5\u{1F447}`);
    console$1.log(parseLogMsg(`\u5F00\u5934\uFF0C\u8BF7\u4FEE\u6539\u540E\u518D\u8BD5`));
    process.exit(303);
  }
  return true;
};
const checkIssue = (issue, issueRule) => {
  if (issueRule) {
    checkWidth("issue ", issue, issueRule.maxWidth, 401);
    checkRequired("issue ", issue, issueRule.required, 402);
  }
  const issuePrefix = issueRule?.prefix;
  const issueShouldBeStartWith = issueRule?.startsWith;
  if (typeof issuePrefix === "string" && issue && issue.length > 0 && !issue.startsWith(issuePrefix)) {
    handleBadCommit(`issue \u8BF4\u660E\u5E94\u5F53\u4EE5${issuePrefix}\u5F00\u5934\uFF0C\u8BF7\u4FEE\u6539\u540E\u518D\u8BD5`);
    process.exit(4);
  }
  if (typeof issueShouldBeStartWith === "object" && issue && issue.length > 0 && issueShouldBeStartWith.length > 0) {
    const result = issueShouldBeStartWith.some(
      (prefix) => issue.slice(issue.indexOf(issuePrefix) + 1, issue.length).startsWith(prefix)
    );
    if (!result) {
      handleBadCommit(
        `issue \u5E94\u5F53\u4EE5[${issueShouldBeStartWith.join(
          "\uFF0C"
        )}]\u4E2D\u4EFB\u610F\u4E00\u4E2A\u5F00\u5934\uFF0C\u8BF7\u4FEE\u6539\u540E\u518D\u8BD5`
      );
      process.exit(4);
    }
  }
  return true;
};

exports.PACKAGE_NAME = PACKAGE_NAME;
exports.checkBody = checkBody;
exports.checkBreakings = checkBreakings;
exports.checkHeader = checkHeader;
exports.checkIgnore = checkIgnore;
exports.checkIssue = checkIssue;
exports.hadnleQualifiedCommit = hadnleQualifiedCommit;
exports.parseLogMsg = parseLogMsg;
exports.version = version;
