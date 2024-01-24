-- DropForeignKey
ALTER TABLE "companies" DROP CONSTRAINT "companies_company_setting_id_fkey";

-- AlterTable
ALTER TABLE "companies" ALTER COLUMN "company_setting_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_company_setting_id_fkey" FOREIGN KEY ("company_setting_id") REFERENCES "company_appointment_settings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
