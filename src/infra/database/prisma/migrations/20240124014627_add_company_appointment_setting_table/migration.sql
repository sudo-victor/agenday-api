/*
  Warnings:

  - A unique constraint covering the columns `[company_setting_id]` on the table `companies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `company_setting_id` to the `companies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "company_setting_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "company_appointment_settings" (
    "id" TEXT NOT NULL,
    "days_of_week" TEXT NOT NULL,
    "schedule_interval_in_min" INTEGER NOT NULL,
    "start_business_hour_in_min" INTEGER NOT NULL,
    "end_business_hour_in_min" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "cancellation_policy_hour_in_min" INTEGER NOT NULL,

    CONSTRAINT "company_appointment_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_company_setting_id_key" ON "companies"("company_setting_id");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_company_setting_id_fkey" FOREIGN KEY ("company_setting_id") REFERENCES "company_appointment_settings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
