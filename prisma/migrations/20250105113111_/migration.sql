-- CreateTable
CREATE TABLE `Customer` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `Customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerDetails` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `role` ENUM('USER', 'STAFF', 'ADMIN') NOT NULL DEFAULT 'USER',
    `currency` ENUM('AUD', 'USD', 'EUR', 'RUB') NOT NULL DEFAULT 'USD',
    `two_step_type` ENUM('GOOGLE', 'TELEGRAM', 'EMAIL', 'OFF') NOT NULL DEFAULT 'OFF',
    `registration_type` ENUM('REFERAL', 'PROMO', 'DEFAULT', 'CREATED_BY_STAFF') NOT NULL DEFAULT 'DEFAULT',
    `promocode` VARCHAR(191) NOT NULL,
    `referal_link` VARCHAR(191) NOT NULL,
    `activation_link` VARCHAR(191) NOT NULL,
    `kyc` BOOLEAN NOT NULL DEFAULT false,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReferalLink` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,
    `used_times` SMALLINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerParams` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `is_banned` BOOLEAN NOT NULL DEFAULT false,
    `swap_ban` BOOLEAN NOT NULL DEFAULT false,
    `internal_ban` BOOLEAN NOT NULL DEFAULT false,
    `chat_ban` BOOLEAN NOT NULL DEFAULT false,
    `is_activated` BOOLEAN NOT NULL DEFAULT false,
    `is_premium` BOOLEAN NOT NULL DEFAULT false,
    `kyc_status` BOOLEAN NOT NULL DEFAULT false,
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerKYC` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `second_name` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `zip_code` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `house` SMALLINT UNSIGNED NOT NULL,
    `room_number` SMALLINT UNSIGNED NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,
    `documents_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KycDocuments` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `frontSide` VARCHAR(191) NOT NULL,
    `backSide` VARCHAR(191) NOT NULL,
    `selfie` VARCHAR(191) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerTwoStep` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` ENUM('GOOGLE', 'TELEGRAM', 'EMAIL', 'OFF') NOT NULL DEFAULT 'OFF',
    `telegram_id` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `enable_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `secret_outpath` VARCHAR(191) NOT NULL DEFAULT '',
    `secret_base32` VARCHAR(191) NOT NULL DEFAULT '',
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TwoStepCodeList` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `expiredDate` TIMESTAMP(6) NOT NULL,
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActionLog` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NOT NULL,
    `request_city` VARCHAR(191) NULL,
    `country_name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `browser` VARCHAR(191) NOT NULL,
    `action` VARCHAR(500) NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promocode` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(191) NOT NULL,
    `value` DOUBLE NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,
    `message_text` VARCHAR(191) NOT NULL,
    `coin_name` ENUM('btc', 'eth', 'trx', 'ton') NOT NULL,

    UNIQUE INDEX `Promocode_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UsedPromocodes` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` BIGINT UNSIGNED NOT NULL,
    `used_by` BIGINT UNSIGNED NOT NULL,
    `used_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IpMatchList` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `ip_address` VARCHAR(191) NOT NULL,
    `browser` VARCHAR(191) NOT NULL,
    `logged_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WithdrawalHistory` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(150) NOT NULL,
    `crypto_amount` DOUBLE NOT NULL,
    `fiat_amount` DOUBLE NOT NULL,
    `status` ENUM('pending', 'success', 'rejected') NOT NULL,
    `coin_name` ENUM('btc', 'eth', 'trx', 'ton') NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DepositHistory` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `address` VARCHAR(150) NOT NULL,
    `crypto_amount` DOUBLE NOT NULL,
    `fiat_amount` DOUBLE NOT NULL,
    `status` ENUM('pending', 'success', 'rejected') NOT NULL,
    `coin_name` ENUM('btc', 'eth', 'trx', 'ton') NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InternalHistory` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `payer_email` VARCHAR(191) NOT NULL,
    `payee_email` VARCHAR(191) NOT NULL,
    `payer_id` BIGINT UNSIGNED NOT NULL,
    `payee_id` BIGINT UNSIGNED NOT NULL,
    `crypto_amount` DOUBLE NOT NULL,
    `fiat_amount` DOUBLE NOT NULL,
    `peyer_address` VARCHAR(150) NOT NULL,
    `payee_address` VARCHAR(150) NOT NULL,
    `transfer_type` BOOLEAN NOT NULL,
    `status` ENUM('pending', 'success', 'rejected') NOT NULL,
    `coin_name` ENUM('btc', 'eth', 'trx', 'ton') NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `customer_id` BIGINT UNSIGNED NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SwapHistory` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `customer_id` BIGINT UNSIGNED NOT NULL,
    `ctypto_amount_from` DOUBLE NOT NULL,
    `ctypto_amount_to` DOUBLE NOT NULL,
    `fiat_amount_from` DOUBLE NOT NULL,
    `fiat_amount_to` DOUBLE NOT NULL,
    `status` ENUM('pending', 'success', 'rejected') NOT NULL,
    `coin_name_from` ENUM('btc', 'eth', 'trx', 'ton') NOT NULL,
    `coin_name_to` ENUM('btc', 'eth', 'trx', 'ton') NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TradingOrder` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `customer_id` BIGINT UNSIGNED NOT NULL,
    `coin_name` ENUM('btc', 'eth', 'trx', 'ton') NOT NULL,
    `coin_rate` DOUBLE NOT NULL,
    `crypto_amount` DOUBLE NOT NULL,
    `fiat_amount` DOUBLE NOT NULL,
    `order_status` ENUM('pending', 'success', 'canceled') NOT NULL,
    `order_type` ENUM('BUY', 'SELL', 'CANCEL') NOT NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CustomerDetails` ADD CONSTRAINT `CustomerDetails_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReferalLink` ADD CONSTRAINT `ReferalLink_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerParams` ADD CONSTRAINT `CustomerParams_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerKYC` ADD CONSTRAINT `CustomerKYC_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerKYC` ADD CONSTRAINT `CustomerKYC_documents_id_fkey` FOREIGN KEY (`documents_id`) REFERENCES `KycDocuments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `KycDocuments` ADD CONSTRAINT `KycDocuments_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerTwoStep` ADD CONSTRAINT `CustomerTwoStep_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TwoStepCodeList` ADD CONSTRAINT `TwoStepCodeList_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActionLog` ADD CONSTRAINT `ActionLog_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promocode` ADD CONSTRAINT `Promocode_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsedPromocodes` ADD CONSTRAINT `UsedPromocodes_used_by_fkey` FOREIGN KEY (`used_by`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UsedPromocodes` ADD CONSTRAINT `UsedPromocodes_code_fkey` FOREIGN KEY (`code`) REFERENCES `Promocode`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IpMatchList` ADD CONSTRAINT `IpMatchList_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WithdrawalHistory` ADD CONSTRAINT `WithdrawalHistory_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DepositHistory` ADD CONSTRAINT `DepositHistory_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InternalHistory` ADD CONSTRAINT `InternalHistory_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SwapHistory` ADD CONSTRAINT `SwapHistory_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TradingOrder` ADD CONSTRAINT `TradingOrder_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
