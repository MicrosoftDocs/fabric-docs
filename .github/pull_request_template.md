# Thank you for contributing to Microsoft Fabric documentation

## Fill out these items before submitting your pull request:

If you are working internally at Microsoft please: 
** Provide a link to an Azure DevOps work item that tracks this doc update.**
>

** Who is your primary documentation team contact?** \@mention them individually if you need their help.
>

## For internal contributors, check these off these quality control checklist items later on

- [ ] 1. **Successful build validation  with no warnings and no suggestions**: Review the build status to make sure **all files are green** (Succeeded). This applies even to public contributions.

- [ ] 2. **If you are working internally, check the Acrolinx report:** Make sure your Acrolinx score is **above 80 minimum** (higher is better) and with **0 spelling issues**. Acrolinx ensures we are providing consistent terminology and using an appropriate voice and tone.

- [ ] 3. **If you are working internally, preview your pages.**: Click each **Preview URL** link to view the rendered HTML pages on the review.learn.microsoft.com site to check the formatting and alignment of the page. Scan the page for overall formatting, and look at the parts you edited in detail.

- [ ] 4. **If you are adding a new markdown file, make sure it is linked from the table of contents.**: Add a new title and href in the toc.yml file for the folder to point to the new page.

- [ ] 5. **If you are working internally, once you're done, type `#sign-off` in the comments**: Once the pull request is finalized and ready to be merged, indicate so by typing `#sign-off` in a new comment in the Pull Request. If you need to cancel that sign-off, type `#hold-off` instead. *Signing off means the document can be published at any time.*


## Merge and publish
- After you `#sign-off`, there is a separate PR Review team that will review the PR and describe any necessary feedback before merging. 
- The PR review team will use the comments section in the PR to provide feedback if changes are needed. Address any blocking issues and sign off again to request another review.
- Once all feedback is resolved, you can `#sign-off` again. The PR Review team reviews and merges the pull request into the specified branch (usually the main branch or a release- branch).
- From the main branch, the change is merged into the live branch several times a day to publish it to the public learn.microsoft.com site.
