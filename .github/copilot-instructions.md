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

When writing about Microsoft Fabric services, follow these terminology standards. For full definitions of Fabric terms, see [Microsoft Fabric terminology](../docs/fundamentals/fabric-terminology.md).

The following table provides usage guidance for commonly misused terms. For definitions, see the [glossary](../docs/fundamentals/fabric-terminology.md).

| Term | Usage |
|------|-------|
| eventhouse | Always lowercase when talking about an instance. Don't use "event house" or "event-house". |
| item | Don't use "artifact", "asset", or "object". Whenever possible, use the specific term for the item type instead of "item". |
| lakehouse | Always lowercase when talking about an instance. Don't use "lake house" or "lake-house". |
| mirroring | Don't use "replication" or "data copy". Don't capitalize "mirroring". |
| OneLake security | Don't capitalize "security". |
| SQL analytics endpoint | Always use the full term "SQL analytics endpoint". Don't shorten to "SQL endpoint" or "analytics endpoint". Don't capitalize "analytics endpoint". |
| SQL database in Fabric | Always use the full term "SQL database in Fabric" unless referring to a SQL database outside of Fabric. Don't shorten to "SQL database" or "Fabric SQL database". Don't capitalize "database". |
| warehouse | Always lowercase when talking about an instance. Don't use "data warehouse" when talking about an instance. "Data Warehouse" (capitalized) is the name of the workload. |


