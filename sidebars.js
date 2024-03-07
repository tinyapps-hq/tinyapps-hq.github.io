/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{ type: "autogenerated", dirName: "." }],
  twoupSidebar: [{type: "autogenerated", dirName: "two-up"}]
  // twoupSidebar: [
  //   {
  //     type: "doc",
  //     id: "two-up/index"
  //   },
  //   {
  //     type: "category",
  //     label: "Host",
  //     items: [{ type: "doc", id: "two-up/host/create-a-tournament" }],
  //   },
  // ],
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

module.exports = sidebars;
