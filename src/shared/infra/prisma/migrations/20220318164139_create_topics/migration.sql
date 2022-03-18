-- CreateTable
CREATE TABLE "topics" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "tecnology_id" TEXT NOT NULL,
    "layer" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "topics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "topics_name_key" ON "topics"("name");

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_tecnology_id_fkey" FOREIGN KEY ("tecnology_id") REFERENCES "tecnologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
