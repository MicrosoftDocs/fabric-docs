---
title: Manage libraries with limited network access in Fabric
description: Learn how to add and manage libraries in Fabric when outbound network access is restricted.
ms.reviewer: shuaijunye
ms.topic: how-to
ms.date: 10/21/2026
ms.search.form: Manage libraries when private links and OAP enabled.
---

<!-- markdownlint-configure-file {"MD025": {"front_matter_title": ""}} -->

# Manage libraries with limited network access in Fabric

Normally, when you add Python libraries to an environment in the Fabric portal, the underlying Spark compute resolves and downloads the package and its dependencies from PyPI. However, when an admin enables [outbound access protection](/fabric/security/security-managed-vnets-fabric-overview) for a workspace, the Spark compute is blocked from making outbound internet connections. Any attempt to install a package through the portal fails because the compute can't reach PyPI or conda.

> [!NOTE]
> Installing libraries through JFrog Artifactory or Azure Artifact Feed connections isn't
> supported in workspaces with outbound access protection (OAP) enabled. For connection
> requirements and limitations, see
> [Add libraries from JFrog Artifactory](environment-manage-library.md#add-libraries-from-jfrog-artifactory)
> and [Add libraries from an Azure Artifact Feed](environment-manage-library.md#add-libraries-from-an-azure-artifact-feed).
> Use one of the following approaches instead.

To install Python libraries when outbound access protection is enabled, you need to get the packages into Fabric through a path that doesn't require outbound internet access from the Spark compute. This article covers two approaches:

- **[Upload custom libraries](#upload-custom-library-files-recommended)** (recommended) — Download the specific wheel files you need on a separate machine and upload them directly to your Fabric environment. Best when you need a small number of packages and want minimal infrastructure overhead.
- **[Host a PyPI mirror](#host-a-pypi-mirror-on-azure-storage)** — Set up a full or partial replica of PyPI on an Azure Storage account behind your organization's vNet. Best for organizations that rely on many PyPI packages and want `pip install` to work seamlessly without managing individual wheel files. This approach requires more setup and ongoing maintenance.

## Upload custom library files (recommended)

When outbound access protection is enabled, Fabric can't reach PyPI to install packages directly. This approach lets you download the specific packages you need - along with their dependencies - on a separate machine that has internet access, and then upload those wheel files to your Fabric environment as custom libraries.

You build a local Python environment that matches the Fabric runtime so that `pip` resolves the correct dependency versions. Then you use `pip download` to fetch only the additional packages your workload requires (not the packages already included in the runtime).

### Prerequisites

Before you begin, ensure you have the following items:

- **A Linux machine with internet access** — You need a Linux environment to build a local Python environment and download wheel files. Fabric's Spark compute runs on Linux ([Azure Linux/Mariner](runtime.md)), so you must use Linux to ensure conda resolves the correct platform-specific packages and `pip download` fetches compatible wheels. You can use any of the following options:
  - [Windows Subsystem for Linux (WSL)](/windows/wsl/install) on your Windows PC
  - A Linux PC or laptop
  - An [Azure Linux VM](/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu)

- **The Fabric runtime YML file** — Download the Python YML file for your runtime version from the [Fabric runtime GitHub repo](https://github.com/microsoft/synapse-spark-runtime/tree/main/Fabric):
  - Runtime 1.2 (Spark 3.4): `Fabric-Python310-CPU.yml` (Python 3.10)
  - Runtime 1.3 (Spark 3.5): `Fabric-Python311-CPU.yml` (Python 3.11)
  - Runtime 2.0 (Spark 4.1): `Fabric-Python313-CPU.yml` (Python 3.13)

:::image type="content" source="media\environment-library-management\outbound-access-protection-runtime-setup.png" alt-text="Screenshot that shows the example of runtime setup file." lightbox="media\environment-library-management\outbound-access-protection-runtime-setup.png":::

### Step 1: Create a requirements file

Create a `requirements.txt` file that lists the extra packages your workload needs which aren't already included in the Fabric runtime. For example:

```text
catboost==1.2.8
shap==0.44.0
```

You can check which packages are already included in the runtime by reviewing the YML files in the [Fabric runtime GitHub repo](https://github.com/microsoft/synapse-spark-runtime/tree/main/Fabric). Only list packages that are missing or need a different version.

### Step 2: Remove private libraries from the YML file

The runtime YML file contains Microsoft-hosted private libraries that pip can't resolve from public repositories. Remove these libraries from the file before creating your environment. The specific libraries vary by runtime version:

| Library                            | Runtime 1.2 | Runtime 1.3 | Runtime 2.0 |
| ---------------------------------- | :---------: | :---------: | :---------: |
| `azure-synapse-ml-predict`         | Yes         | --          | --          |
| `azureml-synapse`                  | Yes         | Yes         | Yes         |
| `chat-magics`                      | Yes         | Yes         | --          |
| `chat-magics-fabric`               | Yes         | Yes         | --          |
| `control-script`                   | --          | Yes         | --          |
| `ds-copilot`                       | Yes         | Yes         | --          |
| `dscopilot-installer`              | Yes         | Yes         | --          |
| `fabric-analytics-notebook-plugin` | --          | --          | Yes         |
| `fabric-analytics-sdk`             | --          | --          | Yes         |
| `fabric-connection`                | Yes         | Yes         | --          |
| `flaml`                            | Yes         | Yes         | Yes         |
| `flt-python`                       | --          | Yes         | Yes         |
| `fsspec_wrapper`                   | Yes         | Yes         | Yes         |
| `geoanalytics-fabric`              | --          | Yes         | Yes         |
| `impulse-python-handler`           | Yes         | Yes         | Yes         |
| `kqlmagiccustom`                   | --          | Yes         | Yes         |
| `library-metadata-cooker`          | Yes         | Yes         | Yes         |
| `notebookutils`                    | Yes         | Yes         | Yes         |
| `prose-pandas2pyspark`             | --          | Yes         | Yes         |
| `prose-suggestions`                | --          | Yes         | Yes         |
| `semantic-link-sempy`              | Yes         | Yes         | Yes         |
| `spark-mssql-connector-fabric35`   | --          | Yes         | --          |
| `spark-mssql-connector-fabric40`   | --          | --          | Yes         |
| `sqlanalyticsconnectorpy`          | Yes         | --          | --          |
| `sqlanalyticsfabricconnectorpy`    | Yes         | Yes         | Yes         |
| `synapseml`                        | --          | --          | Yes         |
| `synapseml-*`                      | Yes         | Yes         | Yes         |

### Step 3: Create a local Python environment that matches the Fabric runtime

On your Linux machine, set up a conda environment that mirrors the Fabric runtime. This setup ensures `pip` resolves the correct dependency versions for your packages.

1. Download and install Miniconda.

   ```shell
   wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
   bash Miniconda3-latest-Linux-x86_64.sh -b -p $HOME/miniconda3
   export PATH="$HOME/miniconda3/bin:$PATH"
   ```

1. Install the C/C++ compilers that some Python packages require during installation. On Ubuntu/Debian, use the following command:

   ```shell
   sudo apt-get update
   sudo apt-get -yq install gcc g++
   ```

   For other distros, use the equivalent package manager (for example, `tdnf` on Azure Linux).

1. Use the [edited YML file from a previous step](#step-2-remove-private-libraries-from-the-yml-file) to create a conda environment. The following example uses the Runtime 1.3 setup file. Replace the YML filename with the one for your runtime version.

   ```shell
   conda env create -n fabric-env -f Fabric-Python311-CPU.yml
   conda activate fabric-env
   ```

### Step 4: Download wheel files for your packages

Use `pip download` to download the wheel files for your required packages and all their dependencies into a local directory. This command resolves versions against the conda environment you created in the previous step.

```shell
mkdir wheels
pip download -r requirements.txt -d wheels
```

When the command finishes, the `wheels` directory contains `.whl` files for each package and its dependencies.

### Step 5: Upload the wheel files to your Fabric environment

Upload the downloaded wheel files to your Fabric environment as custom libraries:

1. In the Fabric portal, go to your workspace and open your [environment](create-and-use-environment.md).
1. Select **Custom libraries** on the left panel.
1. Select **Upload** and choose the `.whl` files from the `wheels` directory.
1. Select **Publish** to apply the changes.

## Host a PyPI mirror on Azure Storage

This approach sets up a full or partial replica of PyPI on an Azure Storage
account that's accessible from your Fabric workspace through a private
endpoint. Once configured, Fabric's Spark compute can resolve and install
packages directly — just like a normal `pip install` — without needing
outbound internet access.

> [!NOTE]
> A PyPI mirror is best suited for organizations that depend on many PyPI
> packages and prefer `pip install` to work without managing individual
> wheel files. It requires more upfront effort and ongoing maintenance than
> uploading wheels directly to your environment.
>
> If you only need a handful of packages, the
> [Upload custom libraries](#upload-custom-library-files-recommended) path
> above is simpler and is what we recommend for most workloads.
>
> You can find the [sample code](https://aka.ms/LM-OAP-sample-code) for the instructions in this chapter, covering all the end-to-end flows.

### When to mirror a subset vs. all of PyPI

You don't need to mirror all of PyPI for most workloads. Bandersnatch
supports [allow list filtering](https://bandersnatch.readthedocs.io/en/latest/filtering_configuration.html)
that lets you mirror only the projects (and versions) you care about, plus
their transitive dependencies. This approach creates a 1–5 GB mirror instead of a
200+ GB one, makes the initial sync take minutes instead of days, and
dramatically reduces the surface area you need to monitor for security
updates.

|                    | Subset mirror (allow list)                           | Full PyPI mirror                            |
| ------------------ | --------------------------------------------------- | ------------------------------------------- |
| Storage size       | 1–5 GB typical                                      | 200+ GB and growing                         |
| Initial sync time  | < 5 minutes                                         | 8–48 hours                                  |
| Daily refresh time | seconds                                             | minutes to hours                            |
| Maintenance burden | Low (review additions when expanding the allow list) | Higher (full upstream churn)                |
| When it fits       | You have a known list of packages your team uses    | You want anything on PyPI to be installable |

### Per-runtime values

Several steps in the following sections reference your **target Fabric runtime** (the Python version and the wheel platform tag the mirror needs to target). The following table lists the values to use. The rest of the walkthrough points back to this table wherever a code example is runtime-specific.

| Fabric runtime | Spark | Python version | `pip` platform tag      | Runtime YAML file                                                                                 |
| -------------- | ----- | -------------- | ----------------------- | ------------------------------------------------------------------------------------------------- |
| 1.3            | 3.5   | `3.11`         | `manylinux_2_17_x86_64` | [`Fabric-Python311-CPU.yml`](https://github.com/microsoft/synapse-spark-runtime/tree/main/Fabric) |
| 2.0            | 4.1   | `3.13`         | `manylinux_2_17_x86_64` | [`Fabric-Python313-CPU.yml`](https://github.com/microsoft/synapse-spark-runtime/tree/main/Fabric) |

> [!TIP]
> Where the examples in this article use `3.13` and `manylinux_2_17_x86_64`,
> substitute the row for **your** runtime. If you're not sure which runtime
> your workspace uses, check **Workspace settings** → **Data Engineering / Science** → **Spark settings** → **Runtime Version**.

### Storage account layout

The mirror uses a single Azure Storage account with **two containers**:

| Container         | Holds                                                                 | Pip reaches it via                                                     |
| ----------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `$web`            | `simple/`, `pypi/`, `json/`, `local-stats/` (text indexes, ~10–50 MB) | Static-website endpoint: `https://<acct>.z<n>.web.core.windows.net/`   |
| `source-packages` | `packages/` (wheel and sdist files, 1–5 GB typical)                   | Blob endpoint: `https://<acct>.blob.core.windows.net/source-packages/` |

> [!IMPORTANT]
> **Wheel files must be in a separate container from the indexes.** This
> separation keeps the small text-index content (served over the
> static-website endpoint) separate from the large binary content (served
> over the blob endpoint). This setup matches how Fabric OAP managed
> private endpoints resolve each service. Putting everything in `$web` is
> the most common cause of broken mirrors.
>
> The preceding example uses `source-packages` as the container name. You
> can choose a different name. If you choose a different name, substitute
> it wherever this article references `source-packages`. Pick the name
> **once** at the start and use it consistently.

### Prerequisites for a PyPI mirror

Before you begin, ensure you have the following items:

- **A Linux machine with internet access** — Use this machine to run the mirroring tool and upload packages. You can use
  [WSL](/windows/wsl/install), a Linux PC, or an
  [Azure Linux VM](/azure/virtual-machines/linux/quick-create-portal?tabs=ubuntu).
  Bandersnatch is **Linux-only** — it uses POSIX file locking and doesn't run
  on native Windows.
- **An [Azure Storage account](/azure/storage/common/storage-account-create?tabs=azure-portal)**
  — Hosts the mirrored packages. Your Fabric workspace must reach it
  through a managed private endpoint.
- **[Bandersnatch](https://bandersnatch.readthedocs.io/en/latest/)** — The
  PyPI mirroring tool that downloads packages and generates the index files
  that `pip` needs.
- **A file-upload utility** — [Azure CLI](/cli/azure/install-azure-cli),
  [AzCopy](/azure/storage/common/storage-use-azcopy-v10), or
  [Blobfuse2](/azure/storage/blobs/blobfuse2-what-is).
- **The Fabric runtime YAML file** for your target runtime, from the
  [Fabric runtime GitHub repo](https://github.com/microsoft/synapse-spark-runtime/tree/main/Fabric).
  Use it in Step 1 to determine which Python version and platform
  your wheels need to match.

> [!IMPORTANT]
> The full PyPI repository is large and constantly growing (see
> [PyPI statistics](https://pypi.org/stats/)). If you choose a full sync,
> plan for 8 to 48 hours of initial download depending on your network and
> hardware. The subset approach in this guide finishes in minutes.

### Step 1: Identify the packages you need to mirror

You want to mirror **only the packages that aren't already in the Fabric
runtime**, plus their transitive dependencies. Mirroring packages that the
runtime already ships is wasted bytes — `pip install` skips them
anyway.

1. Write a list of the packages your workloads need, restricted to those
   the runtime doesn't already ship. Save it as `requirements.txt`, example:

    ```text
    pydeequ
    fuzzywuzzy
    emoji
    pytest
    ```

2. On your Linux build machine, resolve the full transitive dependency
   closure against the target runtime. This step tells you the complete set of
   project names that you need to include in the mirror.

    > [!TIP]
    > Substitute `--python-version` and `--platform` with the values for
    > your runtime — see the [Per-runtime values](#per-runtime-values) table
    > at the top of this article. The following example targets **Runtime 2.0
    > (Python 3.13)**.

    ```bash
    # For Runtime 2.0 (Spark 4.1, Python 3.13):
    pip install --dry-run --ignore-installed --report report.json \
        --only-binary=:all: \
        --python-version 3.13 \
        --platform manylinux_2_17_x86_64 \
        --target /tmp/discover \
        -r requirements.txt

    # For Runtime 1.3 (Spark 3.5, Python 3.11), use --python-version 3.11.
    ```

    Read the resolved project names from `report.json`:

    ```bash
    python3 -c "
    import json
    d = json.load(open('report.json'))
    for it in d['install']:
        print(it['metadata']['name'].lower())
    " | sort -u
    ```

3. (Recommended) Decide how many versions of each project to mirror. Two
   versions per project (latest + previous stable) is a good default — it
   gives you a safe rollback if a release misbehaves and is cheap to store.

### Step 2: Configure Bandersnatch with an allow list

Install Bandersnatch and write a config that pins exactly the projects and
versions you want.

```bash
# Install Bandersnatch
python3 -m venv ~/mirror-venv
source ~/mirror-venv/bin/activate
pip install bandersnatch

# Choose a build directory
mkdir -p ~/lm-pypi-mirror
cd ~/lm-pypi-mirror
```

Create `bandersnatch.conf`:

```ini
[mirror]
directory = /home/<<your-user>>/lm-pypi-mirror/mirror
master = https://pypi.org

json = true
release-files = true
hash-index = false
simple-format = ALL

storage-backend = filesystem
api-method = simple
workers = 3

[plugins]
enabled =
    allowlist_project
    allowlist_release
    exclude_platform

[allowlist]
; List every project AND every version you want mirrored, one per line.
; Use the closure resolved in Step 1 — including transitive dependencies.
; The example pins below are illustrative; pick versions that have wheels
; for your target runtime's Python (see Per-runtime values table).
packages =
    pydeequ==1.5.0
    pydeequ==1.4.0
    fuzzywuzzy==0.18.0
    fuzzywuzzy==0.17.0
    emoji==2.15.0
    emoji==2.14.1
    pytest==9.0.3
    pytest==9.0.2
    ; ... include transitive deps here too:
    iniconfig==2.3.0
    packaging==26.2
    pluggy==1.6.0
    pygments==2.20.0

[blocklist]
; Drop wheels you'll never use from your Linux Spark compute.
platforms =
    windows
    macos
    freebsd
```

> [!WARNING]
> **Don't enable the `latest_release` plugin** for the subset mirror.
> Bandersnatch's `latest_release` plugin parses every historical version
> string of every mirrored project by using PEP 440. Some legacy projects ship
> non-PEP-440 strings - for example, `pytz` has `"2004d"` in its release
> history - which raises `InvalidVersion` and causes Bandersnatch to
> silently drop the entire project from the mirror.
>
> Use `allowlist_release` with explicit `==X.Y.Z` pins (as shown earlier)
> instead. The pins are also better for reproducibility - a re-sync doesn't
> drift to whatever got released upstream.

### Step 3: Run the mirror

```bash
cd ~/lm-pypi-mirror
source ~/mirror-venv/bin/activate
mkdir -p mirror

bandersnatch --config bandersnatch.conf mirror
```

With a typical subset of 10–30 projects, this step finishes in **under a
minute**. Confirm the layout:

```bash
ls mirror/web/                                    # simple/ pypi/ packages/ json/ local-stats/
ls mirror/web/simple/ | grep -v '^index'         # one folder per project
find mirror/web/packages -name '*.whl' | wc -l   # wheel count
du -sh mirror/web                                 # total size
```

> [!TIP]
> If a project from your allow list appears in `mirror/web/json/<pkg>` but
> not in `mirror/web/simple/<pkg>`, see the [Troubleshooting](#troubleshooting)
> section — usually a stale `latest_release` plugin from a previous run.

### Step 4: Verify the local mirror (optional but recommended)

Before uploading, verify the mirror works with a plain HTTP server:

```bash
cd ~/lm-pypi-mirror/mirror/web
python3 -m http.server 8765 &
SERVER_PID=$!
sleep 2

python3 -m venv /tmp/test-local
source /tmp/test-local/bin/activate
pip install --index-url http://localhost:8765/simple/ pytest emoji
deactivate

kill $SERVER_PID
```

If this step works, the mirror is correct. From this point forward, any failure
is in the Azure side of the setup.

### Step 5: Prepare the storage account

This step addresses common customer issues. Ensure the three settings on
the storage account are correct.

#### 5a. Enable Static Website and set the index document

Enable **Static Website** on your Azure Storage account
(Storage account → Capabilities → Static website → Enabled).
This action automatically creates the `$web` container and provides a primary endpoint
in the form `https://<storage-account>.z<n>.web.core.windows.net/`.

> [!IMPORTANT]
> You **must** set the **Index document name** to `index.html`. Without
> this setting, the static-website endpoint returns HTTP 404 for folder URLs like
> `simple/numpy/`. `pip install --index-url` always requests folder URLs,
> so the install fails for every package.
>
> Set the index document name in the portal at *Static website → Index document name* — or run:
>
> ```bash
> az storage blob service-properties update \
>     --account-name <storage-account> \
>     --auth-mode login \
>     --static-website \
>     --index-document index.html
> ```
>
> [!NOTE]
> The `z<n>` segment in the static-website hostname is the Azure scale unit
> your account landed on at creation time. It varies by account
> (`z5`, `z13`, `z20`, …). Always read your account's URL from
> `az storage account show ... --query primaryEndpoints.web -o tsv` — don't
> hand-copy a URL from another account.

#### 5b. Create the `source-packages` container

Create a second container to hold the wheel files. Pip reads it
anonymously (without an auth header), so the container must allow
**Blob (anonymous read access for blobs only)**.

```bash
# Allow anonymous public access at the account level (off by default for
# accounts created in 2023+). The static-website endpoint already serves
# anonymously regardless of this; the bit below is needed for the *blob*
# data plane that hosts /packages/.
az storage account update --name <storage-account> -g <resource-group> \
    --allow-blob-public-access true

# Create the source-packages container with blob-level anonymous read.
az storage container create \
    --account-name <storage-account> \
    --name source-packages \
    --public-access blob \
    --auth-mode login
```

> [!NOTE]
> In an OAP-enabled Fabric workspace, anonymous read on the container
> doesn't mean the public internet can read your packages. The
> managed private endpoint you connect in Step 8 still gates network
> access. Outside the virtual network, the storage account is unreachable regardless
> of this setting. The anonymous access is required because pip is an
> unauthenticated HTTP client; it doesn't send Azure AD tokens.

### Step 6: Rewrite the index files to use absolute URLs

Bandersnatch writes hrefs in `simple/<pkg>/index.html` as relative paths
like `../../packages/<hash>/<file>.whl`. Those paths resolve correctly only when
`simple/` and `packages/` share a root. Since you're putting `packages/`
in `source-packages` and `simple/` in `$web`, you need to rewrite the
relative paths to absolute URLs that point to your blob endpoint.

Save the following script as `replace_urls.py`:

```python
"""Rewrite relative ../../ package URLs in Bandersnatch index files to absolute
URLs pointing at the source-packages container.

Usage:
    python3 replace_urls.py \
        --mirror-dir /path/to/mirror/web \
        --new-url    https://<storage-account>.blob.core.windows.net/source-packages/
"""
import argparse
import os
import sys

INDEX_FILES = {"index.html", "index.v1_html", "index.v1_json"}


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--mirror-dir", required=True)
    p.add_argument("--old-url", default="../../")
    p.add_argument("--new-url", required=True)
    args = p.parse_args()

    if "<" in args.new_url or ">" in args.new_url:
        print(f"ERROR: --new-url contains placeholder: {args.new_url!r}", file=sys.stderr)
        return 2
    if not args.new_url.endswith("/"):
        print("ERROR: --new-url must end with /", file=sys.stderr)
        return 2

    n_subs = n_files = 0
    for root, _, files in os.walk(args.mirror_dir):
        for name in files:
            if name not in INDEX_FILES:
                continue
            fp = os.path.join(root, name)
            with open(fp, "r", encoding="utf-8") as f:
                data = f.read()
            new = data.replace(args.old_url, args.new_url)
            if new != data:
                with open(fp, "w", encoding="utf-8") as f:
                    f.write(new)
                n_files += 1
                n_subs += new.count(args.new_url) - data.count(args.new_url)
    print(f"Rewrote {n_subs} URLs across {n_files} files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

Run the script once after `bandersnatch mirror` and before uploading the files:

```bash
python3 replace_urls.py \
    --mirror-dir ~/lm-pypi-mirror/mirror/web \
    --new-url    "https://<storage-account>.blob.core.windows.net/source-packages/"
```

> [!IMPORTANT]
> The script edits `index.html`, `index.v1_html`, **and** `index.v1_json`.
> All three matter because pip uses content negotiation and might pick either
> the HTML (PEP 503) or JSON (PEP 691) variant. Don't hand-edit one
> variant without editing the others.
>
> This script is **idempotent on a fresh mirror** (it replaces `../../`
> exactly once) but **not reversible**. If you switch to a different
> storage account, first wipe `mirror/` and re-run Bandersnatch from scratch.

### Step 7: Upload the mirror to the storage account

Using Azure CLI:

```bash
ACCT=<<your-storage-account>>
SRC="$HOME/lm-pypi-mirror/mirror/web"

# Wheels (created in packages) -> source-packages container, at path 'packages/'.
az storage blob upload-batch \
    --account-name "$ACCT" \
    --destination source-packages \
    --destination-path packages \
    --source "$SRC/packages" \
    --auth-mode login \
    --overwrite \
    --max-connections 16

# Indexes (simple, pypi, json, local-stats) -> $web container.
for sub in simple pypi json local-stats; do
  az storage blob upload-batch \
      --account-name "$ACCT" \
      --destination '$web' \
      --destination-path "$sub" \
      --source "$SRC/$sub" \
      --auth-mode login \
      --overwrite \
      --max-connections 16
done
```

Notes:

- Quote `'$web'` in single quotes — both bash and PowerShell otherwise try
  to expand `$web` as a variable.
- `--auth-mode login` uses your `az login` identity. You need the
  **Storage Blob Data Contributor** role on the storage account.
- `--overwrite` makes the upload idempotent. Safe to re-run on failure.
- `az storage blob upload-batch` is **not** a sync — it never deletes
  blobs that it no longer present in the source. Use
  `azcopy sync --delete-destination=true` if you need pruning.

### Step 8: Connect Fabric to the mirror

To let Fabric's Spark compute reach your storage account from inside a
OAP-enabled workspace, add **two managed private endpoints** in the
Fabric workspace:

| Sub-resource | Connects to                                                   | Used for                                                     |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------------ |
| `blob`       | `<storage-account>.blob.core.windows.net/source-packages/...` | Downloading wheel files from the `source-packages` container |
| `web`        | `<storage-account>.z<n>.web.core.windows.net/simple/...`      | Reading the `simple/` index from the static-website endpoint |

After Fabric submits each endpoint, approve it on the Azure side at:
*Storage account → Networking → Private endpoint connections*.

### Step 9: Install packages from the mirror

In a Fabric notebook, you have two options. We strongly recommend Option A
for anything beyond a quick smoke test.

#### Option A (recommended): Use an Environment artifact

Fabric's Spark image ships several common Python packages pre-installed
(for example, Runtime 1.3 includes `pydeequ`, `numpy`, `pandas`, `six`).
After a kernel restart, the cluster-env path appears in `sys.path`
*before* the notebook user-site directory. This means `%pip install` from
the mirror can succeed in installing a newer version, but `import` will
still pick the cluster's older version.

**Environment artifacts override this** because Fabric mounts them ahead
of the cluster-env on `sys.path`.

To set it up:

1. In the Fabric portal: **Workspace → New → Environment**.
2. Open the new environment, choose **Public libraries → Add from .yml**,
   and upload an `environment.yml` like:

    ```yaml
    dependencies:
      - pip:
        - pydeequ==1.5.0
        - pytest==9.0.3
        - --index-url https://<storage-account>.z<n>.web.core.windows.net/simple
    ```

3. Click **Publish**.
4. On your notebook ribbon, select the new environment under **Environment**.
5. Verify:

    ```python
    import fuzzywuzzy
    print(fuzzywuzzy.__version__)
    # Expected: a path under the environment artifact, with your pinned version
    ```

#### Option B: Inline `%pip install`

For one-off probes:

```python
%pip install fuzzywuzzy --index-url https://<storage-account>.z<n>.web.core.windows.net/simple
```

**Verify which copy actually got imported**:

```python
import fuzzywuzzy
print(fuzzywuzzy.__version__)
```

### Refreshing the mirror

To pick up a new version of a mirrored project:

1. Add the new `pkg==X.Y.Z` line to `[allowlist] packages =` in
   `bandersnatch.conf`.
2. Re-run `bandersnatch --config bandersnatch.conf mirror`. This is
   incremental — only new files transfer.
3. **Re-run `replace_urls.py`** (Step 6) — easy to forget. Any new
   index entries Bandersnatch wrote in step 2 still have relative
   `../../packages/...` URLs and pip returns a 404 error on them until you rewrite.
4. Re-run the upload commands from Step 7 with `--overwrite`. They're
   idempotent.

To **add a new project**, repeat Step 1's `pip install --dry-run` to get
its transitive closure, append each `pkg==X.Y.Z` to the allow list, then
re-run from Step 3.

To **remove a project**, delete its lines from the allow list and either
set `cleanup = true` in `bandersnatch.conf` for the next run, or delete
the orphaned files manually from the storage account. Note that
`az storage blob upload-batch` doesn't delete obsolete blobs — use
`azcopy sync --delete-destination=true` if you want pruning.

### Troubleshooting

Common pitfalls to watch out for.

#### Folders end up in the wrong container

**Symptom:** Mirror builds and uploads successfully but `pip install` from
the static-website URL fails with HTTP 404 on either the simple/ index or
the wheel download. This problem occurs when folders from the local mirror split across the two containers in a way
that doesn't match what the index files expect.

**Expected mapping (run through this as a checklist):**

| Local folder              | Goes to container | Path inside container |
| ------------------------- | ----------------- | --------------------- |
| `mirror/web/simple/`      | `$web`            | `simple/`             |
| `mirror/web/pypi/`        | `$web`            | `pypi/`               |
| `mirror/web/json/`        | `$web`            | `json/`               |
| `mirror/web/local-stats/` | `$web`            | `local-stats/`        |
| `mirror/web/packages/`    | `source-packages` | `packages/`           |

#### `pip install` returns HTTP 404 for every package

**Cause:** The static-website default index document isn't set, so the
endpoint doesn't auto-serve `index.html` when pip requests
`simple/<pkg>/`.

**Fix:** Set it per Step 5a:

```bash
az storage blob service-properties update \
    --account-name <storage-account> --auth-mode login \
    --static-website --index-document index.html
```

#### `pip install` returns 401 or 403 when downloading a wheel

**Cause:** The storage account-level
`allowBlobPublicAccess` is `false` (the default for accounts created in
2023+), or the `source-packages` container's public-access level isn't
set to `blob`.

**Fix:**

```bash
az storage account update --name <storage-account> -g <resource-group> \
    --allow-blob-public-access true

az storage container set-permission \
    --account-name <storage-account> \
    --name source-packages \
    --public-access blob \
    --auth-mode login
```

In an OAP-enabled workspace, anonymous read on the container doesn't
mean the world can read your packages — the managed private endpoint
still gates network access. Outside the vnet, the storage account is
unreachable regardless of this setting.

#### A package is mirrored to `json/` but not `simple/`

**Cause:** You enabled the `latest_release` plugin and the project has a
non-PEP-440 version string in its history (the most common case is `pytz`
with `"2004d"`).

**Fix:** Remove `latest_release` from the `[plugins] enabled =` list. Use
`allowlist_release` with explicit `==X.Y.Z` pins.

#### `pip install` succeeds in the mirror but `import` shows the pre-baked Fabric version

**Cause:** Fabric's cluster-env appears earlier in `sys.path` than the
notebook's user-site. This affects packages the runtime ships
pre-installed (pydeequ, numpy, pandas, six, …).

**Fix:** Use an Environment artifact (Option A in Step 9). Fabric mounts
artifact paths ahead of the cluster-env on `sys.path`.

#### `pip install` fails with 404 on a wheel after a recent refresh

**Cause:** You ran `bandersnatch mirror` again to pick up new versions but
forgot to run `replace_urls.py` again. New index entries still contain
relative `../../packages/...` URLs that don't resolve against the
static-website endpoint.

**Fix:** Run Step 6 again, and then re-upload the `simple/` and `pypi/` folders
to `$web` (Step 7). The Refreshing the mirror checklist earlier lists this
as step 3. It's the most common refresh-time gotcha.

#### Wheel filenames look like the wrong platform (for example, aarch64, win_arm64)

**Cause:** Bandersnatch's `exclude_platform = windows macos freebsd`
setting doesn't exclude `win_arm64` (a gap in Bandersnatch's pattern list), and it
keeps every Linux variant — `manylinux_2_17`, `manylinux_2_27`,
`musllinux_1_2`, `aarch64`, `ppc64le`, `s390x`, every CPython version,
every PyPy version. For `numpy` and `pandas`, that's more than 60 wheels per
release.

**Fix:** This behavior is mostly harmless. Pip only downloads the wheel that
matches the target tag, so the unused ones are just storage cost. If you
need to trim, post-process `packages/` to delete files whose names don't
match your target tag (see the [Per-runtime values](#per-runtime-values)
table for the right tag), and then re-upload.

### Key concepts and reminders

A short list of things that are easy to get wrong:

- **Index files follow PEP 503 (HTML) and PEP 691 (JSON).** Bandersnatch
  writes all three forms (`index.html`, `index.v1_html`, `index.v1_json`).
  Don't hand-edit one without the others.
- **`--index-url` ends at `/simple`.** Pip appends the project name on
  its own. Don't include a deeper path.
- **Each `bandersnatch mirror` regenerates the simple/ index files.** If
  you hand-edit anything, your changes are lost on the next refresh.
  Run `replace_urls.py` (two-container layout) again after each re-sync.
- **`upload-batch` is not a sync** — it never deletes obsolete blobs. To
  prune, use `azcopy sync --delete-destination=true` or remove blobs
  manually.
- **Bandersnatch only mirrors PyPI-compatible upstream servers.** It
  can't mirror loose wheel files. If you have private packages in a
  feed (Azure Artifacts, JFrog, devpi, AWS CodeArtifact), point a separate
  Bandersnatch instance at that feed. For loose wheels, use the
  [Upload custom libraries](#upload-custom-library-files-recommended)
  path above — that's the supported approach for private packages.

## Related content

- [Create, configure, and use an environment in Fabric](create-and-use-environment.md)
- [Manage Apache Spark libraries in Fabric](library-management.md)
- [Apache Spark runtimes in Fabric](runtime.md)
- [Managed VNets for Fabric](/fabric/security/security-managed-vnets-fabric-overview)
