/*
  Warnings:

  - You are about to drop the column `kyc` on the `CustomerDetails` table. All the data in the column will be lost.
  - You are about to drop the column `promocode` on the `CustomerDetails` table. All the data in the column will be lost.
  - You are about to drop the column `referal_link` on the `CustomerDetails` table. All the data in the column will be lost.
  - You are about to drop the column `chat_ban` on the `CustomerParams` table. All the data in the column will be lost.
  - You are about to drop the column `internal_ban` on the `CustomerParams` table. All the data in the column will be lost.
  - You are about to drop the column `kyc_status` on the `CustomerParams` table. All the data in the column will be lost.
  - You are about to drop the column `swap_ban` on the `CustomerParams` table. All the data in the column will be lost.
  - You are about to drop the `ActionLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DepositHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InternalHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IpMatchList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Promocode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SwapHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TradingOrder` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsedPromocodes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WithdrawalHistory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `document_type` to the `CustomerKYC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `CustomerKYC` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ActionLog` DROP FOREIGN KEY `ActionLog_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `DepositHistory` DROP FOREIGN KEY `DepositHistory_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `InternalHistory` DROP FOREIGN KEY `InternalHistory_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `IpMatchList` DROP FOREIGN KEY `IpMatchList_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `Promocode` DROP FOREIGN KEY `Promocode_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `SwapHistory` DROP FOREIGN KEY `SwapHistory_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `TradingOrder` DROP FOREIGN KEY `TradingOrder_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `UsedPromocodes` DROP FOREIGN KEY `UsedPromocodes_code_fkey`;

-- DropForeignKey
ALTER TABLE `UsedPromocodes` DROP FOREIGN KEY `UsedPromocodes_used_by_fkey`;

-- DropForeignKey
ALTER TABLE `WithdrawalHistory` DROP FOREIGN KEY `WithdrawalHistory_customer_id_fkey`;

-- AlterTable
ALTER TABLE `CustomerDetails` DROP COLUMN `kyc`,
    DROP COLUMN `promocode`,
    DROP COLUMN `referal_link`;

-- AlterTable
ALTER TABLE `CustomerKYC` ADD COLUMN `document_type` ENUM('DRIVING_LICENCE', 'PASSPORT', 'ID_CARD') NOT NULL,
    ADD COLUMN `province` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('SUCCESS', 'PENDING', 'REJECTED') NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `CustomerParams` DROP COLUMN `chat_ban`,
    DROP COLUMN `internal_ban`,
    DROP COLUMN `kyc_status`,
    DROP COLUMN `swap_ban`,
    ADD COLUMN `is_chat_ban` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_kyc` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `ActionLog`;

-- DropTable
DROP TABLE `DepositHistory`;

-- DropTable
DROP TABLE `InternalHistory`;

-- DropTable
DROP TABLE `IpMatchList`;

-- DropTable
DROP TABLE `Promocode`;

-- DropTable
DROP TABLE `SwapHistory`;

-- DropTable
DROP TABLE `TradingOrder`;

-- DropTable
DROP TABLE `UsedPromocodes`;

-- DropTable
DROP TABLE `WithdrawalHistory`;

-- CreateIndex
CREATE INDEX `Customer_id_idx` ON `Customer`(`id`);

-- RenameIndex
ALTER TABLE `CustomerDetails` RENAME INDEX `CustomerDetails_customer_id_fkey` TO `CustomerDetails_customer_id_idx`;

-- RenameIndex
ALTER TABLE `CustomerParams` RENAME INDEX `CustomerParams_customer_id_fkey` TO `CustomerParams_customer_id_idx`;
