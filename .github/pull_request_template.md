# Thank you for contributing to Microsoft Fabric documentation

## Fill out these items before submitting your pull request:

If you are working internally at Microsoft:
**Provide a link to an Azure DevOps Boards work item that tracks this feature/update.**

>
>

**Who is your primary Skilling team contact?** \@mention them individually tag them and let them review the PR before signing off.

>
>

## For internal Microsoft contributors, check off these quality control items as you go

- [ ] 1. **Check the Learn Authoring Assistant (LAA) report:** The Learn Authoring Assistant reviews changed content for grammar, style, branding and voice, then posts the results to the PR. Review the suggested edits from the **Files changed** tab and accept, modify, or reject each one, then batch and commit the approved changes. When all feedback is resolved, the LAA check shows a green checkmark at the bottom of the PR. LAA replaces the grammar review previously performed by Acrolinx.

- [ ] 2. **Successful build with no warnings or suggestions**: Review the build status to make sure **all files are green** (Succeeded).

- [ ] 3. **Preview the pages:**: Click each **Preview URL** link to view the rendered HTML pages on the review.learn.microsoft.com site to check the formatting and alignment of the page. Scan the page for overall formatting, and look at the parts you edited in detail.

- [ ] 4. **Check the Table of Contents:** If you are adding a new markdown file, make sure it is linked from the table of contents.

- [ ] 5. **#sign-off to request PR review and merge**: Once the pull request is finalized and ready to be merged, indicate so by typing `#sign-off` in a new comment in the Pull Request. If you need to cancel that sign-off, type `#hold-off` instead. *Signing off means the document can be published at any time.*

## Merge and publish

After you `#sign-off`, 
- PRs tagged with `qualifies-for-auto-merge` are merged automatically. For more information about how this label is applied, see [Pull request submission best practices](https://review.learn.microsoft.com/help/contribute/contribute-how-to-write-pull-request-etiquette?branch=main#in-a-hurry-submit-prs-that-can-be-accepted-automatically). 
- PRs tagged with `needs-human-review` are sent to the PR Review team for a formatting and standards review before merge. The PR Review team reviews the PR and describes any necessary feedback before merging. *This review only covers formatting and standards, not technical accuracy*.
    - The review team uses the comments section in the PR to provide feedback if changes are needed. Address any blocking issues in new commits to the PR.
    - Once all feedback is resolved, `#sign-off` again. The PR Review team re-reviews the content and, once it's approved, merges the pull request into the specified branch (usually the main branch or a release- branch).
- The main branch is merged into the live branch several times a day to publish new and changed content to the public learn.microsoft.com site. For publishing details, see [Publishing schedules for Fabric and Power BI repos](https://review.learn.microsoft.com/help/contribute/fabric/fabric-powerbi-publishing-schedules?branch=main).
