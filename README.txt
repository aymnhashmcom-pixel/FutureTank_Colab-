FutureTank — Static site package
- Upload the contents of this ZIP to the root of your GitHub Pages repository (branch: main)
- Public view: index.html, assistant.html, billing.html (if you link to it)
- Admin only: dashboard.html (access locally with password Future2025 -> it stores edits in browser localStorage)
Notes:
- Data is stored in localStorage key 'ft_db'. Use dashboard.html to edit locally.
- Assistant reads from ft_db and will include company name / phone / products / services automatically.
- To hide admin pages from the public navigation, remove links from index.html (they are not linked by default).
