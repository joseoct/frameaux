-- CreateTable
CREATE TABLE "users_tecnologies" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tecnology_id" TEXT NOT NULL,
    "current_layer" INTEGER NOT NULL,
    "role_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_tecnologies_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users_tecnologies" ADD CONSTRAINT "users_tecnologies_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_tecnologies" ADD CONSTRAINT "users_tecnologies_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_tecnologies" ADD CONSTRAINT "users_tecnologies_tecnology_id_fkey" FOREIGN KEY ("tecnology_id") REFERENCES "tecnologies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
