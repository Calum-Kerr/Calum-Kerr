const fs = require('fs');
const path = require('path');

const updateReadme = () => {
  const statsPath = path.join(__dirname, 'stats.json');
  const readmePath = path.join(__dirname, 'README.md');

  // Read the stats from stats.json
  let stats = {};
  if (fs.existsSync(statsPath)) {
    const statsData = fs.readFileSync(statsPath, 'utf-8');
    stats = JSON.parse(statsData);
  }

  // Read the current README file
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');

  // Update the Codespaces usage section
  const usageText = `Total Codespaces Usage: ${stats.hoursCoded || 0} hours`;
  const updatedContent = readmeContent.replace(
    /<!-- CODESPACES-START -->[\s\S]*<!-- CODESPACES-END -->/,
    `<!-- CODESPACES-START -->\n${usageText}\n<!-- CODESPACES-END -->`
  );

  // Write the updated content back to README.md
  fs.writeFileSync(readmePath, updatedContent);
  console.log('README.md updated successfully.');
};

// Run the update function
updateReadme();
