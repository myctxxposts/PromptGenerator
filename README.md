Updated content like Capitalized text, changed font, is not showing in the website. 
In index.html, at this line,  <script type="module" src="https://esm.sh/gh/myctxxposts/PromptGenerator@edb92c8/index.tsx?v=1717001122334"></script>
we had  <script type="module" src="https://esm.sh/gh/myctxxposts/PromptGenerator@main/index.tsx?v=1717001122334"></script> initially. This was pointing to very old commit. 
so picked up the latest commit which had all the new changes and used it in index.html as showed in second line. 

When you make any changes, run the build first. 
After successful build in github, copy that build id and replace it in index.html file, and rebuild again. 
T
