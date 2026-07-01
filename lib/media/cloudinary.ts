import { v2 as cloudinary, ConfigOptions } from "cloudinary";

/**
 * Zaid Systems — Cloudinary Media Service
 * Provides signed uploads and optimized CDN URL generation.
 */

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const mediaService = {
  /**
   * Generate a signed upload signature for secure client-side uploads.
   */
  generateSignature(folder: string = "general") {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );
    return { timestamp, signature, folder };
  },

  /**
   * Get an optimized URL with automatic format and quality.
   */
  getOptimizedUrl(publicId: string, options: Partial<ConfigOptions> = {}) {
    return cloudinary.url(publicId, {
      fetch_format: "auto",
      quality: "auto",
      secure: true,
      ...options,
    });
  },

  /**
   * Delete an asset from Cloudinary.
   */
  async deleteAsset(publicId: string) {
    try {
      return await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("❌ [Cloudinary] Deletion failed:", error);
      throw error;
    }
  }
};
