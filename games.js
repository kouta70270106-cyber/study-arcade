// ─────────────────────────────────────────────
// ゲームの一覧表（ここだけ書き足せばゲームが増える）
//
//   slug  : フォルダ名＝URL（/slug/ で開く）
//   title : カードに出す名前
//   desc  : ひとこと説明
//   tags  : 修行で身につけた技
//   icon  : アイコン画像（icons/ に置く。4:3 の横長がきれいに見える）
//   emoji : 画像が読めなかったときの代わり
//   color : カードのテーマ色
// ─────────────────────────────────────────────
const GAMES = [
  {
    slug: "janken_battle",
    title: "じゃんけんバトル",
    desc: "コンピューターとじゃんけん勝負。",
    tags: ["単体テスト", "E2Eテスト"],
    icon: "icons/janken_battle.jpg",
    emoji: "✊",
    color: "#e0644f",
  },
  {
    slug: "number_guess",
    title: "数あてゲーム",
    desc: "1〜100の数を、ヒントを頼りに当てよう。",
    tags: ["状態管理", "画面と処理の分離"],
    icon: "icons/number_guess.jpg",
    emoji: "🔢",
    color: "#2f9e8f",
  },
];

// ── ここから下は画面を組み立てる処理（ゲームを足すだけなら触らなくてよい） ──

function createCard(game, index) {
  const li = document.createElement("li");
  li.className = "notice";
  li.style.setProperty("--tone", game.color);
  li.style.setProperty("--tilt", index % 2 === 0 ? "-1.2deg" : "1deg");

  const link = document.createElement("a");
  link.className = "notice-link";
  link.href = `/${game.slug}/`;
  link.dataset.testid = `link-${game.slug}`;

  const cover = document.createElement("div");
  cover.className = "cover";
  const img = document.createElement("img");
  img.src = game.icon;
  img.alt = `${game.title}のアイコン`;
  img.width = 320;
  img.height = 240;
  // 画像がない・読めないときは絵文字に切り替える
  img.addEventListener("error", () => {
    cover.textContent = game.emoji;
    cover.classList.add("is-fallback");
  });
  cover.append(img);

  const body = document.createElement("div");
  body.className = "notice-body";

  const title = document.createElement("p");
  title.className = "notice-title";
  title.textContent = game.title;

  const desc = document.createElement("p");
  desc.className = "notice-desc";
  desc.textContent = game.desc;

  const tags = document.createElement("ul");
  tags.className = "tags";
  for (const tag of game.tags) {
    const tagItem = document.createElement("li");
    tagItem.textContent = tag;
    tags.append(tagItem);
  }

  const play = document.createElement("span");
  play.className = "play";
  play.textContent = "あそぶ ▶";

  body.append(title, desc, tags, play);
  link.append(cover, body);
  li.append(link);
  return li;
}

function createNextSlot() {
  const li = document.createElement("li");
  li.className = "next";
  li.innerHTML = "<p><span>次の授業</span>？？？</p>";
  return li;
}

function renderStats() {
  // 技の数は、全ゲームのタグを重複なしで数える
  const skillCount = new Set(GAMES.flatMap((game) => game.tags)).size;
  document.querySelector("[data-stat='games']").textContent = GAMES.length;
  document.querySelector("[data-stat='skills']").textContent = skillCount;
}

function renderDate() {
  const today = new Date();
  const week = ["日", "月", "火", "水", "木", "金", "土"][today.getDay()];
  // 数字は縦書きで横に寝ないよう、縦中横（.tcy）の印を付ける
  const number = (value) => {
    const span = document.createElement("span");
    span.className = "tcy";
    span.textContent = value;
    return span;
  };
  document.querySelector("[data-date]").replaceChildren(
    number(today.getMonth() + 1), "月",
    number(today.getDate()), `日（${week}）`,
  );
}

function render() {
  const list = document.querySelector(".board-list");
  GAMES.forEach((game, index) => list.append(createCard(game, index)));
  list.append(createNextSlot());
  renderStats();
  renderDate();
}

render();
