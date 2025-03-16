import fs from "fs/promises";
import path from "path";
import gm from "gm";

const inPath = "../src/assets/photos/thumbnails";
const outPath = "./metadata";

function mapMetadata(metadata) {
  return {
    cameraModel: metadata["Profile-EXIF"].Model,
    focalLength: metadata["Profile-EXIF"]["Focal Length"],
    postProcessing: metadata["Profile-EXIF"].Software,
    dateTimePostProcessing: metadata["Profile-EXIF"]["Date Time"],
    dateTimeOriginal: metadata["Profile-EXIF"]["Date Time Digitized"],
    copyright: metadata["Profile-EXIF"].Copyright,
    author: "Decio Battaglia",
  };
}

async function processImageMetadata() {
  try {
    const files = await fs.readdir(inPath);

    for (const file of files) {
      const filePath = path.join(inPath, file);

      try {
        const metadata = await new Promise((resolve, reject) => {
          gm(filePath).identify((err, data) => {
            if (err) reject(err);
            else resolve(mapMetadata(data));
            //else resolve(data);
          });
        });

        const metadataFilePath = path.join(
          outPath,
          `${path.parse(file).name.slice(10)}.json`,
        );
        await fs.writeFile(
          metadataFilePath,
          JSON.stringify(metadata, null, 2),
          { flag: "w" },
        );
      } catch (processError) {
        console.error(`Error processing ${file}: ${processError}`);
      }
    }
  } catch (err) {
    console.error("Unable to scan directory: " + err);
  }
}

processImageMetadata();
