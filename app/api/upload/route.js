import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { v2 as cloudinary } from "cloudinary";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "interseas";

    if (!file)
      return NextResponse.json({ error: "Fichier requis" }, { status: 400 });

    // 1. Initialisation explicite de la configuration
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    // 2. Conversion du fichier en Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // 3. 🚀 SÉCURISATION DU NOM : On génère un identifiant unique basé sur le timestamp
    // Cela élimine définitivement les erreurs de signature liées aux tirets (-) et espaces.
    const uniqueFileName = `img_${Date.now()}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: folder,
      public_id: uniqueFileName, // Impose le nom nettoyé à Cloudinary
      resource_type: "image",
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (err) {
    console.error("Upload error détaillé :", err);
    return NextResponse.json({ error: "Erreur upload" }, { status: 500 });
  }
}
