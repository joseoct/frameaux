-- CreateTable
CREATE TABLE "users_technologies" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "technology_id" TEXT NOT NULL,
    "current_layer" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_technologies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_technologies" ADD CONSTRAINT "users_technologies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_technologies" ADD CONSTRAINT "users_technologies_technology_id_fkey" FOREIGN KEY ("technology_id") REFERENCES "technologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
