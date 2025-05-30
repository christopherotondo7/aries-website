// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "data_post",
        label: "Posts (Data)",
        path: "src/content/post",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "datetime", name: "date", label: "Date", required: false },
          { type: "string", name: "description", label: "Description", required: false },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      },
      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description" },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              { type: "string", name: "title", label: "Hero Title" },
              { type: "string", name: "subtitle", label: "Hero Subtitle" },
              { type: "image", name: "image", label: "Hero Image" },
              { type: "string", name: "video", label: "Background Video URL (MP4)" },
              { type: "image", name: "videoPoster", label: "Video Poster Image" }
            ]
          },
          {
            type: "object",
            name: "sections",
            label: "Content Sections",
            list: true,
            templates: [
              {
                name: "intro",
                label: "Introduction",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "rich-text", name: "content", label: "Content" }
                ]
              },
              {
                name: "stats",
                label: "Statistics",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  {
                    type: "object",
                    name: "stats",
                    label: "Stats",
                    list: true,
                    fields: [
                      { type: "string", name: "label", label: "Label" },
                      { type: "string", name: "value", label: "Value" }
                    ]
                  }
                ]
              },
              {
                name: "values",
                label: "Values",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  {
                    type: "object",
                    name: "items",
                    label: "Value Items",
                    list: true,
                    fields: [
                      { type: "string", name: "title", label: "Title" },
                      { type: "string", name: "description", label: "Description" },
                      { type: "string", name: "icon", label: "Icon" }
                    ]
                  }
                ]
              },
              {
                name: "image_text",
                label: "Image + Text Block",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "subtitle", label: "Subtitle" },
                  { type: "rich-text", name: "content", label: "Content" },
                  { type: "string", name: "highlight", label: "Text to Highlight" },
                  {
                    type: "object",
                    name: "image",
                    label: "Image",
                    fields: [
                      { type: "image", name: "src", label: "Image" },
                      { type: "string", name: "alt", label: "Alt Text" }
                    ]
                  },
                  {
                    type: "object",
                    name: "button",
                    label: "Button",
                    fields: [
                      { type: "string", name: "text", label: "Button Text" },
                      { type: "string", name: "href", label: "Button Link" },
                      { type: "string", name: "style", label: "Button Style", options: ["primary", "secondary", "outline"] }
                    ]
                  }
                ]
              },
              {
                name: "cta",
                label: "Call-to-Action Section",
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "rich-text", name: "content", label: "Content" },
                  {
                    type: "object",
                    name: "button",
                    label: "Button",
                    fields: [
                      { type: "string", name: "text", label: "Button Text" },
                      { type: "string", name: "href", label: "Button Link" },
                      { type: "string", name: "style", label: "Button Style", options: ["primary", "secondary", "outline"] }
                    ]
                  }
                ]
              }
            ]
          },
          { type: "string", name: "mission", label: "Mission Statement" },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      },
      {
        name: "site_content",
        label: "Site Content",
        path: "src/content",
        format: "md",
        match: { include: "*.md", exclude: "pages/**" },
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "string", name: "description", label: "Description" },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      },
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",
        format: "mdx",
        fields: [
          { type: "string", name: "title", label: "Title", isTitle: true, required: true },
          { type: "rich-text", name: "body", label: "Body", isBody: true }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
