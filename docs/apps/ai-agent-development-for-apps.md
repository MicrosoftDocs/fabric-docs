---
title: Develop Fabric apps with AI coding agents in your organization
description: Plan how to enable business developers to build Fabric apps with approved templates, AI agent skills, guided development, and governed GitHub deployment workflows.
ms.reviewer: mksuni
ms.topic: concept-article
ms.date: 10/25/2026
ai-usage: ai-generated
---

# Develop Fabric apps with AI coding agents in your organization

Help business developers with limited coding experience build Fabric apps using the Rayfin SDK and AI coding agents. Provide a supported path from idea to deployment, with platform, security, and release controls owned by qualified teams.

Use this guide as a practical rollout plan, not a fixed operating model. Adapt the examples to your business needs, data classifications, support model, and risk tolerance.

### Start here

- Define the business outcome, owner, and risk level for each app.
- Standardize templates, skills, and deployment targets before broad rollout.
- Use GitHub environments and approvals to protect production releases.

> [!IMPORTANT]
> Templates, prompts, and skills aren't security boundaries or proof of compliance. Enforce controls through Fabric, source systems, GitHub, and your identity and security systems. Validate preview limitations before approving a use case.

## Separate product capabilities from organization setup

Identify what the platform provides and what your team needs to build.

| Building block | Available capability | Organization responsibility |
| --- | --- | --- |
| App starters | Custom templates and catalogs | Test, version, and support approved templates |
| Agent guidance | Managed Rayfin agent files | Add business skills and verify agent loading |
| Service configuration | `rayfin/rayfin.yml` | Define and validate allowed service combinations |
| Deployment | CLI deployment to Fabric workspaces | Guide users to approved targets and reject others |
| Automation | GitHub Actions deployment with a service principal | Protect repositories, environments, credentials, and releases |
| Operations | Built-in App Metrics | Provide support, capacity monitoring, and recovery |

Intake forms, organization skills, policy checks, and guided releases are patterns you implement, not a built-in onboarding wizard. The documented [GitHub Actions deployment](deploy-github-actions.md) uses the Rayfin CLI; don't assume Fabric Git integration or deployment pipelines support the same lifecycle.

## Phase 1: Agree on business outcomes and ownership

Start with a few use cases. Record each app's audience, owner, data sources, permitted actions, expected usage, data classification, and support contact.

Choose a delivery path based on risk. For example:

| Example path | Suitable starting scope | Review approach |
| --- | --- | --- |
| Learning sandbox | Synthetic data and no production dependencies | Isolate the workspace; deny production access |
| Internal read-only app | Approved sources and employee audience | Review permissions and business results |
| App with business writes | Operational updates or consequential actions | Add developer review, authorization tests, recovery planning, and business approval |
| Restricted or critical app | Regulated data, broad distribution, or essential operations | Use established engineering and compliance processes; exclude from self-service if requirements can't be met |

Assign owners. Business developers can own requirements and acceptance without owning production credentials.

| Owner | Decisions and ongoing work |
| --- | --- |
| Business sponsor and app owner | Approve scope, acceptance criteria, data use, funding, and retirement |
| Platform team | Maintain templates, skills, environments, workflows, and onboarding |
| Fabric administrator and data owner | Approve capacity, workspaces, tenant settings, access, and sharing |
| Security and compliance reviewers | Assess identity, data handling, agent use, and exceptions |
| Developer or release owner | Review sensitive changes and own deployment automation and recovery |

**Exit criterion:** Each app has an approved scope, business and support owners, and a risk-appropriate release path.

## Phase 2: Prepare tenant access and development workspaces

Verify [Fabric Apps prerequisites](overview.md#prerequisites), [region availability](../admin/region-availability.md), and capacity. Scope workload enablement to a pilot security group where supported. Limit service principal API access to approved deployment identities by using the tenant's available controls.

Create separate development and production workspaces, plus test workspaces if needed. Choose per-person, team, or app development workspaces based on isolation, cost, and support needs.

Maintain an administrator-controlled target mapping:

| Field | Example decision |
| --- | --- |
| App and repository | Organization-owned app repository |
| Development target | Tenant and development workspace IDs |
| Production target | Production workspace ID and app item ID after provisioning |
| Data sources | Source workspace and item IDs, plus permitted operations |
| Deployment identity | Production service principal with minimum required access |
| Audience | Approved app users, separate from editors |

Separate workspace, app, and source-data permissions. App users don't need production edit access, and deployment access doesn't grant runtime source access. Protect target mappings: changing an identifier can redirect deployment or data access.

**Exit criterion:** A pilot user can access the intended development resources and can't deploy to production through their development identity.

## Phase 3: Publish a small catalog of supported templates

Create [organization-owned templates](author-templates.md) for recognizable business tasks, such as data viewing, team records, or request tracking.

For each template, include:

- Intended audience, supported scenarios, and excluded uses.
- Tested Rayfin and dependency versions, a lockfile, and a release identifier.
- Minimal services, approved UI and accessibility patterns, and synthetic data.
- Explicit authorization rules and allowed/denied tests.
- Organization skills, agent entry points, and example prompts.
- Setup, preview, validation, and release instructions with workflow references.
- Ownership, support, limitations, and an upgrade process.

Use a protected, reviewed tag or full commit SHA as your scaffold. Test the complete development and deployment path from a clean scaffold. Track template versions and deliver updates to existing apps separately; template updates don't propagate automatically.

### Enable only the services the app needs

Check the [service settings](project-structure.md) against the scaffolded project's version-matched documentation. Disable unnecessary services, remove unused integrations, and test the combination.

| Capability | Organization decision |
| --- | --- |
| Authentication | Keep Fabric SSO for deployed internal apps; test it after deployment |
| App-managed data | Enable for app-owned records; validate whether connector-only apps can disable it |
| Connectors | Limit sources, columns, and operations; prefer read-only access |
| Static hosting | Enable for Fabric-hosted frontends; explicitly select protected access for internal apps |
| Functions | Include only needed server logic; review inputs, callable operations, downstream permissions, and secrets |
| Storage and external services | Disable unused capabilities and remove unneeded credentials and grants |

Protected hosting and UI restrictions don't replace API or source authorization. See [hosting](hosting.md), [data permissions](data-permissions.md), and [connectors](connectors.md).

Require review for service, connector, or anonymous-access changes. Disabling a service doesn't delete retained data or revoke credentials.

**Exit criterion:** Each template has a tested capability profile, a maintainer, and an approved release.

## Phase 4: Package practical agent skills

Preserve the [CLI-managed agent files and MCP configuration](author-templates.md#how-templates-work). Keep version-matched guidance in the project-managed skill files, and add a small set of organization-owned skills through `AGENTS.md` for the common decisions your teams make.

Approve the agents your organization supports, such as GitHub Copilot, Claude Code, or Codex, under your existing AI policies. Check instruction discovery, tool access, terminal approvals, and MCP permissions for each tool; the exact behavior varies by product.

Keep the skill set narrow and reusable. A good pattern is a few skills that cover intake, approved data use, release review, and support handoff rather than a large set of one-off prompts.

| Example skill | Trigger | Required behavior and output |
| --- | --- | --- |
| `app-intake` | Start or change an app | Capture the business goal, owner, audience, data use, and approval path; stop when the app is outside the approved scope |
| `approved-data-use` | Connect data or a semantic model | Confirm approved sources and permissions; flag any new data source, field, or write operation for review |
| `solution-review` | Design a dashboard or business app | Check approved patterns, user needs, model limits, and sensitive data handling; raise issues before implementation continues |
| `release-request` | Publish or deploy | Resolve the approved environment, summarize changes, and request a governed release with required approvals |
| `handoff-and-support` | Share or hand over an app | Record owners, support contacts, limitations, and operational guidance for the next team |

**For example**, a team might request a dashboard app backed by an approved semantic model. The skill should verify that the semantic model is approved for use, only the required measures and dimensions are exposed, the audience is allowed to access the data, and any change to permissions or fields is escalated before release.

**Exit criterion:** A new user can complete supported tasks with an approved agent, and attempts to bypass review or target the wrong environment are blocked by the platform or process controls.

## Phase 5: Provide a guided development experience

Provide a managed local or remote environment with tested editor, agent, Git, Node.js, npm, and Rayfin versions. Install Docker or Functions tooling only when needed. Validate authentication, networking, licenses, endpoint policies, registry access, and private-template credentials.

Give users a short onboarding flow:

1. Choose an approved use case and template, and provision an organization-owned repository.
1. Open the prepared environment and complete sign-in.
1. Run the readiness check for tools, repository access, targets, and data permissions.
1. Describe requirements with synthetic examples and review the agent's plan.
1. Preview the app, run checks, and verify business scenarios.
1. Request review and deployment through the guided release flow.

Implement readiness checks as a maintained script or workflow, with clear errors and support contacts. Don't resolve setup failures by disabling TLS checks, granting broad access, or requesting secrets in chat.

Limit agents to project files and approved tools. Review MCP servers, extensions, skills, and install scripts as supply-chain inputs. Apply approved AI data-handling, retention, and training settings. Treat retrieved content and tool output as untrusted input, not authorization to change controls.

**Exit criterion:** A pilot business developer can reach a working preview without manually repairing the toolchain or receiving production credentials.

## Phase 6: Set up GitHub and automate the release path

Consider central templates and reusable workflows with one repository per app. Use a monorepo if you can isolate access, targets, checks, and releases.

Store code, lockfiles, skills, nonsecret configuration, tests, release instructions, and owner contacts in the app repository. Exclude secrets, temporary files, and sensitive sample data.

Configure repository controls before users begin development:

- Limit repository visibility and access to approved teams.
- Protect release branches with required checks and risk-appropriate reviews.
- Enforce code-owner review for workflows, mappings, authentication, data policies, skills, and services; `CODEOWNERS` alone doesn't enforce approval.
- Restrict settings changes, rule bypasses, and central workflow updates.
- Enable supported secret scanning, push protection, dependency monitoring, and code scanning. Define alternatives for unavailable features.

### Design the pipeline around user actions

Build on [GitHub Actions deployment](deploy-github-actions.md). Automate repeatable tasks and retain accountable approval where risk requires it.

| User action | Automated work | Gate or result |
| --- | --- | --- |
| Open a pull request | Install locked dependencies; build; check types, behavior, authorization, and configuration | Readable results without production credentials |
| Validate development | Deploy reviewed code to the mapped development workspace; run smoke tests | App link and business acceptance checklist |
| Request production release | Resolve the tested commit and protected target; collect evidence and preview changes | Required business and technical approvals |
| Approve release | Deploy the approved commit with production identity and configuration | Health, SSO, data-access, and critical-flow verification |
| Finish deployment | Record commit, target IDs, run, checks, approver, and available app link | Verified success or failure notification to the support owner |

Resolve friendly environment labels through the protected mapping, not free-text workspace input or a developer's active deployment. Validate tenant, workspace, and app item IDs before mutation.

Serialize deployments by target across branches; don't cancel runs that might be applying schema changes. Deploy the tested commit with controlled configuration and recorded rebuild inputs, not moving branches or unpinned tooling.

### Protect deployment credentials and approvals

Preconfigure GitHub environments with scoped secrets, permitted branches, reviewers, and self-review restrictions where supported. Check [availability for your plan and repository](https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments). Use another controlled release path if required protections aren't available.

The documented flow uses a service principal and client secret. Limit target access, separate identities where needed, expose secrets only to trusted deployment jobs, and assign rotation and revocation owners. Use workload identity federation only after validating the Rayfin CLI authentication path; GitHub OIDC support alone isn't sufficient.

Minimize workflow token permissions and pin actions and reusable workflows to reviewed versions, using full commit SHAs for third-party actions. Never run untrusted pull request code with production secrets or privileged runners, including through `pull_request_target`.

Keep destructive schema overrides out of ordinary releases. Require qualified review, impact assessment, and tested recovery.

**Exit criterion:** A user can request a release without handling deployment credentials, and the workflow can't deploy an unapproved commit or arbitrary target.

## Phase 7: Pilot, operate, and expand

Pilot with a few business developers and low-risk apps. Observe setup, instruction-loading, and workflow problems. Test denied access and failed releases, not just success.

Set expansion thresholds for time to preview, independent onboarding, release failures, support volume, authorization results, and capacity use. Don't measure success by app count alone.

Before expanding:

- Assign monitoring and incident owners. Supplement [App Metrics](app-metrics.md) with required diagnostics and capacity monitoring.
- Test code and data recovery. Older code might not match the current schema; redeployment isn't a database restore, and deployments aren't necessarily atomic.
- Document how to stop releases, restrict access, revoke credentials, and recover data.
- Inventory apps, owners, repositories, template versions, workspaces, permissions, and identities.
- Schedule access reviews, updates, secret rotation, and preview reassessment.
- Plan retirement of apps, permissions, credentials, data, and capacity use.

**Exit criterion:** Your pilot meets the agreed business, usability, security, and support thresholds, and owners approve expansion.

## Organization readiness checklist

Use this checklist as a working review tool. Record the owner, the decision, and any exception or compensating control for each item. This checklist supports review; it doesn't certify compliance.

| Check | Owner |
| --- | --- |
| Define allowed use cases, prohibited uses, risk tiers, and acceptance criteria | Business or product owner |
| Confirm preview suitability, region, capacity, tenant enablement, and required licenses | Platform or administrator owner |
| Assign business, data, platform, release, and support owners | Program or delivery owner |
| Separate development and production targets and identities | Platform or engineering owner |
| Review app permissions, source permissions, sharing, and access-review cadence | Data or security owner |
| Approve versioned templates, minimal services, dependencies, and upgrade paths | Template or platform owner |
| Verify agent instruction loading and organization skills in each supported tool | Enablement or engineering owner |
| Approve AI providers, tools, MCP servers, data handling, and project access | Security or governance owner |
| Verify development setup with a representative business developer | Enablement or support owner |
| Enforce identity, approved redirects, protected hosting, and explicit data policies | Security or application owner |
| Test direct API access, cross-user record access, field visibility, writes, and function permissions | Technical or security owner |
| Keep secrets and restricted data out of prompts, source, frontend bundles, and logs | Security or compliance owner |
| Assess privacy, retention, residency, network requirements, and external service access | Compliance or security owner |
| Enforce repository reviews, required checks, protected configuration, and supply-chain controls | Repository or platform owner |
| Restrict deployment secrets, approve target mappings, and gate production releases | Release or operations owner |
| Verify business results, accessibility, error behavior, and post-deployment health | Business or application owner |
| Test code recovery, data recovery, incident response, and credential revocation | Operations or support owner |
| Establish capacity budgets, app inventory, maintenance, and retirement procedures | Platform or business owner |

## Related content

- [Author and share Fabric Apps templates](author-templates.md).
- [Skills for Microsoft Fabric](../fundamentals/skills-for-fabric-overview.md).
- [Deploy a Fabric app with GitHub Actions](deploy-github-actions.md).