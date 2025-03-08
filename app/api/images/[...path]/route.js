import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { path } = await params;
  const imagePath = path.join("/");

  // Create a URL for Cloudinary with the correct prefix
  const cloudinaryUrl = `https://res.cloudinary.com/dajqzcvvm/image/upload/lansot/images/${imagePath}`;

  try {
    // Redirect the request to Cloudinary
    const imageRes = await fetch(cloudinaryUrl);

    if (!imageRes.ok) {
      console.error(`Failed to fetch image: ${cloudinaryUrl}, status: ${imageRes.status}`);
      return new NextResponse(null, { status: imageRes.status });
    }

    // Get the image data
    const imageBuffer = await imageRes.arrayBuffer();

    // Determine the content type
    let contentType = imageRes.headers.get("content-type");
    // For SVG files, sometimes you need to explicitly specify the type
    if (
      imagePath.endsWith(".svg") &&
      (!contentType || contentType === "application/octet-stream")
    ) {
      contentType = "image/svg+xml";
    }

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Image proxy error:", error);
    return new NextResponse(null, { status: 500 });
  }
}
