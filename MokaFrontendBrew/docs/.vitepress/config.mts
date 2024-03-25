import { defineConfig, type DefaultTheme } from "vitepress";
import pkg from "../../package.json";
import dotenv from "dotenv";
import yaml from "js-yaml";
import { promises as fs } from "fs";
import path from "path";
// TODO: Add capitalizeFirstLetter function to utils and use it here in title
// Load environment variables
const envConfig = dotenv.config({
  path: path.resolve(__dirname, `../envs/.env.${process.env.NODE_ENV}`),
});
const sidebarConfigPath = path.resolve(__dirname, "sidebar.yaml");
const sidebarYaml = await fs.readFile(sidebarConfigPath, "utf-8");
const sidebarConfig = yaml.load(sidebarYaml);

export default defineConfig({
  title: `${pkg.name} - ${process.env.NODE_ENV === "production" ? "" : process.env.NODE_ENV}`,
  description: pkg.description,
  titleTemplate: ":title",
  base: process.env.VITEPRESS_BASE_URL || "/",
  lang: "en-US",
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  themeConfig: {
    nav: navigation(),

    sidebar: sidebarConfig,

    socialLinks: [{ icon: "github", link: "https://github.com/" }],
  },
});

function navigation(): DefaultTheme.NavItem[] {
  return [
    { text: "Home", link: "/" },
    { text: "Guide", link: "/guide/" },
    { text: "API", link: "/api/" },
    { text: "Development", link: "/development/" },
    {
      text: pkg.version,

      items: [
        {
          text: "Changelog",
          link: "https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md",
        },
        {
          text: "Contributing",
          link: "https://github.com/vuejs/vitepress/blob/main/.github/contributing.md",
        },
      ],
    },
  ];
}
