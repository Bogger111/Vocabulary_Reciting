const wordRootData = [
  {
    id: "pro",
    prefix: "pro-",
    meaning: "向前，支持，公开",
    description: "pro- 常表示向前、赞成、公开或推动。",
    words: [
      {
        id: "pro_profession",
        word: "profession",
        phonetic: "[prəˈfeʃən]",
        partOfSpeech: "n.",
        meaning: "职业",
        example: "Teaching is a respected profession.",
        exampleZh: "教师是一种受人尊敬的职业。"
      },
      {
        id: "pro_professor",
        word: "professor",
        phonetic: "[prəˈfesər]",
        partOfSpeech: "n.",
        meaning: "教授",
        example: "The professor explained the theory clearly.",
        exampleZh: "教授清楚地解释了这个理论。"
      },
      {
        id: "pro_progress",
        word: "progress",
        phonetic: "[ˈprɑːɡres]",
        partOfSpeech: "n. / v.",
        meaning: "进步；前进",
        example: "She made great progress in English.",
        exampleZh: "她在英语方面取得了很大进步。"
      },
      {
        id: "pro_promote",
        word: "promote",
        phonetic: "[prəˈmoʊt]",
        partOfSpeech: "v.",
        meaning: "促进；提升",
        example: "Exercise can promote better health.",
        exampleZh: "运动可以促进健康。"
      },
      {
        id: "pro_protect",
        word: "protect",
        phonetic: "[prəˈtekt]",
        partOfSpeech: "v.",
        meaning: "保护",
        example: "Sunscreen helps protect your skin.",
        exampleZh: "防晒霜有助于保护你的皮肤。"
      }
    ]
  },
  {
    id: "un",
    prefix: "un-",
    meaning: "不，否定，相反",
    description: "un- 常放在形容词或动词前，表示否定、反向或取消。",
    words: [
      {
        id: "un_unhappy",
        word: "unhappy",
        phonetic: "[ʌnˈhæpi]",
        partOfSpeech: "adj.",
        meaning: "不高兴的",
        example: "He felt unhappy about the result.",
        exampleZh: "他对结果感到不高兴。"
      },
      {
        id: "un_unknown",
        word: "unknown",
        phonetic: "[ˌʌnˈnoʊn]",
        partOfSpeech: "adj.",
        meaning: "未知的",
        example: "The cause of the problem is still unknown.",
        exampleZh: "这个问题的原因仍然未知。"
      },
      {
        id: "un_unlock",
        word: "unlock",
        phonetic: "[ʌnˈlɑːk]",
        partOfSpeech: "v.",
        meaning: "开锁；解锁",
        example: "Use the card to unlock the door.",
        exampleZh: "用这张卡解锁门。"
      },
      {
        id: "un_unfair",
        word: "unfair",
        phonetic: "[ʌnˈfer]",
        partOfSpeech: "adj.",
        meaning: "不公平的",
        example: "The rule seems unfair to new students.",
        exampleZh: "这条规则对新生来说似乎不公平。"
      },
      {
        id: "un_unusual",
        word: "unusual",
        phonetic: "[ʌnˈjuːʒuəl]",
        partOfSpeech: "adj.",
        meaning: "不寻常的",
        example: "That is an unusual way to solve the problem.",
        exampleZh: "那是一种不寻常的解题方法。"
      }
    ]
  },
  {
    id: "sub",
    prefix: "sub-",
    meaning: "在下，次级，从属",
    description: "sub- 常表示位置在下方、层级较低或从属关系。",
    words: [
      {
        id: "sub_subway",
        word: "subway",
        phonetic: "[ˈsʌbweɪ]",
        partOfSpeech: "n.",
        meaning: "地铁",
        example: "I take the subway to work.",
        exampleZh: "我乘地铁去上班。"
      },
      {
        id: "sub_submarine",
        word: "submarine",
        phonetic: "[ˌsʌbməˈriːn]",
        partOfSpeech: "n.",
        meaning: "潜水艇",
        example: "The submarine moved silently underwater.",
        exampleZh: "潜水艇在水下安静地移动。"
      },
      {
        id: "sub_subtitle",
        word: "subtitle",
        phonetic: "[ˈsʌbtaɪtl]",
        partOfSpeech: "n.",
        meaning: "字幕；副标题",
        example: "The movie has English subtitles.",
        exampleZh: "这部电影有英文字幕。"
      },
      {
        id: "sub_subdivide",
        word: "subdivide",
        phonetic: "[ˌsʌbdɪˈvaɪd]",
        partOfSpeech: "v.",
        meaning: "再分；细分",
        example: "The teacher subdivided the class into groups.",
        exampleZh: "老师把班级细分成几个小组。"
      },
      {
        id: "sub_subconscious",
        word: "subconscious",
        phonetic: "[ˌsʌbˈkɑːnʃəs]",
        partOfSpeech: "adj. / n.",
        meaning: "潜意识的；潜意识",
        example: "Music can affect the subconscious mind.",
        exampleZh: "音乐会影响潜意识。"
      }
    ]
  },
  {
    id: "trans",
    prefix: "trans-",
    meaning: "穿过，转移，改变",
    description: "trans- 常表示跨越、转移、转换或状态改变。",
    words: [
      {
        id: "trans_transport",
        word: "transport",
        phonetic: "[ˈtrænspɔːrt]",
        partOfSpeech: "v. / n.",
        meaning: "运输；交通",
        example: "Trucks transport goods across the country.",
        exampleZh: "卡车在全国范围内运输货物。"
      },
      {
        id: "trans_translate",
        word: "translate",
        phonetic: "[trænsˈleɪt]",
        partOfSpeech: "v.",
        meaning: "翻译",
        example: "Can you translate this sentence into Chinese?",
        exampleZh: "你能把这个句子翻译成中文吗？"
      },
      {
        id: "trans_transform",
        word: "transform",
        phonetic: "[trænsˈfɔːrm]",
        partOfSpeech: "v.",
        meaning: "改变；转变",
        example: "Technology can transform the way we learn.",
        exampleZh: "技术可以改变我们的学习方式。"
      },
      {
        id: "trans_transfer",
        word: "transfer",
        phonetic: "[trænsˈfɜːr]",
        partOfSpeech: "v. / n.",
        meaning: "转移；调动",
        example: "He will transfer to another department.",
        exampleZh: "他将调到另一个部门。"
      },
      {
        id: "trans_transparent",
        word: "transparent",
        phonetic: "[trænsˈpærənt]",
        partOfSpeech: "adj.",
        meaning: "透明的；清楚的",
        example: "The company wants a transparent process.",
        exampleZh: "公司想要一个透明的流程。"
      }
    ]
  },
  {
    id: "inter",
    prefix: "inter-",
    meaning: "在...之间，相互",
    description: "inter- 常表示两者或多者之间的关系、交流或相互作用。",
    words: [
      {
        id: "inter_international",
        word: "international",
        phonetic: "[ˌɪntərˈnæʃənl]",
        partOfSpeech: "adj.",
        meaning: "国际的",
        example: "English is an international language.",
        exampleZh: "英语是一门国际语言。"
      },
      {
        id: "inter_interview",
        word: "interview",
        phonetic: "[ˈɪntərvjuː]",
        partOfSpeech: "n. / v.",
        meaning: "面试；采访",
        example: "She has an interview tomorrow morning.",
        exampleZh: "她明天上午有一个面试。"
      },
      {
        id: "inter_interact",
        word: "interact",
        phonetic: "[ˌɪntərˈækt]",
        partOfSpeech: "v.",
        meaning: "互动；相互作用",
        example: "Students interact with each other in class.",
        exampleZh: "学生们在课堂上彼此互动。"
      },
      {
        id: "inter_internet",
        word: "internet",
        phonetic: "[ˈɪntərnet]",
        partOfSpeech: "n.",
        meaning: "互联网",
        example: "The internet connects people around the world.",
        exampleZh: "互联网连接着世界各地的人们。"
      },
      {
        id: "inter_interchange",
        word: "interchange",
        phonetic: "[ˈɪntərtʃeɪndʒ]",
        partOfSpeech: "n. / v.",
        meaning: "交换；互换",
        example: "The two teams interchange ideas regularly.",
        exampleZh: "两个团队定期交换想法。"
      }
    ]
  }
];
