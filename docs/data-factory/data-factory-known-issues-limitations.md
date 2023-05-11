**Fabric Data Factory Known Issues and Limitations**

**Pipeline Known Issues:**

-   **Error messages in Dataflows Gen 2 refresh and Pipeline
    orchestration of same may be different, so advice is to check both
    error messages and decide next steps of troubleshooting.**

-   **If you enable *vertipaq* during Copy, performance will be slow due
    to extra compression.**

-   **If you use Copy Assist, you cannot skip Data Preview step. If you
    want the same, use Copy activity.**

-   **Pipeline tasks are ADF (Azure Data Factory) templates, but not all
    ADF templates are available in the gallery.**

-   **Dataflows Gen 2s and Pipeline Copy do not have non-Azure output
    connectors for AWS S3, GCS and others as of May 2023**

-   **Pipeline scheduled run will be displayed as Manual in the Monitor
    of run history.**

-   **Snowflake can't handle password contains \"&\" in Data pipeline.**

**Pipeline Limitations:**

-   **If your capacity is not in the same region as storage accounts,
    copy throughput can be low.**

-   **Email and Teams activities do not support dynamic content out of
    box, but same can be achieved with dynamic expressions with HTML
    tags in the content.**

-   **Most of ADF Copy and Orchestration patterns are applicable to
    Fabric Pipelines, but you may see Tumbling and Event triggers not
    available. Those will be supported in future.**

-   **Pipelines do not support CI/CD as of May 2023, it will be
    supported in the near future.**

-   **Connectors do not support MSI/UAMI as of May 2023, it is yet to be
    determined.**

-   **On-premises gateway or Vnet gateway can be used with Dataflows Gen
    2 to ingest on-prem data now. You can orchestrate on-prem data
    ingestion with data flow activity in pipeline.**

-   **Pipeline on managed vnet and on-prem data access with gateway are
    planned for future release.**

**Dataflows Gen 2 Known Issues:**

-   **Lakehouse/Datawarehouse-based compute or storage may not be
    available in all regions. If not available, please check with
    support.**

-   **Refresh history Activities have a complex name:
    WriteToDatabaseTableFrom_TransformForOutputToDatabaseTableFrom\_\[QUERYNAME\]**


-   **A Dataflows Gen 2 that was just created cannot be renamed from
    Query Editor.**

    -   **Re-open Dataflows Gen 2 and you can edit the name from the
        flyout above the ribbon.**

-   **Refresh History does not report Compute type used during refresh**

-   **Dataflows Gen 2s does not show up when you have no fabric capacity
    attached to your workspace.**

-   **When exporting/importing a PQ template with output destinations,
    additional queries show up. You need to remove these manually.**

> **Dataflows Gen 2 Limitations:**

-   **Data factory Fast Copy is not yet available.**

-   **Output destination to Lakehouse:**

    -   **DateTimeZone , Time and DateTime columns are not supported**

    -   **Spaces or special characters are not supported in column or
        table names.**

-   **No option to "auto fixup" invalid column names in Lakehouse
    connector**

-   **Duration and binary columns are not supported while authoring
    Dataflows Gen 2s.**

-   **You need to have the latest version of the gateway installed in
    order to use Dataflows Gen 2.**
