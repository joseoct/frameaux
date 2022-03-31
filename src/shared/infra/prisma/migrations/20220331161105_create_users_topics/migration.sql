-- AlterTable
ALTER TABLE "alternatives" ADD CONSTRAINT "alternatives_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "sequencies" ADD CONSTRAINT "sequencies_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "users_topics" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "topic_id" TEXT NOT NULL,
    "current_difficulty" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_topics_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_topics" ADD CONSTRAINT "users_topics_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_topics" ADD CONSTRAINT "users_topics_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE CASCADE ON UPDATE CASCADE;
