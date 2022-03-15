-- CreateTable
CREATE TABLE "tecnologies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tecnology_image" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tecnologies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tecnologies_name_key" ON "tecnologies"("name");
