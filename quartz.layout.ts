import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
beforeBody: [
    // 1. パンくずリスト（ホーム以外で表示）
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index" && page.fileData.slug !== "",
    }),
    // 2. 記事タイトル
    Component.ArticleTitle(),
    // 3. メタ情報（日付）。ホーム以外、かつ読了時間は常にオフ
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug !== "index" && page.fileData.slug !== "",
      component: Component.ContentMeta({
        showReadingTime: false,
      }),
    }),
    // 4. タグリスト
    Component.TagList(),
  ],
  afterBody: [
    Component.ConditionalRender({
      condition: (page) => page.fileData.slug === "index",
      component: Component.RecentNotes({
        title: "最近の記事",
        limit: 5,
        filter: (f) => f.slug !== "index" && f.frontmatter?.draft !== true,
        linkToMore: "tags/",
      }),
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
  ],
  right: [], 
}

// components for pages that display lists of pages
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.TagList(),
  ],
  right: [],
}