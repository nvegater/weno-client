-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('Basic', 'Medium', 'Pro');

-- CreateEnum
CREATE TYPE "WineGrapeEnum" AS ENUM ('Aglianico', 'Barbera', 'Brunello', 'Cabernet Franc', 'Cabernet Sauvignon', 'Carignan', 'Chardonnay', 'Chenin Blanc', 'Cinsaul', 'Colombard', 'Gewurztraminer', 'Grenache', 'Grenache Blanc', 'Malbec', 'Malvasia Blanca', 'Malvasia Tinta', 'Merlot', 'Mision', 'Montepulciano', 'Moscatel', 'Mourvedre', 'Nebbiolo', 'Palomino', 'Petite Verdot', 'Pinot Blanc', 'Pinot Gris', 'Pinot Noir', 'Riesling', 'Rubi Cabernet', 'Sangiovese', 'Sauvignon Blanc', 'Semillon', 'Sinsault', 'Syrah', 'Tempranillo', 'Viognier', 'Zinfandel', 'Other');

-- CreateEnum
CREATE TYPE "ProductionTypeEnum" AS ENUM ('Comercial', 'Tradicional - Artesanal', 'Orgánico / Biodinámica / Naturales');

-- CreateEnum
CREATE TYPE "WineTypeEnum" AS ENUM ('Blanco', 'Blanco con barrica', 'Rosado', 'Tinto crianza', 'Tinto reserva', 'Tinto gran Reserva', 'Generoso / Fortificado', 'Espumoso', 'Cosecha Tardía', 'Conmemorativos / Edición limitada', 'Orgánico', 'Biodinámico', 'Otro');

-- CreateEnum
CREATE TYPE "WineryAmenityEnum" AS ENUM ('Terraza al aire libre', 'Degustación de vinos', 'Recorridos en viñedos', 'Recorridos en bodega', 'Paseo en carreta', 'Visita la cava de barricas', 'Cata de barricas', 'Crea tu mezcla de vino', 'Talleres didácticos', 'Catas maridajes', 'Catas privadas', 'Actividades en viñedo');

-- CreateEnum
CREATE TYPE "LanguagesEnum" AS ENUM ('Inglés', 'Español', 'Lenguage de señas mexicanas', 'Francés', 'Alemán', 'Italian', 'Portugués', 'Japanese', 'Mandarín');

-- CreateEnum
CREATE TYPE "WineryOtherServicesEnum" AS ENUM ('Hospedaje', 'Restaurante', 'Barra de Alimentos (Tapas)');

-- CreateEnum
CREATE TYPE "ValleyEnum" AS ENUM ('Guadalupe', 'San Antonio de las Minas', 'Ensenada', 'Santo Tomas', 'Ojos Negros', 'La Grulla', 'San Vicente', 'San Quintín', 'Calafia');

-- CreateEnum
CREATE TYPE "ExperienceTypeEnum" AS ENUM ('pairing', 'degustation', 'concert');

-- CreateEnum
CREATE TYPE "SlotTypeEnum" AS ENUM ('oneTime', 'recurrent', 'allDay');

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "stripeId" TEXT NOT NULL,
    "subscription" "Subscription",

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WineGrape" (
    "id" SERIAL NOT NULL,
    "wineryId" INTEGER NOT NULL,
    "wineGrape" "WineGrapeEnum" NOT NULL,

    CONSTRAINT "WineGrape_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WineProductionType" (
    "id" SERIAL NOT NULL,
    "wineryId" INTEGER NOT NULL,
    "productionType" "ProductionTypeEnum" NOT NULL,

    CONSTRAINT "WineProductionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WineType" (
    "id" SERIAL NOT NULL,
    "wineryId" INTEGER NOT NULL,
    "wineType" "WineTypeEnum" NOT NULL,

    CONSTRAINT "WineType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WineryAmenity" (
    "id" SERIAL NOT NULL,
    "wineryId" INTEGER NOT NULL,
    "amenity" "WineryAmenityEnum" NOT NULL,

    CONSTRAINT "WineryAmenity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WineryLanguage" (
    "id" SERIAL NOT NULL,
    "wineryId" INTEGER NOT NULL,
    "languages" "LanguagesEnum" NOT NULL,

    CONSTRAINT "WineryLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WineryOtherServices" (
    "id" SERIAL NOT NULL,
    "wineryId" INTEGER NOT NULL,
    "OtherServices" "WineryOtherServicesEnum" NOT NULL,

    CONSTRAINT "WineryOtherServices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Winery" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "urlAlias" TEXT NOT NULL,
    "creatorUsername" TEXT NOT NULL,
    "creatorEmail" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "valley" "ValleyEnum" NOT NULL,
    "foundationYear" INTEGER,
    "googleMapsUrl" TEXT,
    "yearlyWineProduction" INTEGER,
    "contactEmail" TEXT,
    "contactPhoneNumber" TEXT,
    "logo" TEXT,
    "contactName" TEXT,
    "productRegion" TEXT,
    "postalAddress" TEXT,
    "architecturalReferences" BOOLEAN,
    "younerFriendly" BOOLEAN,
    "petFriendly" BOOLEAN,
    "enologoName" TEXT,
    "handicappedFriendly" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "Winery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WineryImage" (
    "id" SERIAL NOT NULL,
    "wineryId" INTEGER NOT NULL,
    "wineryAlias" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "coverPage" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WineryImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceImage" (
    "id" SERIAL NOT NULL,
    "experienceId" INTEGER NOT NULL,
    "imageName" TEXT NOT NULL,
    "coverPage" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperienceImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Experience" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "experienceType" "ExperienceTypeEnum" NOT NULL,
    "allAttendeesAllSlots" INTEGER NOT NULL DEFAULT 0,
    "pricePerPersonInDollars" DOUBLE PRECISION NOT NULL,
    "wineryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExperienceSlot" (
    "id" SERIAL NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "slotType" "SlotTypeEnum" NOT NULL,
    "durationInMinutes" INTEGER NOT NULL,
    "noOfAttendees" INTEGER NOT NULL DEFAULT 0,
    "limitOfAttendees" INTEGER NOT NULL,
    "pricePerPersonInDollars" DOUBLE PRECISION NOT NULL,
    "experienceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExperienceSlot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "wineryName" TEXT NOT NULL,
    "username" TEXT,
    "noOfAttendees" INTEGER NOT NULL,
    "pricePerPersonInDollars" DOUBLE PRECISION NOT NULL,
    "paymentStatus" TEXT NOT NULL,
    "slotId" INTEGER NOT NULL,
    "experienceId" INTEGER NOT NULL,
    "startDateTime" TIMESTAMP(3) NOT NULL,
    "endDateTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Winery_name_key" ON "Winery"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Winery_urlAlias_key" ON "Winery"("urlAlias");

-- CreateIndex
CREATE UNIQUE INDEX "Winery_creatorUsername_key" ON "Winery"("creatorUsername");

-- CreateIndex
CREATE UNIQUE INDEX "Winery_creatorEmail_key" ON "Winery"("creatorEmail");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WineGrape" ADD CONSTRAINT "WineGrape_wineryId_fkey" FOREIGN KEY ("wineryId") REFERENCES "Winery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WineProductionType" ADD CONSTRAINT "WineProductionType_wineryId_fkey" FOREIGN KEY ("wineryId") REFERENCES "Winery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WineType" ADD CONSTRAINT "WineType_wineryId_fkey" FOREIGN KEY ("wineryId") REFERENCES "Winery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WineryAmenity" ADD CONSTRAINT "WineryAmenity_wineryId_fkey" FOREIGN KEY ("wineryId") REFERENCES "Winery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WineryLanguage" ADD CONSTRAINT "WineryLanguage_wineryId_fkey" FOREIGN KEY ("wineryId") REFERENCES "Winery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WineryOtherServices" ADD CONSTRAINT "WineryOtherServices_wineryId_fkey" FOREIGN KEY ("wineryId") REFERENCES "Winery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Winery" ADD CONSTRAINT "Winery_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WineryImage" ADD CONSTRAINT "WineryImage_wineryId_fkey" FOREIGN KEY ("wineryId") REFERENCES "Winery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceImage" ADD CONSTRAINT "ExperienceImage_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_wineryId_fkey" FOREIGN KEY ("wineryId") REFERENCES "Winery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExperienceSlot" ADD CONSTRAINT "ExperienceSlot_experienceId_fkey" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "ExperienceSlot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
