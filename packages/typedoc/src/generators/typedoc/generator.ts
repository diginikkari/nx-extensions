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
  formatFiles,
  generateFiles,
  getProjects,
  logger,
  offsetFromRoot,
  readProjectConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit';
import * as path from 'path';
import { TypedocGeneratorSchema } from './schema';

export async function typedocGenerator(
  tree: Tree,
  options: TypedocGeneratorSchema
) {
  const { projectRoot, projectName } = await normalizeOptions(tree, options);
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    projectRoot,
    projectName,
    offsetFromRoot: offsetFromRoot(projectRoot),
  });
  const config = readProjectConfiguration(tree, projectName);
  config.targets['typedoc'] = {
    executor: 'nx:run-commands',
    options: {
      command: 'typedoc --options {projectRoot}',
    },
    outputs: ['{workspaceRoot}/dist/docs/{projectRoot}'],
  };
  updateProjectConfiguration(tree, projectName, config);
  await formatFiles(tree);
}

export default typedocGenerator;

async function normalizeOptions(
  host: Tree,
  options: TypedocGeneratorSchema
): Promise<{
  projectRoot: string;
  projectName: string;
}> {
  const project = getProjects(host).get(options.project);

  if (!project) {
    logger.error(
      `Cannot find the ${options.project} project. Please double check the project name.`
    );
    throw new Error();
  }

  const { root: projectRoot } = project;

  return {
    projectRoot,
    projectName: project.name,
  };
}
