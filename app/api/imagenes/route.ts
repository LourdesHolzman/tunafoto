import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder");

  if (!folder) return NextResponse.json([]);

  try {
    const result = await cloudinary.search
      .expression(`folder:${folder}`)
      .sort_by("created_at", "desc")
      .max_results(50)
      .execute();

   const images = result.resources.map((img: { secure_url: string }) =>
  img.secure_url.replace("/upload/", "/upload/f_auto,q_auto/")
);

    return NextResponse.json(images);
  } catch (error) {
    console.error(error);
    return NextResponse.json([]);
  }
}
