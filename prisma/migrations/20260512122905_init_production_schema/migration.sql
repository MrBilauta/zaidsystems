-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'UNPUBLISH', 'RESTORE', 'LOGIN', 'LOGOUT', 'SECURITY_EVENT');

-- CreateEnum
CREATE TYPE "SecurityEventType" AS ENUM ('FAILED_LOGIN', 'SUSPICIOUS_IP', 'RATE_LIMIT_HIT', 'UNAUTHORIZED_ACCESS', 'PROMPT_INJECTION_DETECTED', 'UPLOAD_VIOLATION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "avatarUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "scheduledAt" TIMESTAMP(3),
    "featuredAt" TIMESTAMP(3),
    "category" TEXT NOT NULL,
    "tags" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "authorId" TEXT,
    "authorName" TEXT NOT NULL DEFAULT 'Mohammed Zaid Khan',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogImage" TEXT,
    "canonicalUrl" TEXT,
    "faqData" JSONB,
    "schemaData" JSONB,
    "deletedAt" TIMESTAMP(3),
    "organizationId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revision" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "status" "PostStatus" NOT NULL,
    "authorId" TEXT,
    "label" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Revision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "image" TEXT,
    "githubUrl" TEXT,
    "liveUrl" TEXT,
    "techStack" TEXT[],
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "siteName" TEXT,
    "siteDescription" TEXT,
    "siteUrl" TEXT,
    "ogImage" TEXT,
    "heroTitle" TEXT,
    "heroSubtitle" TEXT,
    "heroCtaText" TEXT,
    "heroCtaLink" TEXT,
    "heroSecondaryText" TEXT,
    "heroSecondaryLink" TEXT,
    "socialLinks" JSONB,
    "visibility" JSONB,
    "navbarLinks" JSONB,
    "footerNote" TEXT,
    "gaMeasurementId" TEXT,
    "robotsTxt" TEXT,
    "customHead" TEXT,
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "authorName" TEXT,
    "authorRole" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "updatedBy" TEXT,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "resourceType" TEXT NOT NULL,
    "resourceId" TEXT,
    "resourceName" TEXT,
    "actorId" TEXT,
    "actorEmail" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "previousData" JSONB,
    "newData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityEvent" (
    "id" TEXT NOT NULL,
    "type" "SecurityEventType" NOT NULL,
    "severity" TEXT NOT NULL DEFAULT 'LOW',
    "actorId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "path" TEXT,
    "details" JSONB,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecurityEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiUsage" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "tokensUsed" INTEGER NOT NULL DEFAULT 0,
    "model" TEXT NOT NULL,
    "prompt" TEXT,
    "output" TEXT,
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "windowStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalyticsSnapshot" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "period" TEXT NOT NULL,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "uniqueVisitors" INTEGER NOT NULL DEFAULT 0,
    "avgSessionTime" INTEGER NOT NULL DEFAULT 0,
    "bounceRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "avgPosition" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "gptbotVisits" INTEGER NOT NULL DEFAULT 0,
    "perplexitybotVisits" INTEGER NOT NULL DEFAULT 0,
    "claudebotVisits" INTEGER NOT NULL DEFAULT 0,
    "googleExtended" INTEGER NOT NULL DEFAULT 0,
    "lighthouseScore" INTEGER,
    "p75Lcp" DOUBLE PRECISION,
    "p75Fid" DOUBLE PRECISION,
    "p75Cls" DOUBLE PRECISION,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnalyticsSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "cdnUrl" TEXT,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "tags" TEXT[],
    "folder" TEXT NOT NULL DEFAULT 'general',
    "uploadedBy" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromptTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "systemPrompt" TEXT NOT NULL,
    "userPromptTemplate" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "model" TEXT NOT NULL DEFAULT 'gpt-4o',
    "maxTokens" INTEGER NOT NULL DEFAULT 2000,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromptTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "keyHash" TEXT NOT NULL,
    "prefix" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scopes" TEXT[],
    "lastUsedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_clerkId_idx" ON "User"("clerkId");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_slug_idx" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_status_idx" ON "Post"("status");

-- CreateIndex
CREATE INDEX "Post_deletedAt_idx" ON "Post"("deletedAt");

-- CreateIndex
CREATE INDEX "Post_organizationId_idx" ON "Post"("organizationId");

-- CreateIndex
CREATE INDEX "Revision_postId_idx" ON "Revision"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "Project_deletedAt_idx" ON "Project"("deletedAt");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");

-- CreateIndex
CREATE INDEX "AuditLog_resourceType_resourceId_idx" ON "AuditLog"("resourceType", "resourceId");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "SecurityEvent_type_idx" ON "SecurityEvent"("type");

-- CreateIndex
CREATE INDEX "SecurityEvent_severity_idx" ON "SecurityEvent"("severity");

-- CreateIndex
CREATE INDEX "SecurityEvent_createdAt_idx" ON "SecurityEvent"("createdAt");

-- CreateIndex
CREATE INDEX "AiUsage_userId_windowStart_idx" ON "AiUsage"("userId", "windowStart");

-- CreateIndex
CREATE INDEX "AnalyticsSnapshot_period_date_idx" ON "AnalyticsSnapshot"("period", "date");

-- CreateIndex
CREATE INDEX "Media_mimeType_idx" ON "Media"("mimeType");

-- CreateIndex
CREATE INDEX "Media_deletedAt_idx" ON "Media"("deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PromptTemplate_name_key" ON "PromptTemplate"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_keyHash_key" ON "ApiKey"("keyHash");

-- CreateIndex
CREATE INDEX "ApiKey_keyHash_idx" ON "ApiKey"("keyHash");

-- CreateIndex
CREATE INDEX "ApiKey_userId_idx" ON "ApiKey"("userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revision" ADD CONSTRAINT "Revision_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityEvent" ADD CONSTRAINT "SecurityEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiUsage" ADD CONSTRAINT "AiUsage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
