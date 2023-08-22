/*
 *   Copyright (c) 2023 Rajulive Oy
 *   All rights reserved.
 */
import { readNxJson, Tree, updateNxJson } from '@nx/devkit';

export function addCacheableOperation(tree: Tree) {
  const nxJson = readNxJson(tree);

  nxJson.tasksRunnerOptions.default.options =
    nxJson.tasksRunnerOptions.default.options || {};

  nxJson.tasksRunnerOptions.default.options.cacheableOperations =
    nxJson.tasksRunnerOptions.default.options.cacheableOperations || [];
  if (
    !nxJson.tasksRunnerOptions.default.options.cacheableOperations?.includes(
      'typedoc'
    )
  ) {
    nxJson.tasksRunnerOptions.default.options.cacheableOperations.push(
      'typedoc'
    );
  }

  updateNxJson(tree, nxJson);
}

export function addTargetDefaults(tree: Tree) {
  const nxJson = readNxJson(tree);

  nxJson.targetDefaults = nxJson.targetDefaults || {};
  if (!nxJson.targetDefaults.typedoc) {
    nxJson.targetDefaults.typedoc = {
      inputs: ['default', '{workspaceRoot}/typedoc.base.json'],
    };
  }
  if (!nxJson.targetDefaults.docs) {
    nxJson.targetDefaults.docs = {
      inputs: ['{workspaceRoot}/typedoc.json'],
      outputs: ['{workspaceRoot}/docs'],
    };
  }

  updateNxJson(tree, nxJson);
}
