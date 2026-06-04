# Vocabulary Reciting
一个通过词前缀分类背诵四六级单词的网站。
## 

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
