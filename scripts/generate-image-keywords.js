const { exec } = require("child_process");
const { promisify } = require("util");
const execAsync = promisify(exec);
const path = require("path");
const glob = require("glob");

// -keywords+="leaf,wood,autumn,tree" DSC_5615.jpg DSC_6009.jpg DSC_6076.jpg DSC_6111.jpg DSC_6114.jpg DSC_6130.jpg DSC_6139.jpg DSC_6172.jpg DSC_6339.jpg DSC_6357.jpg
// -keywords+="street,architecture" DSC_6996.jpg DSC_7365.jpg DSC_7696.jpg DSC_7771.jpg DSC_8118.jpg
// -keywords+="street,architecture" DSC_7889.jpg
// -keywords+="street" DSC_0069.jpg
// -keywords+="night" DSC_0069.jpg DSC_7785.jpg DSC_7771.jpg DSC_7853.jpg DSC_7889.jpg DSC_7998.jpg DSC_8118.jpg DSC_8119.jpg
// -keywords+="blue" DSC_6996.jpg

const keywordMapping = {
  landscape: ["20241112_0071.jpg"],
  street: [
    "DSC_6745.jpg",
    "DSC_6768.jpg",
    "DSC_6934.jpg",
    "DSC_7785.jpg",
    "DSC_7853.jpg",
    "DSC_7998.jpg",
    "DSC_8119.jpg",
  ],

  architecture: [
    "DSC_6745.jpg",
    "DSC_6768.jpg",
    "DSC_6934.jpg",
    "DSC_7785.jpg",
    "DSC_7853.jpg",
    "DSC_7998.jpg",
    "DSC_8119.jpg",
  ],

  bw: [
    "DSC_6745.jpg",
    "DSC_6768.jpg",
    "DSC_6934.jpg",
    "DSC_7785.jpg",
    "DSC_7853.jpg",
    "DSC_7998.jpg",
    "DSC_8119.jpg",
  ],

  blackandwhite: [
    "DSC_6745.jpg",
    "DSC_6768.jpg",
    "DSC_6934.jpg",
    "DSC_7785.jpg",
    "DSC_7853.jpg",
    "DSC_7998.jpg",
    "DSC_8119.jpg",
  ],
};

async function getExistingKeywords(imagePath) {
  try {
    const { stdout } = await execAsync(
      `gm identify -format %[IPTC:Keywords] "${imagePath}"`,
    );
    return stdout.trim();
  } catch (error) {
    // Return empty string if no keywords exist or if there's an error
    return "";
  }
}

async function addKeywords(imagePath, newKeywords) {
  try {
    // Get existing keywords
    const existing = await getExistingKeywords(imagePath);

    // Combine existing and new keywords
    const keywordArray = existing
      ? [...new Set([...existing.split(";"), ...newKeywords.split(";")])]
      : newKeywords.split(";");

    // Join keywords with semicolons
    const allKeywords = keywordArray.join(";");

    // Update the image with all keywords
    await execAsync(
      `gm mogrify -set "IPTC:Keywords" "${allKeywords}" "${imagePath}"`,
    );

    console.log(`Successfully updated keywords for ${imagePath}`);
    console.log(`Current keywords: ${allKeywords}`);
    return true;
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
    return false;
  }
}

async function processImages(pattern, keywords) {
  // Use glob to find all matching files
  const files = glob.sync(pattern);

  if (files.length === 0) {
    console.log("No matching files found");
    return;
  }

  console.log(`Found ${files.length} files to process`);

  for (const file of files) {
    await addKeywords(file, keywords);
  }
}

// Example usage
async function main() {
  if (process.argv.length < 4) {
    console.log("Usage: node script.js <file-pattern> <keywords>");
    console.log('Example: node script.js "*.jpg" "vacation;beach;summer"');
    process.exit(1);
  }

  const pattern = process.argv[2];
  const keywords = process.argv[3];

  await processImages(pattern, keywords);
}

main().catch(console.error);
