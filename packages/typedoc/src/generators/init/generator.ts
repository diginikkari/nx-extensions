/*
 *   Copyright (c) 2023 Timo Santi
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

import {
  addDependenciesToPackageJson,
  formatFiles,
  generateFiles,
  readJson,
  Tree,
  updateJson,
} from '@nx/devkit';
import {
  addCacheableOperation,
  addTargetDefaults,
} from './addCacheableOperation';
import { InitGeneratorSchema } from './schema';
import path = require('path');

export async function initGenerator(tree: Tree, options: InitGeneratorSchema) {
  addPackageScript(tree);
  const packageJson = readJson(tree, 'package.json');
  const devDependencies = {};
  const dependencies = {};
  packageJson.dependencies = packageJson.dependencies || {};
  packageJson.devDependencices = packageJson.devDependencices || {};
  if (!packageJson.devDependencies['typedoc']) {
    devDependencies['typedoc'] = '^0.24.8';
  }
  if (!packageJson.devDependencies['typedoc-plugin-markdown']) {
    devDependencies['typedoc-plugin-markdown'] = '^3.15.4';
  }
  if (!packageJson.devDependencies['typedoc-github-wiki-theme']) {
    devDependencies['typedoc-github-wiki-theme'] = '^1.1.0';
  }
  if (!packageJson.devDependencies['typedoc-plugin-rename-defaults']) {
    devDependencies['typedoc-plugin-rename-defaults'] = '^0.6.5';
  }
  if (!packageJson.devDependencies['typedoc-plugin-zod']) {
    devDependencies['typedoc-plugin-zod'] = '^1.0.2';
  }
  if (!packageJson.devDependencies['typedoc-theme-hierarchy']) {
    devDependencies['typedoc-theme-hierarchy'] = '^4.1.0';
  }
  addDependenciesToPackageJson(tree, dependencies, devDependencies);
  addTargetDefaults(tree);
  addCacheableOperation(tree);
  generateFiles(tree, path.join(__dirname, 'files'), '/', {});
  await formatFiles(tree);
}

export default initGenerator;

function addPackageScript(tree) {
  const packageJson = readJson(tree, 'package.json');
  packageJson.scripts = packageJson.scripts || {};
  if (!packageJson.scripts.docs) {
    packageJson.scripts.docs =
      'nx run-many --all --targets=typedoc && nx exec -- typedoc';
  }
  updateJson(tree, 'package.json', () => packageJson);
}
