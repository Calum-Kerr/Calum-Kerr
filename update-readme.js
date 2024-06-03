const fs = require('fs');
const path = require('path');

// Function to get current timestamp in seconds
const getCurrentTimestamp = () => Math.floor(Date.now() / 1000);

const updateReadme = () => {
  const statsPath = path.join(__dirname, 'stats.json');
  const readmePath = path.join(__dirname, 'README.md');

  // Read the stats from stats.json
  let stats = {};
  if (fs.existsSync(statsPath)) {
    const statsData = fs.readFileSync(statsPath, 'utf-8');
    stats = JSON.parse(statsData);
  } else {
    stats.hoursCoded = 0;
    stats.startTime = null;
  }

  // If startTime is null, set it to current time
  if (!stats.startTime) {
    stats.startTime = getCurrentTimestamp();
  }

  // Calculate the time difference since last update
  const currentTime = getCurrentTimestamp();
  const timeDifference = (currentTime - stats.startTime) / 3600; // Convert seconds to hours

  // Update hoursCoded
  stats.hoursCoded += timeDifference;
  stats.startTime = currentTime;

  // Write back the updated stats
  fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));

  // Read the current README file
  let readmeContent = fs.readFileSync(readmePath, 'utf-8');

  // Update the Codespaces usage section
  const usageText = `Total Codespaces Usage: ${stats.hoursCoded.toFixed(2)} hours`;
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
