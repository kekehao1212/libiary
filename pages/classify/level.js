var chinese_level = [{
  'first_level': '小说',
  'second_level': ['世界名著', '影视原著', '推理悬疑', '科幻', '言情', '青春', '都市', '幻想', '武侠', '历史']
}, {
  'first_level': '文学',
  'second_level': ['文学经典', '散文随笔', '日志书信', '演讲访谈', '纪实文学', '传记回忆', '诗歌及赏析', '戏剧曲艺', '寓言童话', '文学史', '文学理论与批评', '其他']
}, {
  'first_level': '人文社科',
  'second_level': ['经典著作', '心理学', '社会学', '人类学', '历史', '哲学', '文化', '宗教', '政治', '法律', '教育学', '新闻传播', '编辑出版', '考古', '人文地理', '语言文学', '军事', '其他']
}, {
  'first_level': '经济管理',
  'second_level': ['经典畅销', '创新创业', '市场营销', '企业经营', '投资理财', '领导力', '财务会计', '经济', '金融', '管理', '其他']
}, {
  'first_level': '科技科普',
  'second_level': ['科普百科', '数学', '物理', '化学', '天文', '生物', '医学', '自然地理', '城市建设', '工业技术', '农业技术', '其他']
}, {
  'first_level': '计算机与互联网',
  'second_level': ['行业趋势', '云计算与大数据', '移动互联网', '互联网营销', '办公室指南', '编程语言', '软件开发与应用', '硬件开发', '网络安全', '人工智能', '其他']
}, {
  'first_level': '成功励志',
  'second_level': ['成功学', '励志', '情商与自我提升', '思维智力', '演讲口才', '职场', '人脉与人际关系', '其他']
}, {
  'first_level': '生活',
  'second_level': ['两性情感', '旅行', '美食与厨艺', '时尚美妆', '孕产育儿', '养生保健', '医学常识', '家庭医学', '体育健身', '星座占卜', '游戏娱乐', '宠物园艺', '其他']
}, {
  'first_level': '少儿',
  'second_level': ['家庭教育', '亲子阅读', '儿童文学', '启蒙读物', '少儿科普', '其他']
}, {
  'first_level': '艺术设计',
  'second_level': ['设计', '摄影', '电影', '音乐', '美术', '建筑', '其他']
}, {
  'first_level': '漫画绘本',
  'second_level': ['漫画', '绘本', '其他']
}, {
  'first_level': '教育考试',
  'second_level': ['外语学习', '教材教辅', '国外教材', '其他']
}, {
  'first_level': '杂志',
  'second_level': ['小说视界', '新闻人物', '文艺小赏', '生活休闲', '百科万象']
}]
var foreign_level = [{
  "first_level": ["Literature & Fiction", "文学与小说"],
  "second_level": [
    ["Classics", "经典文学"],
    ["Popular Literature", "通俗文学"],
    ["World Literature", "世界文学"],
    ["Mystery, Thriller & Suspense", "悬疑，惊悚与推理"],
    ["Romance", "浪漫小说"],
    ["Science Fiction", "科幻小说"],
    ["Fantasy", "幻想小说"],
    ["Humor & Satire", "幽默与讽刺"],
    ["Mythology & Folk Tales", "神话与民间故事"],
    ["Historical Fiction", "历史小说"],
    ["Political & Military Fiction", "政治与军事小说"],
    ["Essays & Correspondence", "散文与书信"],
    ["Speech & Discourse", "演讲与演说"],
    ["Drama & Plays", "戏剧"],
    ["Poetry", "诗歌"],
    ["Short Stories & Anthologies", "短篇与选集"],
    ["History & Criticism", "文学史与文学评论"],
    ["TV, Movie & Game Adaptations", "影视游戏相关作品"],
    ["Graphic Novels", "绘本小说"],
    ["Narrative Nonfiction", "纪实文学"]
  ]
}, {
  "first_level": ["Biographies", "传记"],
  "second_level": [
    ["Historical", "历史人物"],
    ["Military & Political", "军事与政治"],
    ["Ethnic & Notional", "民族与种族"],
    ["Arts & Literature", "艺术与文学"],
    ["Professionals & Academic", "专业人士与学者"],
    ["Famous & Royalty", "名流与皇室"],
    ["Science & Technology", "科技界"],
    ["Athletes", "运动员"],
    ["True Crime", "犯罪"],
    ["Specific Groups", "特殊群体"]
  ]
}, {
  "first_level": ["History, Philosophy & Social Sciences", "人文科学"],
  "second_level": [
    ["History", "历史"],
    ["Politics & Government", "政治与政府"],
    ["Law", "法律"],
    ["Journalism & Communication", "新闻传播"],
    ["Education", "教育学"],
    ["Linguistics", "语言学"],
    ["Psychology", "心理学"],
    ["Anthropology", "人类学"],
    ["Archaeology", "考古学"],
    ["Sociology", "社会学"],
    ["Phiosophy", "哲学"],
    ["Reiligions", "宗教"],
    ["Social Sciences", "社会科学"],
    ["Reference", "参考书"]
  ]
}, {
  "first_level": ["Business & Economics", "商业管理与经济学科"],
  "second_level": [
    ["Management & Leadership", "管理与领导力"],
    ["Marketing & Sales", "营销与销售"],
    ["Human Resources", "人力资源"],
    ["Industires", "行业"],
    ["Real Estate", "房地产"],
    ["Wealth Management", "财富管理"],
    ["Startups", "创业企业"],
    ["Economics", "经济学"],
    ["Finance", "金融"],
    ["Accounting", "会计"],
    ["Investing", "投资"],
    ["Taxation", "税务"],
    ["Skills & Business Writing", "商业技巧与商务写作"]
  ]
}, {
  "first_level": ["Self-help & Motivation", "自助励志"],
  "second_level": [
    ["Success", "成功"],
    ["Creativity", "创造力"],
    ["Time Management", "时间管理"],
    ["Self-Improvement", "自我提升"],
    ["Job Hunting & Career Life", "求职与职场生活"],
    ["Social Skills", "社交能力"],
    ["Psychology & Counseling", "心理问题与咨询"],
    ["Marriages & Adult Realationships", "婚姻与成人关系"],
    ["Family Realationships", "家庭关系"],
    ["Spirtual", "身心灵"]
  ]
}, {
  "first_level": ["Computer & Internet", "计算机与互联网"],
  "second_level": [
    ["Computer Science", "计算机科学"],
    ["Software & Apps", "软件与应用"],
    ["Programming & Development", "编程与开发"],
    ["Business & Management", "商业与管理"],
    ["Database & Big Data", "数据库与大数据"],
    ["Social Media", "社交媒体"],
    ["Web Marketing", "网络营销"],
    ["Internet Security", "网络安全"],
    ["Web Design", "网络设计"],
    ["Games & Strategy Guides", "游戏设计与攻略"],
    ["Industry Trends", "行业趋势"]
  ]
}, {
  "first_level": ["Science & Technology", "科学与技术"],
  "second_level": [
    ["Mathematics", "数学"],
    ["Physics", "物理学"],
    ["Astronomy & Space", "天文学与空间科学"],
    ["Medicine", "医学"],
    ["Biology", "生物学"],
    ["Earth Sciences", "地球科学"],
    ["Environmental Science", "环境科学"],
    ["Nature & Ecology", "自然与生态"],
    ["Agricultural Sciences", "农业科学"],
    ["Engineering & Technology", "工程与技术"],
    ["Life Sciences", "生命科学"],
    ["Research & Reference", "科研与参考书"],
    ["Popular Science", "科普读物"]
  ]
}, {
  "first_level": ["Children, Teen & Young Adult's eBooks", "儿童与青少年读物"],
  "second_level": [
    ["Literature", "文学"],
    ["Mysteries & Thrillers", "推理与惊悚"],
    ["Science Fiction & Fantasy", "科幻与奇幻"],
    ["Love & Romance", "爱情与浪漫"],
    ["Historical Fiction", "历史小说"],
    ["Health, Mind & Body", "身心健康"],
    ["Social & Family Issues", "社会与家庭问题"],
    ["Sports & Games", "运动与游戏"],
    ["Comic Strips & Cartoons", "连环漫画与卡通"],
    ["Education & Reference", "教育与参考书"],
    ["Arts, Music & Photography", "艺术，音乐与摄影"],
    ["Fariy Tales, Folk Tales & Myths", "童话，民间故事与神话"],
    ["Encyclopedia", "百科"]
  ]
}, {
  "first_level": ["Health, Family & Lifestyle", "健康，家庭与生活方式"],
  "second_level": [
    ["Health & Diseases", "健康与疾病"],
    ["Children's Health", "儿童健康"],
    ["Nutrition", "营养学"],
    ["Diets & Weight Loss", "饮食控制与减重"],
    ["Beauty & Style", "美容与造型"],
    ["Addition & Recovery", "上瘾与康复"],
    ["Baking", "烘焙"],
    ["Beverages & Wine", "饮品与酒"],
    ["General Cuisine & Recipes", "日常烹饪与菜谱"],
    ["Global Cuisine & Recipes", "国际烹饪与菜谱"],
    ["Pets Care", "宠物"],
    ["Exercise & Fitness", "锻炼与健康"],
    ["Parenting & Education", "养育与教育"],
    ["Gardening, Crafts & Collectibles", "园艺，手工与收藏"],
    ["Home Design", "家居设计"],
    ["Humor & Entertainment", "幽默与娱乐"],
    ["Weddings", "婚礼"]
  ]
}, {
  "first_level": ["Art", "艺术"],
  "second_level": [
    ["Drawing", "绘画"],
    ["Architecture", "建筑"],
    ["Collections, Catalogs & Exhibitions", "收藏与展览"],
    ["Design", "设计"],
    ["Painting & Sculpture", "绘画与雕塑"],
    ["Photography", "摄影"],
    ["Music", "音乐"],
    ["Art History & Criticism", "艺术史与评论"],
    ["Pop Culture", "流行文化"],
    ["Film", "电影"],
    ["Media & Performing Arts", "媒体与表演艺术"],
    ["Fashion", "时尚"]
  ]
}, {
  "first_level": ["Travel", "旅行"],
  "second_level": [
    ["Food, Lodging & Transportation", "饮食，住宿与交通"],
    ["Europe", "欧洲"],
    ["Russia", "俄罗斯"],
    ["Japan", "日本"],
    ["Asia", "亚洲"],
    ["Middle East", "中东"],
    ["Southeast Asia", "东南亚"],
    ["North America", "北美"],
    ["Central & South America", "中美洲与南美洲"],
    ["Africa", "非洲"],
    ["Australia & South Pacific", "澳洲与南太平洋"],
    ["Polar Regions", "两极地区"],
    ["Adventure Travel", "探险"],
    ["Travel Writing", "游记"]
  ]
}, {
  "first_level": ["Sports & Outdoors", "运动与户外"],
  "second_level": [
    ["Ball Games", "球类运动"],
    ["Athletics", "田径"],
    ["Water Sports", "水上运动"],
    ["Winter Sports", "冬季运动"],
    ["Training", "训练"],
    ["Outdoor Sports", "户外运动"],
    ["Extreme Sports", "极限运动"],
    ["Other Sports", "其他运动"]
  ]
}]
module.exports.chinese_level = chinese_level;
module.exports.foreign_level = foreign_level;
