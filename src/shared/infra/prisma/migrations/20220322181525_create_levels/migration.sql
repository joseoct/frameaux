-- CreateTable
CREATE TABLE "levels" (
    "id" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "topic_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "levels" ADD CONSTRAINT "levels_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
