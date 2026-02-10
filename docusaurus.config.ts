import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "TryggFörsäkring Requirements",
  tagline: "Insurance Platform Business Requirements",
  favicon: "img/favicon.ico",

  future: {
    v4: true,
  },

  url: "https://agentic-software-factory.github.io",
  baseUrl: "/insurance-platform-requirements/",

  organizationName: "Agentic-software-factory",
  projectName: "insurance-platform-requirements",

  onBrokenLinks: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      {
        hashed: true,
        language: ["en"],
        indexDocs: true,
        indexBlog: false,
        docsRouteBasePath: "/docs",
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/Agentic-software-factory/insurance-platform-requirements/edit/main/",
          lastVersion: "phase-1",
          includeCurrentVersion: true,
          versions: {
            current: {
              label: "Phase 2 — Home & Property (Draft)",
              path: "next",
              banner: "unreleased",
              badge: true,
            },
            "phase-1": {
              label: "Phase 1 — Motor Insurance",
              path: "",
              banner: "none",
              badge: true,
            },
          },
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      style: "dark",
      title: "TryggFörsäkring",
      items: [
        {
          type: "docSidebar",
          sidebarId: "requirementsSidebar",
          position: "left",
          label: "Requirements",
        },
        {
          type: "docsVersionDropdown",
          position: "left",
        },
        {
          href: "https://github.com/Agentic-software-factory/insurance-platform-requirements",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Documentation",
          items: [
            {
              label: "Requirements",
              to: "/docs/intro",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} TryggFörsäkring AB. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
