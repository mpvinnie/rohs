-- CreateTable
CREATE TABLE "subparts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gwi_11a1" TEXT NOT NULL,
    "fisp_msds" TEXT NOT NULL,
    "rohs_report" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "subgroup_id" TEXT NOT NULL,
    "part_id" TEXT,

    CONSTRAINT "subparts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subgroups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subgroups_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subgroups_name_key" ON "subgroups"("name");

-- AddForeignKey
ALTER TABLE "subparts" ADD CONSTRAINT "subparts_subgroup_id_fkey" FOREIGN KEY ("subgroup_id") REFERENCES "subgroups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subparts" ADD CONSTRAINT "subparts_part_id_fkey" FOREIGN KEY ("part_id") REFERENCES "parts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
