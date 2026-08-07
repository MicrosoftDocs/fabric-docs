---
ms.date: 08/06/2026
ms.topic: include
---

- Permission to access the Fabric workspace and perform the operations you request.
- **An AI coding tool**, such as [GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/use-copilot-for-common-tasks/use-copilot-in-the-cli), [Claude Code](https://docs.anthropic.com/claude/docs/claude-code), [Visual Studio Code](https://code.visualstudio.com/), Cursor, Windsurf, or another `AGENTS.md` compatible tool.
- **[Node.js](https://nodejs.org/)**: Required for the standalone GitHub Copilot CLI, which installs as an npm package (`npm install -g @github/copilot`). For full setup steps, see [Set up GitHub Copilot CLI](https://docs.github.com/copilot/how-tos/set-up/set-up-for-self).
- **[PowerShell 7](/powershell/scripting/install/installing-powershell)**: Required for GitHub Copilot CLI. Verify with `pwsh --version`.
- **[Git](https://git-scm.com/downloads)**: Required to clone skill repositories for tools that don't use the plugin marketplace.
- **[Azure CLI](/cli/azure/install-azure-cli)**: Most Fabric operations require Azure authentication. After installing, sign in with `az login`.