/*
  Warnings:

  - A unique constraint covering the columns `[crm]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `User_crm_key` ON `User`(`crm`);

-- CreateIndex
CREATE UNIQUE INDEX `User_cpf_key` ON `User`(`cpf`);
