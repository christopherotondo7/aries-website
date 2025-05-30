// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "src/assets/images",
      publicFolder: "public"
    }
  },
  // See docs on content modeling for more info on how to setup new content models.
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "src/content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "object",
            name: "hero",
            label: "Hero Section",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Hero Title"
              },
              {
                type: "string",
                name: "subtitle",
                label: "Hero Subtitle",
                ui: {
                  component: "textarea"
                }
              },
              {
                type: "object",
                name: "buttons",
                label: "Buttons",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "text",
                    label: "Button Text"
                  },
                  {
                    type: "string",
                    name: "href",
                    label: "Link"
                  },
                  {
                    type: "string",
                    name: "style",
                    label: "Style",
                    options: ["primary", "secondary"]
                  }
                ]
              }
            ]
          },
          {
            type: "object",
            name: "blocks",
            label: "Content Blocks",
            list: true,
            templates: [
              {
                name: "textBlock",
                label: "Text Content",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title"
                  },
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Content"
                  },
                  {
                    type: "string",
                    name: "background",
                    label: "Background",
                    options: ["white", "gray", "blue"]
                  }
                ]
              },
              {
                name: "statsBlock",
                label: "Statistics",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title"
                  },
                  {
                    type: "string",
                    name: "subtitle",
                    label: "Subtitle"
                  },
                  {
                    type: "object",
                    name: "stats",
                    label: "Statistics",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "number",
                        label: "Number"
                      },
                      {
                        type: "string",
                        name: "label",
                        label: "Label"
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description"
                      }
                    ]
                  }
                ]
              },
              {
                name: "featureGrid",
                label: "Feature Grid",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title"
                  },
                  {
                    type: "string",
                    name: "subtitle",
                    label: "Subtitle"
                  },
                  {
                    type: "string",
                    name: "columns",
                    label: "Columns",
                    options: ["2", "3", "4"]
                  },
                  {
                    type: "object",
                    name: "features",
                    label: "Features",
                    list: true,
                    fields: [
                      {
                        type: "string",
                        name: "title",
                        label: "Feature Title"
                      },
                      {
                        type: "string",
                        name: "description",
                        label: "Description",
                        ui: {
                          component: "textarea"
                        }
                      },
                      {
                        type: "string",
                        name: "icon",
                        label: "Icon (optional)"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
