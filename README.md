# WordRoot

大学英语四级前缀单词学习页面。项目是纯前端应用，不需要安装依赖。

## 环境要求

- Node.js 18 或更新版本

当前机器已验证可用：Node.js v24.11.1。

## 启动

```powershell
node server.js
```

启动后访问：

```text
http://127.0.0.1:5501/
```

如果要换端口：

```powershell
$env:PORT=5600
node server.js
```

也可以用 npm 启动；如果 PowerShell 拦截 `npm`，请使用 `npm.cmd`：

```powershell
npm.cmd start
```

## 说明

不要直接双击打开 `index.html`。页面会读取 `data/cet4.json`，需要通过本地服务访问才能正常加载词库。

## 扩展词库

词库入口配置在 `js/data-loader.js` 的 `WORD_BOOKS` 中。项目已预留：

- `cet4`：已启用，读取 `data/cet4.json`
- `cet6`：已启用，读取 `data/cet6.json`
- `ielts`：预留，默认关闭，目标文件 `data/ielts.json`

新增词库时，JSON 根节点保持数组格式：

```json
[
  {
    "word": "example",
    "phonetic": "[ɪɡˈzɑːmpəl]",
    "meaning": "例子",
    "prefix": "ex",
    "example": "This is an example.",
    "tags": ["optional"]
  }
]
```

接入步骤：

1. 把词库文件放到 `data/`，例如 `data/cet6.json`。
2. 在 `js/data-loader.js` 的 `WORD_BOOKS` 中把对应项 `enabled` 改为 `true`。
3. 需要新增其他词库时，复制一个配置项并设置唯一 `id`、显示文案和 `dataUrl`。

每个单词的收藏、已学状态会带上词库 ID，避免 CET-4、CET-6、IELTS 之间互相覆盖。
