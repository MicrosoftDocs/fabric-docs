---
title: Author and share Fabric Apps templates
description: Learn how to author a Fabric Apps template, combine templates into a catalog, and distribute them to your team with the Rayfin CLI.
ms.reviewer: mksuni
ms.topic: how-to
ms.date: 08/25/2026
ai-usage: ai-assisted
---

# Author and share Fabric Apps templates

A template is a starting point that the Rayfin CLI scaffolds into a new Fabric app. When you run `npm create @microsoft/rayfin@latest` or `npx rayfin init`, the CLI copies the template's files into your project and applies a few scaffold transforms. By authoring your own template, you can capture a preferred stack, data model, or set of conventions once and reuse it across your team.

This article shows you how to:

- Author a single template.
- Combine multiple templates into a catalog.
- Distribute templates through a Git repository or a template registry.

## Prerequisites

- Node.js and npm installed.
- Git installed. The CLI uses Git to fetch most remote templates.
- The Rayfin CLI. For installation, see [Rayfin CLI reference](cli-reference.md).
- A working Fabric app to use as the basis for your template. To create one, see [Create and deploy your first Fabric app with the CLI](create-app-with-cli.md).

## How templates work

Custom templates in a local directory or Git repository use a `rayfin-template.yml` manifest. Built-in templates that ship with the CLI use template metadata in `package.json`. A template registry provides names that resolve to Git-backed templates.

When the CLI scaffolds a template, it copies the template files into the target directory, then applies a small, fixed set of transforms:

- Rewrites the `name` field in `package.json` to the new project's slug. If `package.json` isn't valid JSON, the CLI leaves it unchanged.
- Replaces the `{{PROJECT_NAME}}`, `{{PROJECT_NAME_KEBAB}}`, and `{{PROJECT_NAME_PASCAL}}` placeholders in `README.md`.
- Replaces the `__projectName__` placeholder in filenames with the project name.
- Skips `rayfin-template.yml`, `.git`, `node_modules`, `.DS_Store`, and `Thumbs.db`, and doesn't follow symlinks.

All other file contents are copied as-is. After scaffolding, the CLI:

- Installs project dependencies, including dependencies under `rayfin/functions/` when that directory is present.
- Synchronizes the generated Rayfin configuration, including `rayfin.yml` and supporting scaffold files.
- Installs managed agent files, including the `mcpServers.rayfin` key in `.mcp.json` and the `.agents/skills/rayfin/` directory.
- Records managed files in `rayfin/.lockfile.json`.

If your template provides an `AGENTS.md` file, the CLI preserves it and doesn't overwrite it. Don't include an `mcpServers.rayfin` entry in the template's `.mcp.json` file because the CLI owns and manages that entry.

The project name comes from the directory argument you pass when you scaffold. For example, `npm create @microsoft/rayfin@latest my-app` produces a project named `my-app`. To use a different name, pass `--project-name`.

## Create a template

A template is a directory that contains a `rayfin-template.yml` manifest and the files you want to scaffold.

### Step 1: Start from a working app

Begin with a Fabric app that runs and deploys correctly. Remove anything specific to your own workspace or environment so consumers start from a clean state. The CLI can populate values such as the workspace ID and API URL when the consumer initializes or deploys the project, so don't hard-code them.

### Step 2: Add a manifest

Add a `rayfin-template.yml` file that points to the template files. For a single template whose files live in the same directory as the manifest, use one entry with `path: .`:

```yaml
apiVersion: v1
metadata:
  name: my-starter
  displayName: My Starter
  description: A starter template for Fabric Apps
entries:
  - name: my-starter
    path: .
```

A single-entry manifest scaffolds automatically without prompting the user to choose a template.

### Step 3: Add placeholders

Use placeholders so each scaffolded project gets its own name:

- In `README.md`, use `{{PROJECT_NAME}}`, `{{PROJECT_NAME_KEBAB}}`, or `{{PROJECT_NAME_PASCAL}}`.
- In a filename, use `__projectName__`. For example, `src/__projectName__.config.ts` becomes `src/my-app.config.ts` when a consumer scaffolds into `my-app`.

### Step 4: Test the template locally

Scaffold from the local directory to confirm the output before you publish:

```bash
npx rayfin init test-output -t ./my-template --yes
```

Inspect the `test-output` directory, and verify that the scaffolded project builds and runs.

> [!TIP]
> A bare value passed to `-t` resolves as a template name, not a path. Use `./`, `../`, or an absolute path when you point at a local directory.

## Create a catalog of templates

To publish more than one template from a single source, create a root catalog manifest and list each template in its `entries` array. Each entry must point to a directory that contains its own `rayfin-template.yml` manifest.

For example, use the following structure:

```text
my-collection/
|-- rayfin-template.yml
`-- templates/
    |-- api-service/
    |   |-- rayfin-template.yml
    |   `-- package.json
    `-- fullstack/
        |-- rayfin-template.yml
        `-- package.json
```

In the root `rayfin-template.yml`, point each entry at its template directory:

```yaml
apiVersion: v1
metadata:
  name: my-collection
  displayName: My Collection
  description: A collection of Fabric Apps templates
entries:
  - name: api-service
    path: ./templates/api-service
    description: REST API with a Rayfin data layer
  - name: fullstack
    path: ./templates/fullstack
    description: Full-stack app with authentication and data
```

In each template directory, add a single-entry manifest that points to the files in that directory. For example, `templates/api-service/rayfin-template.yml` contains:

```yaml
apiVersion: v1
metadata:
  name: api-service
  displayName: API Service
entries:
  - name: api-service
    path: .
```

When a consumer scaffolds from a multi-entry source, the CLI shows an interactive picker. For non-interactive flows, the consumer passes `--template-name` with the entry's `name` or `path`:

```bash
npx rayfin init my-app -t https://github.com/example-org/templates.git --template-name api-service --yes
```

### Group templates for nested navigation

For larger collections, use `group` entries to organize templates into a hierarchy. Both local and Git-backed template sources support grouped navigation. The picker walks consumers through each level.

```yaml
entries:
  - group:
      name: starters
      displayName: Starter apps
      entries:
        - name: hello-world
          path: ./starters/hello-world
        - name: todo-app
          path: ./starters/todo-app
  - name: standalone-app
    path: ./standalone-app
```

> [!NOTE]
> The [Awesome Rayfin gallery](https://github.com/microsoft/awesome-rayfin) is a public, flat catalog of Fabric Apps templates. Use it as a working example of a catalog, or scaffold from it and select a template interactively:
>
> ```bash
> npm create @microsoft/rayfin@latest my-app -- --template https://github.com/microsoft/awesome-rayfin
> ```

## Distribute templates

After your template works locally, share it so others can scaffold from it.

### Share a Git repository

Publish the template as a Git repository, then give consumers the URL.

1. Initialize and push the repository.

   ```bash
   git init
   git add .
   git commit -m "Initial template"
   git remote add origin https://github.com/example-org/my-template.git
   git push -u origin main
   ```

1. Tag a release so scaffolds are reproducible.

   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

1. Share the URL. Consumers pin to the tag by appending `#<ref>`.

   ```bash
   npx rayfin init my-app -t https://github.com/example-org/my-template.git#v1.0.0
   ```

The CLI supports HTTPS, SSH, `git@host:org/repo.git`, and `file://` URLs. It performs a shallow clone into a temporary directory, scaffolds the project, and then deletes the clone. For a ref, use a branch name, a tag name, or a full 40-character commit SHA. The CLI rejects abbreviated SHAs.

For private repositories, the CLI uses your existing Git credentials and disables interactive prompts, so a missing credential fails immediately instead of hanging. For GitHub repositories, run `gh auth setup-git` to wire credentials through Git Credential Manager.

### Register a template

Register a template so it appears in `npx rayfin init --list-templates` and the interactive picker without consumers having to remember the URL. Add an entry to a `template-registries.yml` file at one of these locations:

| Tier | Path | When to use |
| --- | --- | --- |
| Bundled | Included with the Rayfin CLI | First-party templates maintained with the CLI. This tier is read-only for consumers. |
| User-global | `~/.rayfin/template-registries.yml` | Templates you use across many projects on this machine. |
| Project-local | `<projectDir>/.rayfin/template-registries.yml` | Templates pinned to a specific project. Commit the file alongside the repo. |

Registry names must be unique across tiers. The CLI protects bundled entries marked as `default` or `firstClass` from overrides. It skips other duplicate names and reports a warning in `--list-templates` output.

A registry entry names the repository and, optionally, the ref to pin:

```yaml
registries:
  - name: my-starter
    displayName: My Starter
    description: Our team's Fabric Apps starter
    url: https://github.com/example-org/my-template.git
    ref: "v1.0.0"
```

After you register the template, consumers scaffold by name:

```bash
npx rayfin init my-app -t my-starter
```

When you ship a new tag, update the `ref` and commit the change so everyone on the team picks it up.

Registry entries support the following fields:

| Field | Required | Description |
| --- | --- | --- |
| `name` | Yes | Unique identifier for the entry. |
| `url` | Yes | Git URL of the template repository. |
| `displayName` | No | Human-readable label. Defaults to `name`. |
| `description` | No | Short description shown in pickers and `--list-templates`. |
| `ref` | No | Git tag, branch, or full commit SHA to pin to. Defaults to the default branch. Quote values that YAML might parse as numbers, such as `"1.0"`. |
| `path` | No | Subdirectory in the repository where the manifest lives. |
| `templateName` | No | For a multi-template repository, the entry to preselect so consumers skip the picker. |

## Contribute to the community gallery

If you build a template that others might find useful, consider contributing it to the [Awesome Rayfin gallery](https://github.com/microsoft/awesome-rayfin), the community-curated collection of Fabric Apps templates. For required files, metadata conventions, and how to submit a pull request, see the gallery's [contributing guide](https://github.com/microsoft/awesome-rayfin/blob/main/CONTRIBUTING.md).

## Manifest reference

A `rayfin-template.yml` manifest has the following shape:

```yaml
apiVersion: v1            # Required. Must be 'v1'.
metadata:
  name: my-collection     # Required. Identifier for the manifest.
  displayName: My Collection
  description: Optional description.
  version: 1.2.0          # Accepted, currently informational only.
  tags: [todo, auth]      # Accepted, currently informational only.
entries:                  # Required. At least one entry.
  - name: api-service     # Template entry. Scaffolds files from path.
    path: ./api-service
    description: REST API with a Rayfin data layer.
```

The `metadata.displayName` and `metadata.description` values appear when a consumer scaffolds from the template. The schema accepts the `metadata.version` and `metadata.tags` fields but the CLI doesn't surface them today. Group descriptions appear in the multi-template picker, but leaf entry descriptions aren't currently displayed.

## Related content

- [Rayfin CLI reference](cli-reference.md)
- [Create and deploy your first Fabric app with the CLI](create-app-with-cli.md)
- [Understand the project structure](project-structure.md)
