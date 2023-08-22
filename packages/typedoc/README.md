# Building NX Workspace Documentation with a TypeDoc Plugin

## Introduction

Welcome to the README of the TypeDoc plugin for generating comprehensive NX workspace documentation. This plugin, developed by Timo Santi, addresses the challenge of creating documentation for entire NX workspace that consist of multiple projects and libraries. The plugin offers a solution to generate documentation for each library and merge them into a publishable documentation.

## Vision and Challenge

As a developer working in NX workspace, I faced the challenge of generating documentation for an entire workspace, which includes multiple projects and libraries. Although tools for generating documentation at the library level existed [@enio.ai/typedoc](https://github.com/enio-ireland/enio/tree/develop/packages/typedoc#readme), a unified solution for workspace-wide documentation was missing. This plugin was conceived with a vision—to create a streamlined approach for generating documentation that encompasses the entire workspace utilizing tools provided by [NX](https://nx.dev).

## Key Features

- **Initialization and Defaults**: The plugin includes initialization workspace with shared typedoc.base.json and typedoc.json. It also
  adds cache inputs to `nx.json` --configuration.

- **Library-Specific Configuration**: Each library within the workspace is equipped with a tailored configuration that defines how documentation should be generated. This customization ensures flexibility.

- **Individual JSON Documentation Generation**: JSON-format documentation is generated for each library individually, making the process efficient and resource-friendly.

- **Workspace-Wide Documentation Merge**: The plugin's core feature involves merging individual JSON documentation files into a comprehensive workspace-wide documentation.

## Usage

To use this TypeDoc plugin in your workspace, follow these steps:

1. Install the plugin using npm:
   ```bash
   npm install --save-dev @santicon/nx-typedoc-extension
   ```
