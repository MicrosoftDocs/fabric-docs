---
title: Migrate from Fabric Runtime 1.3 to Runtime 2.0
description: Learn how to assess, update, test, and migrate Apache Spark workloads from Fabric Runtime 1.3 to Runtime 2.0.
ms.reviewer: arali
ms.topic: how-to
ms.date: 10/19/2026
ai-usage: ai-assisted
---

# Migrate from Fabric Runtime 1.3 to Runtime 2.0

Fabric Runtime 2.0 is the latest generally available (GA) and default runtime for Apache Spark workloads in Microsoft Fabric. It updates the operating system, Java, Scala, Python, R, Apache Spark, and Delta Lake. Because several of these updates cross major-version boundaries, validate your notebooks, Spark job definitions, libraries, and data pipelines before you move production workloads from Runtime 1.3.

This guide describes the changes that can affect a migration and provides a staged process for moving your workloads to Runtime 2.0.

## What changed in Runtime 2.0

The following table compares the primary components in Runtime 1.3 and Runtime 2.0.

| Component | Runtime 1.3 | Runtime 2.0 | Migration consideration |
|---|---|---|---|
| Release stage | End of support announced (EOSA) | GA | Migrate production workloads to the supported GA runtime. |
| Apache Spark | 3.5.5 | 4.1.1 | Review Spark 4.1 behavior changes and removed APIs. |
| Delta Lake | 3.2 | 4.2 | Validate table features and protocol compatibility across every Fabric workload that uses your tables. |
| Java | 11 | 21 | Rebuild and test Java libraries and Java Native Interface (JNI) dependencies. |
| Scala | 2.12.17 | 2.13.16 | Recompile Scala JAR files for Scala 2.13. Scala 2.12 and 2.13 artifacts aren't binary compatible. |
| Python | 3.11 | 3.13 | Confirm that each Python package provides a Python 3.13-compatible release and Linux wheel. |
| R | 4.4.1 | 4.5.2 | Reinstall and test custom R packages. SparkR is deprecated in Spark 4.1. |
| Operating system | Azure Linux 2.0 (Mariner 2.0) | Azure Linux 3.0 (Mariner 3.0) | Rebuild native libraries and custom binaries for Azure Linux 3.0. |

Runtime 2.0 also provides new Apache Spark 4.1 capabilities, including the `VARIANT` data type, SQL user-defined functions, session variables, pipe syntax, string collation, the Python Data Source API, Python user-defined table functions, unified PySpark profiling, and new Structured Streaming state-management and debugging APIs. For an overview, see [Runtime 2.0 in Fabric](./runtime-2-0.md).

## Review compatibility changes

Review the following areas before you change a workspace or environment to Runtime 2.0.

### Built-in and custom libraries

Runtime 2.0 removes several preinstalled Python and R packages that were available in Runtime 1.3. Reducing the default package set keeps the runtime lean and reduces the surface area for potential security incidents. A package that was available without configuration in Runtime 1.3 might need to be added explicitly to your Runtime 2.0 environment.

Use Library Manager to add only the packages that your workload requires, and then save and publish the environment. Library Manager resolves the package's required dependencies, so don't add every dependency in the following inventories individually. Don't assume that a library is available or that its version is unchanged:

- Compare the Runtime 1.3 and Runtime 2.0 package inventories in the [Fabric runtime releases repository](https://github.com/microsoft/synapse-spark-runtime/tree/main/Fabric).
- Add missing PyPI, Conda, Maven, R, or custom libraries to an environment and publish it.
- Pin versions for production workloads to make dependency resolution repeatable.
- Confirm that Python packages support Python 3.13. Packages with native extensions must provide a compatible Linux wheel or build successfully on Azure Linux 3.0.
- Replace Scala 2.12 dependencies with Scala 2.13 artifacts. Artifact names commonly include the Scala binary version, such as `_2.12` or `_2.13`.
- Recompile custom JAR files against Java 21, Scala 2.13, and Spark 4.1. Test transitive dependencies for conflicts with runtime-provided libraries.
- Rebuild custom native libraries for Azure Linux 3.0.

Fabric migrates library specifications when you change an existing environment's runtime, but it can't guarantee that those libraries remain compatible. Publishing fails when dependency resolution finds a conflict. For package installation options and publish modes, see [Manage libraries in Fabric environments](./environment-manage-library.md).

#### Packages removed from the default environment

The following inventories include user-facing packages and their low-level or transitive dependencies. Search these lists for packages that your Runtime 1.3 workload uses. If a package is listed, add a Python 3.13-compatible or R 4.5-compatible version through Library Manager in your Runtime 2.0 environment.

<details>
<summary>Python environment: 348 Conda packages</summary>

| Package | Package | Package | Package |
|---|---|---|---|
| `_libgcc_mutex` | `_sysroot_linux-64_curr_repodata_hack` | `abseil-cpp` | `alabaster` |
| `aom` | `appdirs` | `archspec` | `argon2-cffi` |
| `argon2-cffi-bindings` | `arrow` | `arrow-cpp` | `asgiref` |
| `asn1crypto` | `astropy` | `async_generator` | `async-lru` |
| `async-timeout` | `autopep8` | `aws-c-auth` | `aws-c-cal` |
| `aws-c-common` | `aws-c-compression` | `aws-c-event-stream` | `aws-c-http` |
| `aws-c-io` | `aws-c-mqtt` | `aws-c-s3` | `aws-c-sdkutils` |
| `aws-checksums` | `aws-crt-cpp` | `aws-sdk-cpp` | `azure-keyvault` |
| `azure-storage` | `babel` | `backports` | `backports.shutil_get_terminal_size` |
| `bcrypt` | `beautifulsoup4` | `binaryornot` | `binutils_impl_linux-64` |
| `binutils_linux-64` | `bitarray` | `bkcharts` | `black` |
| `blas` | `bleach` | `blinker` | `blosc` |
| `bokeh` | `boltons` | `boost-cpp` | `boto` |
| `bottleneck` | `brunsli` | `c-ares` | `c-blosc2` |
| `cached-property` | `cfitsio` | `chardet` | `charls` |
| `cmake` | `cmdstan` | `conda-package-handling` | `conda-package-streaming` |
| `configparser` | `contextlib2` | `cookiecutter` | `curl` |
| `cython` | `cytoolz` | `daal4py` | `dal` |
| `dask` | `dask-core` | `dataclasses` | `datasets` |
| `dav1d` | `dill` | `distributed` | `distro` |
| `django` | `docutils` | `entrypoints` | `expat` |
| `fastcache` | `flake8` | `flit` | `flit-core` |
| `fmt` | `fonts-anaconda` | `future` | `gcc_impl_linux-64` |
| `gcc_linux-64` | `geographiclib` | `geopy` | `get_terminal_size` |
| `gevent` | `gflags` | `giflib` | `glib` |
| `glob2` | `glog` | `gmp` | `gmpy2` |
| `gobject-introspection` | `grpc-cpp` | `gst-plugins-base` | `gstreamer` |
| `gtk2` | `gxx_impl_linux-64` | `gxx_linux-64` | `hdf5` |
| `heapdict` | `html5lib` | `huggingface_hub` | `imagecodecs` |
| `imageio` | `imagesize` | `inflection` | `iniconfig` |
| `intel-openmp` | `intervaltree` | `ipython_genutils` | `jaraco.classes` |
| `jeepney` | `jpeg` | `json5` | `jsonpatch` |
| `jsonpointer` | `jupyter_console` | `jupyter_events` | `jupyter-lsp` |
| `jupyter_server` | `jupyter_server_terminals` | `jupyterlab` | `jupyterlab_pygments` |
| `jupyterlab_server` | `jxrlib` | `kernel-headers_linux-64` | `keyring` |
| `lazy_loader` | `lazy-object-proxy` | `liac-arff` | `libaec` |
| `libarchive` | `libavif` | `libclang` | `libcurl` |
| `libev` | `libevent` | `libgcc-devel_linux-64` | `libgfortran-ng` |
| `liblief` | `libllvm14` | `libmamba` | `libmambapy` |
| `libnghttp2` | `libprotobuf` | `libsolv` | `libspatialindex` |
| `libssh2` | `libstdcxx-devel_linux-64` | `libthrift` | `libtool` |
| `libwebp` | `libzopfli` | `lightning-utilities` | `llvm-openmp` |
| `llvmlite` | `locket` | `lxml` | `lz4` |
| `lz4-c` | `lzo` | `make` | `markdown` |
| `mccabe` | `menuinst` | `minio` | `mistune` |
| `mkl` | `mkl_fft` | `mkl_random` | `mkl-service` |
| `mock` | `more-itertools` | `mpc` | `mpfr` |
| `mpi` | `mpich` | `mpmath` | `msgpack-python` |
| `msrest` | `multipledispatch` | `multiprocess` | `mysql` |
| `nbclassic` | `nbclient` | `nbconvert` | `nest-asyncio` |
| `networkx` | `ninja` | `ninja-base` | `nose` |
| `notebook` | `notebook-shim` | `nspr` | `nss` |
| `numba` | `numexpr` | `numpy-base` | `numpydoc` |
| `oauthlib` | `olefile` | `openml` | `orc` |
| `overrides` | `pandocfilters` | `paramiko` | `partd` |
| `patch` | `patchelf` | `path` | `path.py` |
| `pathlib2` | `pep8` | `pickleshare` | `pkginfo` |
| `pluggy` | `ply` | `poppler` | `poppler-data` |
| `prettytable` | `prometheus_client` | `py-cpuinfo` | `py-lief` |
| `pybind11-abi` | `pycodestyle` | `pycosat` | `pycurl` |
| `pydocstyle` | `pyerfa` | `pyflakes` | `pynacl` |
| `pyopenssl` | `pyqt` | `pyqt5-sip` | `pyrsistent` |
| `pytables` | `pytest` | `python-fastjsonschema` | `python-json-logger` |
| `python-libarchive-c` | `python-lmdb` | `python-slugify` | `python-xxhash` |
| `pytorch` | `pytorch-lightning` | `pytorch-mutex` | `pywavelets` |
| `qdarkstyle` | `qstylizer` | `qt` | `qt-main` |
| `qt-webengine` | `qtawesome` | `qtconsole` | `qtpy` |
| `re2` | `reproc` | `reproc-cpp` | `requests-oauthlib` |
| `rfc3339-validator` | `rfc3986-validator` | `rhash` | `ripgrep` |
| `rtree` | `s2n` | `safetensors` | `scikit-build` |
| `scikit-image` | `scikit-learn-intelex` | `secretstorage` | `send2trash` |
| `shap` | `simplegeneric` | `singledispatch` | `sip` |
| `slicer` | `snappy` | `snowballstemmer` | `sortedcollections` |
| `sortedcontainers` | `soupsieve` | `sphinx` | `sphinxcontrib` |
| `sphinxcontrib-applehelp` | `sphinxcontrib-devhelp` | `sphinxcontrib-htmlhelp` | `sphinxcontrib-jsmath` |
| `sphinxcontrib-qthelp` | `sphinxcontrib-serializinghtml` | `sphinxcontrib-websupport` | `sqlite` |
| `sympy` | `sysroot_linux-64` | `tbb` | `tbb-devel` |
| `tbb4py` | `tblib` | `terminado` | `testpath` |
| `text-unidecode` | `textdistance` | `tifffile` | `tinycss2` |
| `tokenizers` | `toml` | `tomli-w` | `toolz` |
| `torchdata` | `torchmetrics` | `transformers` | `truststore` |
| `typed-ast` | `ujson` | `unicodecsv` | `unidecode` |
| `utf8proc` | `webencodings` | `websocket-client` | `wheel` |
| `whichcraft` | `xlsxwriter` | `xlwt` | `xmltodict` |
| `xxhash` | `xyzservices` | `xz` | `yaml-cpp` |
| `yapf` | `zfp` | `zict` | `zlib` |
| `zope` | `zope.event` | `zope.interface` | `zstandard` |
</details>

<details>
<summary>Python environment: 24 pip packages</summary>

| Package | Package | Package | Package |
|---|---|---|---|
| `accelerate` | `astor` | `dash` | `dash-core-components` |
| `dash-cytoscape` | `dash-html-components` | `dash-table` | `docker` |
| `interpret` | `interpret-core` | `json-tricks` | `nni` |
| `nvidia-ml-py` | `pyperclip` | `pythonwebhdfs` | `responses` |
| `retrying` | `salib` | `schema` | `seqeval` |
| `simplejson` | `tensorboardx` | `thop` | `typeguard` |
</details>

<details>
<summary>R environment: 67 Conda packages</summary>

| Package | Package | Package | Package |
|---|---|---|---|
| `_libgcc_mutex` | `_sysroot_linux-64_curr_repodata_hack` | `blosc` | `cfitsio` |
| `expat` | `fmt` | `freetype` | `freexl` |
| `geos` | `geotiff` | `giflib` | `hdf4` |
| `hdf5` | `json-c` | `kealib` | `lcms2` |
| `libaec` | `libarchive` | `libgdal` | `libgdal-core` |
| `libgdal-fits` | `libgdal-grib` | `libgdal-hdf4` | `libgdal-hdf5` |
| `libgdal-jp2openjpeg` | `libgdal-kea` | `libgdal-netcdf` | `libgdal-pdf` |
| `libgdal-pg` | `libgdal-postgisraster` | `libgdal-tiledb` | `libgdal-xls` |
| `libkml` | `libnetcdf` | `libnsl` | `librttopo` |
| `libspatialite` | `libsqlite` | `libudunits2` | `libv8` |
| `libzip` | `lzo` | `minizip` | `nspr` |
| `nss` | `openjpeg` | `poppler` | `poppler-data` |
| `proj` | `r-classint` | `r-gsl` | `r-jose` |
| `r-mgcv` | `r-s2` | `r-sf` | `r-units` |
| `r-wk` | `spdlog` | `sqlite` | `tiledb` |
| `uriparser` | `xerces-c` | `xorg-kbproto` | `xorg-renderproto` |
| `xorg-xextproto` | `xorg-xproto` | `xz` |  |
</details>

> [!NOTE]
> If outbound access protection or a managed virtual network prevents access to public repositories, download compatible wheel files or host a package mirror. For instructions, see [Manage libraries with limited network access in Fabric](./environment-manage-library-with-outbound-access-protection.md).

### Spark configuration changes

Runtime 2.0 adds and removes Spark settings and changes some default values. Fabric also uses different defaults from Apache Spark for some settings.

Before you migrate, review the Spark settings you configured for your workspaces, environments, notebooks, and Spark job definitions. Remove settings that are no longer supported, and test workloads that rely on changed defaults. Use the runtime defaults unless the documentation directs you to change a setting.

#### Notable default value changes

The following table lists selected baseline changes. **Not set** means that the baseline doesn't explicitly set a value; it doesn't mean that the feature is disabled.

| Configuration | Runtime 1.3 value | Runtime 2.0 value | Migration consideration |
|---|---|---|---|
| `spark.checkpoint.compress` | `false` | `true` | Checkpoint files are compressed by default. Validate checkpoint interoperability and storage behavior. |
| `spark.databricks.delta.optimizeWrite.enabled` | `true` | Not set | The property isn't removed. Validate effective optimized-write behavior with your table, session, and resource-profile settings. |
| `spark.databricks.delta.optimizeWrite.partitioned.enabled` | `false` | `true` | Validate write throughput and output file sizes for partitioned Delta tables. |
| `spark.hadoop.parquet.block.size` | `1073741824` (1 GiB) | `134217728` (128 MiB) | Parquet writers target smaller blocks. Validate file sizes and downstream read performance. |
| `spark.microsoft.delta.optimize.fast.enabled` | `false` | `true` | `OPTIMIZE` can skip work unless file-count or estimated compaction-size criteria are met. Validate maintenance results. |
| `spark.microsoft.delta.optimize.fileLevelTarget.enabled` | `false` | `true` | Files that previously met at least half their compaction target size aren't compacted again. Validate file layout after `OPTIMIZE`. |
| `spark.microsoft.delta.targetFileSize.adaptive.enabled` | `false` | `true` | Delta calculates the target file size based on table size. Validate resulting file sizes and read performance. |
| `spark.speculation.multiplier` | `1.5` | `3` | A task must run three times slower than the median before Spark considers it for speculative execution. |
| `spark.speculation.quantile` | `0.75` | `0.9` | Spark waits for 90% of tasks to finish before it considers speculative execution. |
| `spark.sql.files.maxPartitionBytes` | `134217728` (128 MiB) | `536870912` (512 MiB) | File scans can pack more data into each partition. Validate parallelism and executor memory use. |
| `spark.sql.maxSinglePartitionBytes` | `Long.MaxValue` | `128m` | A single partition is limited to 128 MiB by default. Validate queries that produce large single partitions. |
| `spark.sql.orc.compression.codec` | `snappy` | `zstd` | New ORC writes use Zstandard compression by default. Validate compatibility and performance with downstream readers. |
| `spark.sql.sources.v2.bucketing.enabled` | `false` | `true` | Spark enables storage-partitioned joins and other Data Source V2 bucketing behavior by default. Validate query plans and results. |
| `spark.sql.sources.v2.bucketing.pushPartValues.enabled` | `false` | `true` | Spark can push compatible partition values for Data Source V2 bucketing. Validate query plans for bucketed tables. |

Runtime 2.0 also uses `ROCKSDB` instead of `LEVELDB` for `spark.shuffle.service.db.backend` and sets `spark.shuffle.service.removeShuffle` to `true`. Spark uses the external shuffle service to delete unneeded shuffle blocks for deallocated executors.

Delta parallel snapshot loading, parallel data skipping, and driver-side snapshot loading also change from `false` to `true`. Test query latency and driver resource usage, especially for queries that access multiple Delta tables.

#### Session-start overrides and native execution

Fabric feature rollouts can override baseline values when a session starts.

| Configuration | Runtime 2.0 baseline value | Runtime 2.0 session-start value in public production regions | Migration consideration |
|---|---|---|---|
| `spark.gluten.sql.columnar.costBasedFallback.enabled` | `false` | `true` | The production rollout recorded on October 16, 2026 enables cost-based fallback to Spark. Recheck query plans and performance, including workloads tested before that rollout. |
| `spark.sql.parquet.native.writer.complexTypes.enabled` | `false` | `true` | Test native Parquet writes and downstream reads for arrays, maps, and structs. |

When you use the native execution engine, include the following checks in your regression tests:

- Validate memory usage with the columnar batch-size default increasing from 4,096 to 10,240.
- Compare shuffle plans and performance with the sort-based columnar shuffle threshold decreasing from 100,000 to 4,000 partitions.
- Compare regular-expression results and performance. Native-engine Java regex support changes from disabled to enabled, and the setting that falls back all regex expressions to Spark changes from `true` to `false`.



#### Apache Spark 4.1 defaults retained differently in Fabric

Fabric Runtime 2.0 intentionally overrides the following Apache Spark 4.1 defaults. Don't assume that an upstream Spark 4.1 default applies unchanged in Fabric.

| Configuration | Apache Spark 4.1 default | Fabric Runtime 2.0 value |
|---|---|---|
| `spark.eventLog.compress` | `true` | `false` |
| `spark.eventLog.rolling.enabled` | `true` | `false` |
| `spark.sql.ansi.enabled` | `true` | `false` |
| `spark.sql.catalog.spark_catalog` | `builtin` | `org.apache.spark.sql.delta.catalog.DeltaCatalog` |
| `spark.sql.hive.metastore.version` | `2.3.10` | `2.3.2` |

### Spark SQL and DataFrame behavior

Spark 4.1 introduces behavior changes that can change query results or cause previously accepted queries to fail. Pay particular attention to ANSI SQL behavior, casts, date and timestamp operations, data types, JDBC mappings, and deprecated SQL configurations.

Run regression tests that compare:

- Output schemas, including type, precision, scale, and nullability.
- Row counts and aggregate results.
- Null, overflow, division-by-zero, and invalid-cast behavior.
- Date, timestamp, time zone, and interval results.
- JDBC source and sink type mappings.
- Query plans and performance for critical workloads.

Don't use legacy compatibility settings as the permanent migration strategy. If you temporarily use one to isolate a failure, update the affected code and remove the setting before completing the migration. For the complete set of behavior changes, see the [Spark SQL migration guide](https://spark.apache.org/docs/latest/sql-migration-guide.html).

### Python and pandas API on Spark

Runtime 2.0 moves from Python 3.11 to Python 3.13 and includes the PySpark changes introduced in Spark 4.1. Spark 4.1 also raises the minimum supported versions of pandas, NumPy, and PyArrow and removes APIs that were deprecated in earlier releases.

Common pandas API on Spark updates include:

- Replace `DataFrame.iteritems` and `Series.iteritems` with `items`.
- Replace `DataFrame.append` and `Series.append` with `ps.concat`.
- Replace removed `inplace` parameters on categorical operations with assignments.
- Review changed parameter names and defaults, such as `inclusive` and `Series.str.replace(regex=...)`.
- Validate result column names, index names, dtypes, and ordering.

For the complete list, see the [PySpark migration guide](https://spark.apache.org/docs/latest/api/python/migration_guide/pyspark_upgrade.html).

### Java and Scala applications

Scala 2.13 isn't binary compatible with Scala 2.12. Reusing a Runtime 1.3 JAR in Runtime 2.0 can cause class-loading errors even when the source code hasn't changed. Build a separate Runtime 2.0 artifact and update all Scala cross-built dependencies.

Spark 4.1 also changes its internal servlet API references from `javax` to `jakarta`. Review custom listeners, Spark extensions, and libraries that interact with Spark internals. For other engine-level changes, see the [Spark Core migration guide](https://spark.apache.org/docs/latest/core-migration-guide.html).

### Streaming workloads and connectors

The deprecated `EventHubConnector` included in Runtime 1.3 isn't available in Runtime 2.0. Use the Apache Spark Kafka connector with the Kafka-compatible endpoint for Azure Event Hubs. For setup guidance, see [Use Apache Spark with Azure Event Hubs for Apache Kafka](/azure/event-hubs/event-hubs-kafka-spark-tutorial).

For applicable scenarios, you can also evaluate Fabric eventstream to ingest streaming data and process it in a notebook with Spark Structured Streaming. For more information, see [Query eventstream in Microsoft Fabric from a notebook with Spark Structured Streaming](./notebook-with-event-stream.md).

For each Structured Streaming workload:

- Test whether the Runtime 2.0 query can restart from a copy of the existing checkpoint.
- Validate stateful operations, event-time watermarks, triggers, source and sink options, and output schemas.
- Keep the source data and the original checkpoint available until validation is complete.
- If a checkpoint is incompatible, plan a controlled restart with a new checkpoint. Account for replayed or skipped input, and make the sink idempotent before you restart.

Review the [Structured Streaming migration guide](https://spark.apache.org/docs/latest/streaming/ss-migration-guide.html) for upstream compatibility changes.

### Delta Lake tables

Delta Lake maintains backward compatibility for existing tables, so Runtime 2.0 can work with tables created by Runtime 1.3. However, enabling a newer table feature can raise the table's reader or writer protocol and prevent older engines or other Fabric experiences from using the table.

During the initial runtime migration:

- Don't upgrade table protocols or enable Delta Lake 4.2 features.
- Inspect the features and protocol versions of newly created tables as well as existing tables. Runtime 2.0 sets `spark.databricks.delta.properties.defaults.enableDeletionVectors` to `true`; verify the resulting table metadata instead of assuming that avoiding manual feature enablement preserves compatibility.
- Test reads, writes, merges, schema evolution, maintenance operations, and concurrent access.
- Identify every engine that reads or writes each table, including the SQL analytics endpoint, Power BI, pipelines, dataflows, eventstreams, and external engines.
- Enable a new Delta feature only after all consumers support it.

Delta Lake 4.2-specific features are experimental in Fabric and are limited to Spark experiences. For the support matrix and default protocol versions, see [Delta Lake table format interoperability](../fundamentals/delta-lake-interoperability.md).

## Migrate your workloads

Use a staged migration instead of changing the runtime for a production workspace immediately.

### 1. Inventory your Runtime 1.3 workloads

Record the following information:

- Notebooks, Spark job definitions, pipelines, schedules, and dependent items.
- Workspace-level and item-level environment assignments.
- Spark configurations, including any legacy compatibility settings.
- Public, private, and custom libraries and their resolved versions.
- Custom JAR files, Python wheels, R packages, native libraries, and initialization logic.
- Data sources, destinations, secrets, connections, and network requirements.
- Delta tables and all non-Spark consumers of those tables.
- Streaming checkpoints, schemas, offsets, and recovery requirements.
- Expected output schemas, row counts, data-quality checks, and performance baselines.

Prioritize workloads that use custom libraries, native code, Scala, streaming state, or advanced Delta features.

### 2. Create a Runtime 2.0 test environment

Create a separate environment item and select **2.0 (Spark 4.1, Delta 4.2)** as its runtime. Add the required libraries, save the environment, and publish it. Attach the environment to copies of representative notebooks and Spark job definitions in a development or test workspace.

If your production workspace still uses Runtime 1.3, don't change its runtime until testing is complete. Keep its existing configuration available for rollback during validation.

To validate upcoming Runtime 2.0 updates before they reach the default channel, use the early access release channel in your test environment. For more information, see [Fabric runtime release channels](./release-channels.md).

### 3. Update libraries and code

Apply the changes identified in the compatibility review:

1. Replace missing built-in packages with explicit environment dependencies.
1. Upgrade or replace packages that don't support Python 3.13, Java 21, Scala 2.13, or Azure Linux 3.0.
1. Rebuild custom JAR files and native binaries.
1. Update removed PySpark and pandas API on Spark calls.
1. Replace `EventHubConnector` with the Kafka connector.
1. Remove Spark settings for configurations that aren't available in Runtime 2.0, and review explicit overrides of configurations whose defaults changed.
1. Resolve Spark SQL behavior differences in code instead of relying permanently on legacy settings.
1. Keep existing Delta table features and protocols unchanged during this phase.

### 4. Run compatibility and regression tests

Run the same representative inputs on Runtime 1.3 and Runtime 2.0. Compare:

- Completion status, logs, warnings, and retries.
- Schemas and data types.
- Row-level and aggregate results.
- Delta table history and protocol.
- Streaming progress, state, latency, and duplicate handling.
- Execution time, resource use, and cost.
- Downstream results in the SQL analytics endpoint, Power BI, pipelines, and other consumers.

Include failure and recovery tests, not only successful runs. Test session restarts, job retries, checkpoint recovery, and concurrent table access.

### 5. Roll out Runtime 2.0

Move workloads in controlled batches:

1. Publish the validated Runtime 2.0 environment.
1. Attach it to a small set of production notebooks or Spark job definitions.
1. Run the batch and monitor outputs and downstream consumers.
1. Continue with the remaining workloads after the observation period.
1. Set Runtime 2.0 as the workspace default only after item-level migration is complete.

Changing the workspace runtime affects new Spark sessions. Existing sessions continue to use their current runtime until they stop.

### 6. Keep a rollback path

Keep the Runtime 1.3 environment, artifacts, library specifications, and streaming checkpoints until the Runtime 2.0 observation period ends. To roll back, reattach the Runtime 1.3 environment or restore the previous workspace runtime and start a new Spark session.

> [!IMPORTANT]
> A Delta protocol upgrade isn't generally reversible. Don't enable table features that raise the protocol until you've completed Runtime 2.0 validation and confirmed compatibility with every table consumer.

## Migration checklist

Before you complete the migration, confirm that:

- [ ] Every required Python and R package is explicitly available and compatible with Python 3.13 or R 4.5.
- [ ] Custom JAR files target Java 21, Scala 2.13, and Spark 4.1.
- [ ] Native dependencies work on Azure Linux 3.0.
- [ ] Workspace, environment, notebook, and Spark job definition settings don't use removed Spark configurations.
- [ ] Workloads are tested against the changed Runtime 2.0 Spark configuration defaults.
- [ ] Spark SQL and PySpark regression tests pass.
- [ ] Event Hubs workloads use the Kafka connector.
- [ ] Structured Streaming workloads restart and recover as designed.
- [ ] Delta table protocols and features remain compatible with all consumers.
- [ ] Data-quality, performance, and cost results meet your acceptance criteria.
- [ ] Production rollout, monitoring, and rollback procedures are documented and tested.

## Related content

- [Runtime 2.0 in Fabric](./runtime-2-0.md)
- [Apache Spark runtimes in Fabric](./runtime.md)
- [Apache Spark runtime lifecycle in Fabric](./lifecycle.md)
- [Manage libraries in Fabric environments](./environment-manage-library.md)
- [Spark Runtime releases and updates](https://github.com/microsoft/synapse-spark-runtime)
