# Copilot Instructions for Microsoft Learn

These instructions define a unified style and process standard for authoring and maintaining learn.microsoft.com documentation with GitHub Copilot or other AI assistance.

## Learn-wide Instructions

Below are instructions that apply to all Microsoft Learn documentation authored with AI assistance. Learn product team will update this periodically as needed. Each repository SHOULD NOT update this to avoid being overwritten, but update the repository-specific instructions below as needed.

### AI Usage & Disclosure
All Markdown content created or substantially modified with AI assistance must include an `ai-usage` front matter entry:
- `ai-usage: ai-generated` – AI produced the initial draft with minimal human authorship
- `ai-usage: ai-assisted` – Human-directed, reviewed, and edited with AI support
- Omit only for purely human-authored legacy content

If missing, **add it**. However, do not add or update the ai-usage tag if the changes proposed are confined solely to:
- Links (link text and/or URLs)
- Single words or short phrases, such as entries in table cells
- Less than 5% of the article's word count

### Writing Style

Follow [Microsoft Writing Style Guide](https://learn.microsoft.com/style-guide/welcome/) with these specifics:

#### Voice and Tone

- Active voice, second person addressing reader directly
- Conversational tone with contractions
- Present tense for instructions/descriptions
- Imperative mood for instructions ("Call the method" not "You should call the method")
- Use "might" instead of "may" for possibility
- Avoid "we"/"our" referring to documentation authors

#### Structure and Format

- Sentence case headings (no gerunds in titles)
- Be concise, break up long sentences
- Oxford comma in lists
- Number all ordered list items as "1." (not sequential numbering like "1.", "2.", "3.", etc.)
- Complete sentences with proper punctuation in all list items
- Avoid "etc." or "and so on" - provide complete lists or use "for example"
- No consecutive headings without content between them

#### Formatting Conventions

- **Bold** for UI elements
- `Code style` for file names, folders, custom types, non-localizable text
- Raw URLs in angle brackets
- Use relative links for files in this repo
- Remove `https://learn.microsoft.com/en-us` from learn.microsoft.com links

## Repository-Specific Instructions

Below are instructions specific to this repository. These may be updated by repository maintainers as needed.

<!--- Add additional repository level instructions below. Do NOT update this line or above. --->

### Fabric terminology guidelines

When writing about Microsoft Fabric services, follow these terminology standards.

#### Fabric workloads

| First use | Subsequent uses | Notes |
|-----------|-----------------|-------|
| Microsoft Fabric | Fabric | |
| Microsoft Power BI | Power BI | Don't use "PowerBI." |
| Microsoft OneLake | OneLake | |
| Microsoft Fabric Workload Development Kit | Workload Development Kit | "WDK" is an approved acronym. |
| Fabric Databases | Databases | |
| Fabric Data Factory | Data Factory | |
| Fabric Data Engineering | Data Engineering | Don't use "Synapse" as part of the name. |
| Fabric Data Science | Data Science | Don't use "Synapse" as part of the name. |
| Fabric Data Warehouse | Data Warehouse | Don't use "Synapse" as part of the name. |
| Fabric Real-Time Intelligence | Real-Time Intelligence | The R and T in  "Real-Time" are always capitalized. |
| Fabric IQ | Fabric IQ | Always use the full name, don't shorten to "IQ". |


#### General terms

| Term | Definition | Examples | Usage |
|------|------------|----------|------------|
| eventhouse | A type of item in Fabric used for real-time data processing and analytics. | "Set up an eventhouse to process streaming data." | Always lowercase "eventhouse" when talking about an instance. Don't use "event house" or "event-house". |
| item | An object created by users in Fabric, such as a database, lakehouse, or eventhouse. | "Create a new item in your workspace." | Don't use "artifact", "asset", or "object". Whenever possible, use the specific term for the item type instead of "item". |
| lakehouse | A type of item in Fabric used for storing and analyzing large volumes of data. | "Create a lakehouse to store your data." | Always lowercase "lakehouse" when talking about an instance. Don't use "lake house" or "lake-house". |
| mirroring | The process of copying data from an external source into Fabric to create a mirrored database or catalog. | "Set up mirroring to sync your external database with Fabric." | Don't use "replication" or "data copy". Don't capitalize "mirroring". |
| warehouse | A type of item in Fabric used for structured data storage and analysis. | "Create a warehouse to manage your structured data." | Always lowercase "warehouse" when talking about an instance. Don't use "data warehouse" when talking about an instance. "Data Warehouse" (capitalized) is the name of the workload. |


