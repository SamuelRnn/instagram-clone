/*
  Warnings:

  - A unique constraint covering the columns `[id_post,id_user]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Like_id_post_id_user_key` ON `Like`(`id_post`, `id_user`);
