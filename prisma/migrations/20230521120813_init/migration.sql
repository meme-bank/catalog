/*
  Warnings:

  - A unique constraint covering the columns `[link]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_link_key" ON "Post"("link");
