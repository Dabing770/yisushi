# Yi Sushi 网站

Yi Sushi（芬兰 Loimaa 的寿司与中餐餐厅）的官方网站，线上地址：<https://www.yisushi.fi>

纯静态站点：HTML + CSS + 原生 JavaScript，无构建步骤、无依赖，可直接部署到任何静态托管（`CNAME` 指向 `www.yisushi.fi`）。

## 功能

- **双语**：芬兰语（默认）/ 英语，右上角切换，选择保存在 `localStorage`
- **菜单页**：按分类展示菜品，支持搜索；菜名与描述带英文翻译
- **营业状态**：根据赫尔辛基时间实时显示“营业中 / 已打烊”，每分钟刷新
- **统一的营业时间与午餐价格**：首页、营业时间页、联系页、菜单页共用一份数据
- 开场动画、页面切换过渡、互动背景
- SEO：`sitemap.xml`、`robots.txt`、Open Graph 图片与 favicon

## 目录结构

```
index.html          首页
menu.html           菜单
hours.html          营业时间
location.html       位置
reservation.html    订座
contact.html        联系方式
about.html          关于我们
styles.css          全站样式
assets/
  js/main.js        主逻辑：翻译、菜单渲染、营业状态、动画
  js/menu-data.js   菜单数据（window.menuData）
  js/site-info.js   营业时间、节假日例外、午餐价格（window.siteInfo）
  img/              logo、图标、og-image
new_menu            菜单原始文本（芬兰语）
CNAME, robots.txt, sitemap.xml, favicon.ico
```

## 本地预览

在项目根目录运行任意静态服务器，例如：

```bash
python -m http.server 8765 --bind 127.0.0.1
```

然后打开 <http://127.0.0.1:8765>。（`.claude/launch.json` 中的 `yisushi-static` 配置使用同一命令。）

## 常见修改

### 营业时间 / 午餐价格

只需编辑 [assets/js/site-info.js](assets/js/site-info.js)：

- `hours`：常规营业时间与午餐时段（`days` 中 0 = 周日 … 6 = 周六）
- `exceptions`：节假日等特殊安排，按日期覆盖，例如
  ```js
  exceptions: {
      '2026-12-24': { closed: true },
      '2026-12-31': { open: '11:30', close: '16:00' }
  }
  ```
- `lunchPrices`：午餐价格（数字，单位欧元）

所有页面会自动更新。

### 菜单

菜单数据在 [assets/js/menu-data.js](assets/js/menu-data.js)，结构为：

```js
window.menuData = {
    categories: [
        { name: '分类名', items: [ { name, description, price: '13,80 €' } ] }
    ]
};
```

`new_menu` 是对应的菜单原始文本，修改菜单时请同步更新 `menu-data.js`。新增菜名或分类如需英文翻译，在 [assets/js/main.js](assets/js/main.js) 的 `menuCategoryTranslations`、`menuNameTranslations`、`menuTextReplacements` 中补充。

### 界面文字翻译

[assets/js/main.js](assets/js/main.js) 中的 `translations` 对象包含 `fi` 与 `en` 两套文案；HTML 元素通过 `data-translate="key"`（占位符用 `data-translate-placeholder`）引用。

### 缓存

修改 `styles.css` 后，可调整 HTML 中的版本号（如 `styles.css?v=4`）以避免浏览器缓存旧样式。

## 联系信息

- 地址：Vesikoskenkatu 11, 32200 Loimaa
- 电话：044 981 9446
