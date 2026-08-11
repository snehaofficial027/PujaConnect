const cloudinary = require("./config/cloudinary");
const fs = require("fs");
const path = require("path");

async function testUpload() {
  try {
    console.log("=================================");
    console.log("CLOUDINARY UPLOAD TEST START");
    console.log("=================================");

    const imagePath = path.join(
      __dirname,
      "../client/public/images/pandits/1786419996919.jpg"
    );

    console.log("Image path:", imagePath);
    console.log("Image exists:", fs.existsSync(imagePath));

    if (!fs.existsSync(imagePath)) {
      throw new Error("Test image not found!");
    }

    const result = await cloudinary.uploader.upload(imagePath, {
      folder: "pujaconnect/pujas",
      resource_type: "image",
    });

    console.log("=================================");
    console.log("CLOUDINARY IMAGE UPLOAD SUCCESS");
    console.log("URL:", result.secure_url);
    console.log("Public ID:", result.public_id);
    console.log("=================================");
  } catch (error) {
    console.log("=================================");
    console.log("CLOUDINARY IMAGE UPLOAD FAILED");
    console.log("Message:", error.message);
    console.log("HTTP Code:", error.http_code);
    console.log("Name:", error.name);
    console.log("Full Error:", error);
    console.log("=================================");
  }
}

testUpload();