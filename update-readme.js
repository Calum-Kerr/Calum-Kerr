const fs = require('fs');
const { Octokit } = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getCodespacesUsage() {
  const { data } = await octokit.request('GET /user/codespaces', {
    per_page: 100
  });

  let totalHours = 0;
  data.forEach(codespace => {
    totalHours += codespace.usage_hours;
  });

  return totalHours;
}

async function updateReadme() {
  const totalHours = await getCodespacesUsage();
  
  const readmeContent = fs.readFileSync('README.md', 'utf8');
  const newContent = readmeContent.replace(/<!-- CODESPACES-START -->.*<!-- CODESPACES-END -->/, `<!-- CODESPACES-START -->\nTotal Codespaces Usage: ${totalHours} hours\n<!-- CODESPACES-END -->`);

  fs.writeFileSync('README.md', newContent);
}

updateReadme();
