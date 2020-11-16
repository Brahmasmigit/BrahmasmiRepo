USE [master]
GO
/****** Object:  Database [Brahmasmi]    Script Date: 11/16/2020 8:51:22 AM ******/
CREATE DATABASE [Brahmasmi]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Brahmasmi', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Brahmasmi.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Brahmasmi_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Brahmasmi_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Brahmasmi] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Brahmasmi].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Brahmasmi] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Brahmasmi] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Brahmasmi] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Brahmasmi] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Brahmasmi] SET ARITHABORT OFF 
GO
ALTER DATABASE [Brahmasmi] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Brahmasmi] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Brahmasmi] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Brahmasmi] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Brahmasmi] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Brahmasmi] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Brahmasmi] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Brahmasmi] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Brahmasmi] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Brahmasmi] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Brahmasmi] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Brahmasmi] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Brahmasmi] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Brahmasmi] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Brahmasmi] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Brahmasmi] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Brahmasmi] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Brahmasmi] SET RECOVERY FULL 
GO
ALTER DATABASE [Brahmasmi] SET  MULTI_USER 
GO
ALTER DATABASE [Brahmasmi] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Brahmasmi] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Brahmasmi] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Brahmasmi] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Brahmasmi] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Brahmasmi] SET QUERY_STORE = OFF
GO
USE [Brahmasmi]
GO
/****** Object:  UserDefinedTableType [dbo].[testtype]    Script Date: 11/16/2020 8:51:22 AM ******/
CREATE TYPE [dbo].[testtype] AS TABLE(
	[ActivityName] [varchar](50) NULL,
	[Rating] [int] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TT_VendorCertifications]    Script Date: 11/16/2020 8:51:22 AM ******/
CREATE TYPE [dbo].[TT_VendorCertifications] AS TABLE(
	[VendorID] [int] NULL,
	[CertificationID] [int] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TT_VendorRelationShip]    Script Date: 11/16/2020 8:51:22 AM ******/
CREATE TYPE [dbo].[TT_VendorRelationShip] AS TABLE(
	[RelationShipName] [nvarchar](50) NULL,
	[VendorID] [int] NULL,
	[Name] [nvarchar](50) NULL,
	[Gender] [nvarchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TT_VendorSocialNetworks]    Script Date: 11/16/2020 8:51:22 AM ******/
CREATE TYPE [dbo].[TT_VendorSocialNetworks] AS TABLE(
	[VendorID] [int] NULL,
	[SocialNetworkID] [int] NULL,
	[SocialNetworkURL] [nvarchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TT_VendorSpecialization]    Script Date: 11/16/2020 8:51:22 AM ******/
CREATE TYPE [dbo].[TT_VendorSpecialization] AS TABLE(
	[VendorID] [int] NULL,
	[SpecializationName] [int] NULL
)
GO
/****** Object:  Table [dbo].[Login]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Login](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[MobileNumber] [varchar](50) NULL,
	[Password] [varchar](256) NULL,
	[FirstName] [varchar](150) NULL,
	[LastName] [varchar](150) NULL,
 CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblAdminLogin]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAdminLogin](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[UserType] [int] NULL,
	[UserName] [nvarchar](50) NULL,
	[Password] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_tblAdminLogin] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblAstrologyCategories]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAstrologyCategories](
	[AstrologyID] [int] IDENTITY(1,1) NOT NULL,
	[AstrologyName] [nvarchar](50) NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[IsDelete] [char](1) NULL,
	[Amount] [decimal](18, 2) NULL,
 CONSTRAINT [PK_tblAstrologyCategories] PRIMARY KEY CLUSTERED 
(
	[AstrologyID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblAstrologySlotBooking]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblAstrologySlotBooking](
	[AstrologySlotID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[EmailID] [nvarchar](50) NULL,
	[MobileNumber] [nvarchar](50) NULL,
	[AstrologyID] [int] NULL,
	[Gender] [nvarchar](10) NULL,
	[DateOfBirth] [date] NULL,
	[TimeOfBirth] [time](7) NULL,
	[LanguageID] [int] NULL,
	[SlotDate] [date] NULL,
	[SlotTime] [nvarchar](50) NULL,
	[Description] [nvarchar](1000) NULL,
	[Amount] [decimal](18, 2) NULL,
	[Status] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[IsDelete] [char](1) NULL,
	[CityID] [int] NULL,
	[PlaceOfBirth] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblAstrologySlotBooking] PRIMARY KEY CLUSTERED 
(
	[AstrologySlotID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblBadge]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBadge](
	[BadgeID] [int] IDENTITY(1,1) NOT NULL,
	[BadgeName] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblBadge] PRIMARY KEY CLUSTERED 
(
	[BadgeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblBilling]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBilling](
	[BillingId] [int] IDENTITY(1,1) NOT NULL,
	[BookingId] [int] NULL,
	[UserId] [int] NULL,
	[BillingAddress] [nvarchar](100) NULL,
	[CityId] [int] NULL,
	[PinCode] [varchar](20) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblBooking]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBooking](
	[BookingID] [int] IDENTITY(1,1) NOT NULL,
	[BookingDate] [datetime] NULL,
	[VendorID] [int] NULL,
	[BookingType] [nvarchar](50) NULL,
	[ServiceTypeID] [int] NULL,
	[ServiceID] [int] NULL,
	[BookingStatusID] [int] NULL,
	[UserID] [int] NULL,
	[BookingLocation] [nvarchar](150) NULL,
	[PaymentID] [int] NULL,
	[RatingsID] [int] NULL,
	[ReviewComments] [nvarchar](250) NULL,
	[BookingTime] [time](7) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
	[PACKAGEID] [int] NULL,
	[ORDERNO] [nvarchar](50) NULL,
	[BOOKINGAMOUNT] [int] NULL,
	[TimeIn] [time](7) NULL,
	[TimeOut] [time](7) NULL,
 CONSTRAINT [PK_Table_1] PRIMARY KEY CLUSTERED 
(
	[BookingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblBookingStatus]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblBookingStatus](
	[BookingStatusID] [int] IDENTITY(1,1) NOT NULL,
	[BookingStatusName] [nvarchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblBookingStatus] PRIMARY KEY CLUSTERED 
(
	[BookingStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCertifications]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCertifications](
	[CertificationID] [int] IDENTITY(1,1) NOT NULL,
	[CertificationName] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblCertifications] PRIMARY KEY CLUSTERED 
(
	[CertificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCity]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCity](
	[CityID] [int] IDENTITY(1,1) NOT NULL,
	[CityName] [nvarchar](50) NULL,
	[StateID] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblCity] PRIMARY KEY CLUSTERED 
(
	[CityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblCountries]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblCountries](
	[CountryID] [int] IDENTITY(1,1) NOT NULL,
	[CountryName] [nvarchar](50) NULL,
	[CountryCode] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblCountries] PRIMARY KEY CLUSTERED 
(
	[CountryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblFAQ]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblFAQ](
	[FAQID] [int] IDENTITY(1,1) NOT NULL,
	[FAQ] [nvarchar](150) NULL,
	[FAQAnswer] [nvarchar](150) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblFAQ] PRIMARY KEY CLUSTERED 
(
	[FAQID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblKeyInsights]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblKeyInsights](
	[InsightsID] [int] IDENTITY(1,1) NOT NULL,
	[InsightName] [nvarchar](150) NULL,
	[ServiceID] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblKeyInsights] PRIMARY KEY CLUSTERED 
(
	[InsightsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblLanguage]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblLanguage](
	[LanguageID] [int] IDENTITY(1,1) NOT NULL,
	[LanguageName] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblLanguage] PRIMARY KEY CLUSTERED 
(
	[LanguageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblMeeting]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblMeeting](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[MeetingId] [nvarchar](50) NULL,
	[MeetingPassword] [nvarchar](50) NULL,
	[Signature] [nvarchar](max) NULL,
	[isDeleted] [char](1) NULL,
	[CreatedDate] [datetime] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[BOOKINGID] [int] NULL,
 CONSTRAINT [PK_tblMeeting] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TBLMEETINGCREDENTIALS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TBLMEETINGCREDENTIALS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[APIKey] [nvarchar](100) NULL,
	[APISecret] [nvarchar](100) NULL,
	[CREATEDDATE] [datetime] NULL,
	[CREATEDBY] [nvarchar](50) NULL,
	[ISDELETED] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblModeOfPayment]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblModeOfPayment](
	[ModeOfPaymentID] [int] IDENTITY(1,1) NOT NULL,
	[ModeOfPayment] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblModeOfPayment] PRIMARY KEY CLUSTERED 
(
	[ModeOfPaymentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblNetBanking]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblNetBanking](
	[NetbankingID] [int] IDENTITY(1,1) NOT NULL,
	[NetBankingName] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblNetBanking] PRIMARY KEY CLUSTERED 
(
	[NetbankingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblOccupation]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblOccupation](
	[OccupationID] [int] IDENTITY(1,1) NOT NULL,
	[OccupationName] [nvarchar](70) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblOccupation] PRIMARY KEY CLUSTERED 
(
	[OccupationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPackages]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPackages](
	[PackageID] [int] IDENTITY(1,1) NOT NULL,
	[PackageName] [nvarchar](200) NULL,
	[ServiceId] [int] NULL,
	[Price] [int] NULL,
 CONSTRAINT [PK_tblPackages] PRIMARY KEY CLUSTERED 
(
	[PackageID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPatient]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPatient](
	[PatientId] [int] IDENTITY(1,1) NOT NULL,
	[PatientName] [nvarchar](50) NULL,
	[PatientIllness] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[PatientId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPayment]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPayment](
	[PaymentID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[ModeofPaymentID] [int] NULL,
	[PaymentDate] [datetime] NULL,
	[PaymentStatus] [nvarchar](50) NULL,
	[VendorID] [int] NULL,
	[AmountPaid] [decimal](18, 2) NULL,
	[INVOICENO] [nvarchar](50) NULL,
	[BOOKINGID] [int] NULL,
 CONSTRAINT [PK_tblPayment] PRIMARY KEY CLUSTERED 
(
	[PaymentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPaymentHistory]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPaymentHistory](
	[PaymentHistoryID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[InvoiceNo] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblPaymentHistory] PRIMARY KEY CLUSTERED 
(
	[PaymentHistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPaymentStatus]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPaymentStatus](
	[PaymentStatusId] [int] IDENTITY(1,1) NOT NULL,
	[PaymentStatusName] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[PaymentStatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblPoojaItem]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblPoojaItem](
	[ItemId] [int] IDENTITY(1,1) NOT NULL,
	[ItemName] [nvarchar](50) NULL,
	[ItemPrice] [int] NULL,
	[PackageId] [int] NULL,
	[ServiceId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProcedure]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProcedure](
	[ProcedureId] [int] IDENTITY(1,1) NOT NULL,
	[ProcedureName] [nvarchar](50) NULL,
	[PackageId] [int] NULL,
	[ServiceId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProduct]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProduct](
	[ProductID] [int] IDENTITY(1,1) NOT NULL,
	[ProductName] [nvarchar](50) NULL,
	[ProductShortDescription] [nvarchar](2000) NULL,
	[ProductLongDescription] [nvarchar](2000) NULL,
	[ProductPrice] [decimal](18, 2) NULL,
	[ProductImage] [image] NULL,
	[CreatedDate] [datetime] NULL,
	[IsDelete] [char](1) NULL,
	[ProductType] [nvarchar](20) NULL,
 CONSTRAINT [PK_tblProduct] PRIMARY KEY CLUSTERED 
(
	[ProductID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProductBilling]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProductBilling](
	[BillingId] [int] IDENTITY(1,1) NOT NULL,
	[BookingId] [int] NULL,
	[UserId] [int] NULL,
	[BillingAddress] [nvarchar](100) NULL,
	[CityId] [int] NULL,
	[PinCode] [varchar](20) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[BillingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProductBooking]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProductBooking](
	[BookingID] [int] IDENTITY(1,1) NOT NULL,
	[BookingDate] [datetime] NULL,
	[StoreID] [int] NULL,
	[BookingType] [nvarchar](50) NULL,
	[ProductId] [int] NULL,
	[ProductBookingStatusID] [int] NULL,
	[UserID] [int] NULL,
	[BookingLocation] [nvarchar](150) NULL,
	[PaymentID] [int] NULL,
	[RatingsID] [int] NULL,
	[ReviewComments] [nvarchar](250) NULL,
	[BookingTime] [time](7) NULL,
	[CreatedDate] [datetime] NULL,
	[UpdatedDate] [datetime] NULL,
	[ORDERNO] [nvarchar](50) NULL,
	[BOOKINGAMOUNT] [int] NULL,
	[QUANTITY] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[BookingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProductBookingStatus]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProductBookingStatus](
	[BookingStatusID] [int] IDENTITY(1,1) NOT NULL,
	[BookingStatusName] [nvarchar](100) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProductCity]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProductCity](
	[ProductCityID] [int] IDENTITY(1,1) NOT NULL,
	[ProductID] [int] NULL,
	[CityID] [int] NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_tblProductCity] PRIMARY KEY CLUSTERED 
(
	[ProductCityID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProductDetails]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProductDetails](
	[ItemID] [int] IDENTITY(1,1) NOT NULL,
	[ProductID] [int] NULL,
	[ItemName] [nvarchar](150) NULL,
	[CreatedDate] [datetime] NULL,
	[IsDelete] [char](1) NULL,
 CONSTRAINT [PK_tblProductDetails] PRIMARY KEY CLUSTERED 
(
	[ItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblProductPayment]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblProductPayment](
	[PaymentID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[ModeofPaymentID] [int] NULL,
	[PaymentDate] [datetime] NULL,
	[PaymentStatus] [nvarchar](50) NULL,
	[VendorID] [int] NULL,
	[AmountPaid] [decimal](18, 2) NULL,
	[INVOICENO] [nvarchar](50) NULL,
	[BOOKINGID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[PaymentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblRatings]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRatings](
	[RatingsID] [int] IDENTITY(1,1) NOT NULL,
	[RatingName] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblRatings] PRIMARY KEY CLUSTERED 
(
	[RatingsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblRelationShip]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblRelationShip](
	[RelationShipID] [int] IDENTITY(1,1) NOT NULL,
	[RelationShipName] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[VendorID] [int] NULL,
	[Name] [nvarchar](50) NULL,
	[Gender] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblRelationShip] PRIMARY KEY CLUSTERED 
(
	[RelationShipID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblService]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblService](
	[ServiceID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceTypeID] [int] NULL,
	[ServiceName] [nvarchar](100) NULL,
	[Service_Short_Description] [nvarchar](2000) NULL,
	[Service_Long_Description] [nvarchar](2000) NULL,
	[Keyword] [nvarchar](100) NULL,
	[ServiceImage] [image] NULL,
	[ServiceImageFile] [nvarchar](200) NULL,
 CONSTRAINT [PK_tblService] PRIMARY KEY CLUSTERED 
(
	[ServiceID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblServiceCity]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblServiceCity](
	[ServiceCityId] [int] IDENTITY(1,1) NOT NULL,
	[ServiceId] [int] NULL,
	[CityId] [int] NULL,
	[IsDelete] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceCityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblServiceType]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblServiceType](
	[ServiceTypeID] [int] IDENTITY(1,1) NOT NULL,
	[ServiceTypeName] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[ServiceTypeImage] [image] NULL,
 CONSTRAINT [PK_tblServiceType] PRIMARY KEY CLUSTERED 
(
	[ServiceTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblServiceTypeCity]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblServiceTypeCity](
	[ServiceTypeCityId] [int] IDENTITY(1,1) NOT NULL,
	[ServiceTypeId] [int] NULL,
	[CityId] [int] NULL,
	[IsDelete] [char](1) NULL,
PRIMARY KEY CLUSTERED 
(
	[ServiceTypeCityId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblSocialNetwork]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblSocialNetwork](
	[SocialNetworkID] [int] IDENTITY(1,1) NOT NULL,
	[SocialNetworkName] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblSocialNetwork] PRIMARY KEY CLUSTERED 
(
	[SocialNetworkID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblSpecialization]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblSpecialization](
	[SpecializationID] [int] IDENTITY(1,1) NOT NULL,
	[SpecializationName] [nvarchar](50) NULL,
	[VendorID] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblSpecialization] PRIMARY KEY CLUSTERED 
(
	[SpecializationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblState]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblState](
	[StateID] [int] IDENTITY(1,1) NOT NULL,
	[StateName] [nvarchar](50) NULL,
	[CountryID] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblState] PRIMARY KEY CLUSTERED 
(
	[StateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblStoreRegistration]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblStoreRegistration](
	[StoreID] [int] IDENTITY(1,1) NOT NULL,
	[StoreName] [nvarchar](50) NULL,
	[OwnerName] [nvarchar](50) NULL,
	[CityID] [int] NULL,
	[MobileNumber] [nvarchar](50) NULL,
	[EmailID] [nvarchar](50) NULL,
	[Address] [nvarchar](200) NULL,
	[PinCode] [nvarchar](10) NULL,
	[CreatedBy] [int] NULL,
	[IsDelete] [char](1) NULL,
	[CreatedDate] [datetime] NULL,
	[UserTypeID] [int] NULL,
	[Status] [int] NULL,
 CONSTRAINT [PK_StoreRegistration] PRIMARY KEY CLUSTERED 
(
	[StoreID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblStoreStock]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblStoreStock](
	[StoreStockID] [int] IDENTITY(1,1) NOT NULL,
	[ProductID] [int] NULL,
	[ProductQuantity] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[StoreID] [int] NULL,
 CONSTRAINT [PK_tblStoreStock] PRIMARY KEY CLUSTERED 
(
	[StoreStockID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblTitle]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblTitle](
	[TitleID] [int] IDENTITY(1,1) NOT NULL,
	[TitleName] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblTitle] PRIMARY KEY CLUSTERED 
(
	[TitleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUser]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUser](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[UserTypeID] [int] NULL,
	[CityID] [int] NULL,
	[CountryID] [int] NULL,
	[LanguageID] [int] NULL,
	[StateID] [int] NULL,
	[CountryCode] [nvarchar](50) NULL,
	[User_MobileNumber] [nvarchar](50) NULL,
	[User_Name] [nvarchar](50) NULL,
	[User_EmailID] [nvarchar](100) NULL,
	[User_Address1] [nvarchar](500) NULL,
	[User_Address2] [nvarchar](500) NULL,
	[User_Address3] [nvarchar](500) NULL,
	[User_PinCode] [nvarchar](50) NULL,
	[User_Latitude] [nvarchar](50) NULL,
	[User_Longitude] [nvarchar](50) NULL,
	[User_Status] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblUser] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserHistory]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserHistory](
	[HistoryID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [int] NULL,
	[UserLoginDate] [datetime] NULL,
	[UserLogOffDate] [datetime] NULL,
	[User_Latitude] [nvarchar](50) NULL,
	[User_Longitude] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblUserHistory] PRIMARY KEY CLUSTERED 
(
	[HistoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblUserType]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblUserType](
	[UserTypeID] [int] IDENTITY(1,1) NOT NULL,
	[UserTypeName] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
 CONSTRAINT [PK_tblUserType] PRIMARY KEY CLUSTERED 
(
	[UserTypeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVendor]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVendor](
	[VendorID] [int] IDENTITY(1,1) NOT NULL,
	[UserTypeID] [int] NULL,
	[CityID] [int] NULL,
	[CountryID] [int] NULL,
	[TitleID] [int] NULL,
	[CertificationID] [int] NULL,
	[FamilyID] [int] NULL,
	[LanguageID] [int] NULL,
	[StateID] [int] NULL,
	[Vendor_PassportNumber] [nvarchar](50) NULL,
	[Vendor_MobileNumber] [nvarchar](50) NULL,
	[Vendor_Address1] [nvarchar](500) NULL,
	[Vendor_PinCode1] [nvarchar](50) NULL,
	[NewMemberShip] [nvarchar](50) NULL,
	[Renewal] [nvarchar](50) NULL,
	[MemberShipDate] [datetime] NULL,
	[RenewalDate] [datetime] NULL,
	[Vendor_FirstName] [nvarchar](50) NULL,
	[Vendor_Address2] [nvarchar](500) NULL,
	[Vendor_PinCode2] [nvarchar](50) NULL,
	[Vendor_Address3] [nvarchar](500) NULL,
	[Vendor_MiddleName] [nvarchar](50) NULL,
	[Vendor_LastName] [nvarchar](50) NULL,
	[Vendor_NickName] [nvarchar](50) NULL,
	[Vendor_Gothram] [nvarchar](50) NULL,
	[Vendor_FatherName] [nvarchar](50) NULL,
	[Vendor_Height] [decimal](18, 2) NULL,
	[Vendor_Weight] [decimal](18, 2) NULL,
	[Vendor_DOB] [datetime] NULL,
	[Vendor_PlaceofBirth] [nvarchar](50) NULL,
	[Vendor_AlternateNumber] [nvarchar](50) NULL,
	[Vendor_EmailID] [nvarchar](50) NULL,
	[Vendor_PANNumber] [nvarchar](50) NULL,
	[Vendor_AadharNumber] [nvarchar](50) NULL,
	[CreatedDate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[Vendor_Latitude] [nvarchar](50) NULL,
	[Vendor_Longitude] [nvarchar](50) NULL,
	[Vendor_Status] [nvarchar](50) NULL,
	[Vendor_Abroad] [nvarchar](50) NULL,
	[Photo] [image] NULL,
	[Vendor_Age] [int] NULL,
	[Vendor_IdentificationMark1] [nvarchar](150) NULL,
	[Vendor_IdentificationMark2] [nvarchar](150) NULL,
	[Vendor_BankName] [nvarchar](50) NULL,
	[Vendor_BankBranch] [nvarchar](50) NULL,
	[Vendor_AccountNumber] [nvarchar](50) NULL,
	[Vendor_IFSCCode] [nvarchar](50) NULL,
	[Vendor_MICRCode] [nvarchar](50) NULL,
	[Vendor_NameOnPassBook] [nvarchar](50) NULL,
	[Vendor_Gender] [nvarchar](10) NULL,
	[Vendor_Occupation] [nvarchar](50) NULL,
	[Vendor_EmergencyContactPerson] [nvarchar](50) NULL,
	[Vendor_EmergencyContactNumber] [nvarchar](50) NULL,
	[Vendor_AreasOfActivity] [nvarchar](500) NULL,
 CONSTRAINT [PK_tblVendor] PRIMARY KEY CLUSTERED 
(
	[VendorID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVendorCertifications]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVendorCertifications](
	[VendorCertificationID] [int] IDENTITY(1,1) NOT NULL,
	[VendorID] [int] NULL,
	[CertificationID] [int] NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_tblVendorCertifications] PRIMARY KEY CLUSTERED 
(
	[VendorCertificationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVendorEnquiry]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVendorEnquiry](
	[EnquiryID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[MobileNumber] [nvarchar](50) NULL,
	[EmailID] [nvarchar](50) NULL,
	[Description] [nvarchar](100) NULL,
	[Createdate] [datetime] NULL,
	[ModifiedDate] [datetime] NULL,
	[CityID] [int] NULL,
 CONSTRAINT [PK_tblVendorEnquiry] PRIMARY KEY CLUSTERED 
(
	[EnquiryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVendorService]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVendorService](
	[VendorServiceId] [int] IDENTITY(1,1) NOT NULL,
	[VendorId] [int] NULL,
	[ServiceId] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[VendorServiceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVendorSocialNetwork]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVendorSocialNetwork](
	[VendorSocialNetworkID] [int] IDENTITY(1,1) NOT NULL,
	[VendorID] [int] NULL,
	[SocialNetworkID] [int] NULL,
	[CreatedDate] [datetime] NULL,
	[SocialNetworkURL] [nvarchar](50) NULL,
 CONSTRAINT [PK_tblVendorSocialNetwork] PRIMARY KEY CLUSTERED 
(
	[VendorSocialNetworkID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVirtualSlotBooking]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVirtualSlotBooking](
	[VirtualSlotBookingID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[MobileNumber] [nvarchar](50) NULL,
	[EmailID] [nvarchar](100) NULL,
	[CityID] [int] NULL,
	[ServiceType] [nvarchar](50) NULL,
	[ServiceID] [int] NULL,
	[VirtualVideoCategoryID] [int] NULL,
	[LanguageID] [int] NULL,
	[Amount] [decimal](18, 2) NULL,
	[Description] [nvarchar](500) NULL,
	[CreatedDate] [datetime] NULL,
	[PackageId] [int] NULL,
 CONSTRAINT [PK_tblVirtualSlotBooking] PRIMARY KEY CLUSTERED 
(
	[VirtualSlotBookingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tblVirtualVideoCategory]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tblVirtualVideoCategory](
	[VirtualVideoCategoryID] [int] IDENTITY(1,1) NOT NULL,
	[VideoType] [nvarchar](50) NULL,
	[CreatedBy] [int] NULL,
	[CreatedDate] [datetime] NULL,
 CONSTRAINT [PK_tblVirtualVideoCategory] PRIMARY KEY CLUSTERED 
(
	[VirtualVideoCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[test]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[test](
	[id] [int] NULL,
	[ActivityName] [nvarchar](50) NULL,
	[Rating] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VendorRegistration]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VendorRegistration](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Email] [nvarchar](250) NULL,
	[Contact] [varchar](50) NULL,
	[Qualification] [nvarchar](100) NULL,
	[UserName] [nvarchar](100) NULL,
	[Password] [nvarchar](50) NULL,
	[test] [nvarchar](50) NULL,
	[UserID] [int] NULL,
 CONSTRAINT [PK_VendorRegistration] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[tblAdminLogin] ADD  CONSTRAINT [DF_tblAdminLogin_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblAstrologyCategories] ADD  CONSTRAINT [DF_tblAstrologyCategories_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblAstrologyCategories] ADD  CONSTRAINT [DF_tblAstrologyCategories_IsDelete]  DEFAULT ('N') FOR [IsDelete]
GO
ALTER TABLE [dbo].[tblAstrologySlotBooking] ADD  CONSTRAINT [DF_tblAstrologySlotBooking_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblBadge] ADD  CONSTRAINT [DF_tblBadge_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblBookingStatus] ADD  CONSTRAINT [DF_tblBookingStatus_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblCertifications] ADD  CONSTRAINT [DF_tblCertifications_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblCity] ADD  CONSTRAINT [DF_tblCity_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblCountries] ADD  CONSTRAINT [DF_tblCountries_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblFAQ] ADD  CONSTRAINT [DF_tblFAQ_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblKeyInsights] ADD  CONSTRAINT [DF_tblKeyInsights_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblLanguage] ADD  CONSTRAINT [DF_tblLanguage_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblProduct] ADD  CONSTRAINT [DF_tblProduct_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblProduct] ADD  CONSTRAINT [DF_tblProduct_IsDelete]  DEFAULT ('N') FOR [IsDelete]
GO
ALTER TABLE [dbo].[tblProductCity] ADD  CONSTRAINT [DF_tblProductCity_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblProductDetails] ADD  CONSTRAINT [DF_tblProductDetails_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblProductDetails] ADD  CONSTRAINT [DF_tblProductDetails_IsDelete]  DEFAULT ('N') FOR [IsDelete]
GO
ALTER TABLE [dbo].[tblRatings] ADD  CONSTRAINT [DF_tblRatings_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblRelationShip] ADD  CONSTRAINT [DF_tblRelationShip_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblServiceType] ADD  CONSTRAINT [DF_tblServiceType_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblServiceTypeCity] ADD  DEFAULT ('N') FOR [IsDelete]
GO
ALTER TABLE [dbo].[tblSocialNetwork] ADD  CONSTRAINT [DF_tblSocialNetwork_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblState] ADD  CONSTRAINT [DF_tblState_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblStoreRegistration] ADD  CONSTRAINT [DF_StoreRegistration_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblStoreStock] ADD  CONSTRAINT [DF_tblStoreStock_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblTitle] ADD  CONSTRAINT [DF_tblTitle_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblUser] ADD  CONSTRAINT [DF_tblUser_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblUserHistory] ADD  CONSTRAINT [DF_tblUserHistory_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblUserType] ADD  CONSTRAINT [DF_tblUserType_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblVendor] ADD  CONSTRAINT [DF_tblVendor_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblVendorEnquiry] ADD  CONSTRAINT [DF_tblVendorEnquiry_Createdate]  DEFAULT (getdate()) FOR [Createdate]
GO
ALTER TABLE [dbo].[tblVirtualSlotBooking] ADD  CONSTRAINT [DF_tblVirtualSlotBooking_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblVirtualVideoCategory] ADD  CONSTRAINT [DF_tblVirtualVideoCategory_CreatedDate]  DEFAULT (getdate()) FOR [CreatedDate]
GO
ALTER TABLE [dbo].[tblBooking]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_tblBookingStatus] FOREIGN KEY([BookingStatusID])
REFERENCES [dbo].[tblBookingStatus] ([BookingStatusID])
GO
ALTER TABLE [dbo].[tblBooking] CHECK CONSTRAINT [FK_Table_1_tblBookingStatus]
GO
ALTER TABLE [dbo].[tblBooking]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_tblRatings] FOREIGN KEY([RatingsID])
REFERENCES [dbo].[tblRatings] ([RatingsID])
GO
ALTER TABLE [dbo].[tblBooking] CHECK CONSTRAINT [FK_Table_1_tblRatings]
GO
ALTER TABLE [dbo].[tblBooking]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_tblService] FOREIGN KEY([ServiceID])
REFERENCES [dbo].[tblService] ([ServiceID])
GO
ALTER TABLE [dbo].[tblBooking] CHECK CONSTRAINT [FK_Table_1_tblService]
GO
ALTER TABLE [dbo].[tblBooking]  WITH CHECK ADD  CONSTRAINT [FK_Table_1_tblServiceType] FOREIGN KEY([ServiceTypeID])
REFERENCES [dbo].[tblServiceType] ([ServiceTypeID])
GO
ALTER TABLE [dbo].[tblBooking] CHECK CONSTRAINT [FK_Table_1_tblServiceType]
GO
ALTER TABLE [dbo].[tblCity]  WITH CHECK ADD FOREIGN KEY([StateID])
REFERENCES [dbo].[tblState] ([StateID])
GO
ALTER TABLE [dbo].[tblKeyInsights]  WITH CHECK ADD  CONSTRAINT [FK_tblKeyInsights_tblService] FOREIGN KEY([ServiceID])
REFERENCES [dbo].[tblService] ([ServiceID])
GO
ALTER TABLE [dbo].[tblKeyInsights] CHECK CONSTRAINT [FK_tblKeyInsights_tblService]
GO
ALTER TABLE [dbo].[tblService]  WITH CHECK ADD  CONSTRAINT [FK_tblService_tblServiceType] FOREIGN KEY([ServiceTypeID])
REFERENCES [dbo].[tblServiceType] ([ServiceTypeID])
GO
ALTER TABLE [dbo].[tblService] CHECK CONSTRAINT [FK_tblService_tblServiceType]
GO
ALTER TABLE [dbo].[tblState]  WITH CHECK ADD FOREIGN KEY([CountryID])
REFERENCES [dbo].[tblCountries] ([CountryID])
GO
ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD  CONSTRAINT [FK_tblUser_tblCity] FOREIGN KEY([CityID])
REFERENCES [dbo].[tblCity] ([CityID])
GO
ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblCity]
GO
ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD  CONSTRAINT [FK_tblUser_tblCountries] FOREIGN KEY([CountryID])
REFERENCES [dbo].[tblCountries] ([CountryID])
GO
ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblCountries]
GO
ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD  CONSTRAINT [FK_tblUser_tblLanguage] FOREIGN KEY([LanguageID])
REFERENCES [dbo].[tblLanguage] ([LanguageID])
GO
ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblLanguage]
GO
ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD  CONSTRAINT [FK_tblUser_tblState] FOREIGN KEY([StateID])
REFERENCES [dbo].[tblState] ([StateID])
GO
ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblState]
GO
ALTER TABLE [dbo].[tblUser]  WITH CHECK ADD  CONSTRAINT [FK_tblUser_tblUserType] FOREIGN KEY([UserTypeID])
REFERENCES [dbo].[tblUserType] ([UserTypeID])
GO
ALTER TABLE [dbo].[tblUser] CHECK CONSTRAINT [FK_tblUser_tblUserType]
GO
ALTER TABLE [dbo].[VendorRegistration]  WITH CHECK ADD  CONSTRAINT [FK_VendorRegistration_tblUser] FOREIGN KEY([UserID])
REFERENCES [dbo].[tblUser] ([UserID])
GO
ALTER TABLE [dbo].[VendorRegistration] CHECK CONSTRAINT [FK_VendorRegistration_tblUser]
GO
/****** Object:  StoredProcedure [dbo].[InsertVendor]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[InsertVendor]  
(
@Name nvarchar(50),
@Email nvarchar(250),
@Contact varchar(50),
@Qualification nvarchar(100),

@Password nvarchar(50)
)
AS  
BEGIN  
     Insert into VendorRegistration(Name,Email,Contact,Qualification,Password) values(@Name,@Email,@Contact,@Qualification,@Password)  
END  

GO
/****** Object:  StoredProcedure [dbo].[SP_Admin_GetVendorEnquiry]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Admin_GetVendorEnquiry]  
  
AS    
BEGIN    
     SELECT  Name,MobileNumber,EmailID,CityName,v.CityID from dbo.tblVendorEnquiry v inner join tblCity c on c.CityID=v.CityID  order by Createdate desc
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_ADMINDASHBOARD]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_ADMINDASHBOARD]
(
@STATUSID INT NULL,
@BOOKINGDATE NVARCHAR(50) NULL
)
AS
BEGIN
print @STATUSID
print @BOOKINGDATE
IF(@STATUSID <> 0)
BEGIN
SELECT SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 
					END),
BK.BOOKINGTYPE, bl.CityId,c.CityName, BK.BookingStatusID,BK.BOOKINGID,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,BK.BOOKINGLOCATION,CONVERT(VARCHAR,BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID
left JOIN TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN TBLBOOKINGSTATUS BS ON	BK.BookingStatusID=BS.BookingStatusID 
join tblBilling bl on bl.BookingId=bk.BookingID
join tblCity c on bl.CityId=c.CityID
WHERE BK.BookingStatusID=@STATUSID ORDER BY BK.UpdatedDate DESC
END
ELSE IF(@BOOKINGDATE IS NOT NULL AND @BOOKINGDATE <> 'NULL')
BEGIN
SELECT SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 
					END),
BK.BOOKINGTYPE, bl.CityId,c.CityName, BK.BookingStatusID,BK.BOOKINGID,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,BK.BOOKINGLOCATION,CONVERT(VARCHAR,BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID
left JOIN TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN TBLBOOKINGSTATUS BS ON	BK.BookingStatusID=BS.BookingStatusID 
join tblBilling bl on bl.BookingId=bk.BookingID
join tblCity c on bl.CityId=c.CityID
WHERE BK.BookingDate=convert(date,@BOOKINGDATE,102) ORDER BY BK.UpdatedDate DESC
END
ELSE
BEGIN
SELECT SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME 
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 
					END),
BK.BOOKINGTYPE, bl.CityId,c.CityName, BK.BOOKINGAMOUNT, M.MODEOFPAYMENT as PAYMENTMODE, BK.BookingStatusID,BK.BOOKINGID,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,BK.BOOKINGLOCATION,CONVERT(VARCHAR,BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID
left JOIN TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN TBLBOOKINGSTATUS BS ON	BK.BookingStatusID=BS.BookingStatusID JOIN DBO.TBLPAYMENT P ON BK.BookingID=P.BOOKINGID JOIN DBO.TBLMODEOFPAYMENT M ON P.MODEOFPAYMENTID=M.MODEOFPAYMENTID
join tblBilling bl on bl.BookingId=bk.BookingID
join tblCity c on bl.CityId=c.CityID
 ORDER BY BK.UpdatedDate DESC
END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_AdminLogin]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_AdminLogin]
(
@UserName nvarchar(50),@Password nvarchar(50)
)
AS  
BEGIN  
     SELECT UserId,UserType,UserName  from tblAdminLogin where UserName=@UserName and Password=@Password
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_ADMINPRODUCTDASHOBARD]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_ADMINPRODUCTDASHOBARD]
(
@STATUSID INT,
@BOOKINGDATE VARCHAR(50)
)
AS
BEGIN
SELECT B.BookingID,b.QUANTITY,B.PRODUCTID,PR.PRODUCTNAME,B.ORDERNO,CONVERT(VARCHAR,P.PAYMENTDATE,103) AS BookingDate,U.USER_EMAILID AS EMAILID,
U.User_Name AS USERNAME, L.BillingAddress,C.CityName,U.User_MobileNumber AS MOBILENUMBER,CONVERT(varchar(15),B.BookingTime,100) AS BookingTime,
PS.BookingStatusName AS BOOKINGSTATUS,B.RatingsID,B.ReviewComments,L.PinCode,B.ProductBookingStatusID AS BookingStatusID,
S.StoreID,S.StoreName,S.OwnerName,S.MobileNumber AS STOREMOBILENUMBER,S.EmailID AS STOREEMAILID,S.Address AS STOREADDRESS,
S.PinCode AS STOREPINCODE,
P.AMOUNTPAID AS TOTAL,M.MODEOFPAYMENT FROM DBO.TBLPRODUCTPAYMENT P JOIN DBO.TBLPRODUCTBOOKING B ON P.BOOKINGID=B.BOOKINGID 
JOIN DBO.TBLPRODUCTBILLING L ON L.BOOKINGID=P.BOOKINGID JOIN DBO.TBLUSER U ON U.USERID=P.USERID
JOIN tblCity C ON C.CityID=L.CityId  
JOIN DBO.TBLMODEOFPAYMENT M ON P.MODEOFPAYMENTID=M.MODEOFPAYMENTID      
JOIN DBO.TBLPRODUCT PR ON PR.PRODUCTID=B.PRODUCTID 
LEFT JOIN DBO.tblStoreRegistration S ON S.StoreID=B.StoreID AND S.Status=1
JOIN tblProductBookingStatus PS ON PS.BookingStatusID=B.ProductBookingStatusID   
ORDER BY B.UpdatedDate DESC
END
GO
/****** Object:  StoredProcedure [dbo].[SP_ADMINUPDATESTORE]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_ADMINUPDATESTORE]  
(  
@BOOKINGID INT NULL,  
@STOREID INT NULL  
)  
AS  
BEGIN  
BEGIN TRY  
UPDATE DBO.tblProductBooking SET StoreID=@STOREID WHERE BookingID=@BOOKINGID  
RETURN 1    
END TRY    
BEGIN CATCH    
RETURN 0    
END CATCH    
end
GO
/****** Object:  StoredProcedure [dbo].[SP_ADMINUPDATEVENDOR]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROC [dbo].[SP_ADMINUPDATEVENDOR]
(
@BOOKINGID INT NULL,
@VENDORID INT NULL
)
AS
BEGIN
BEGIN TRY
UPDATE DBO.tblBooking SET VendorID=@VENDORID WHERE BookingID=@BOOKINGID
RETURN 1  
END TRY  
BEGIN CATCH  
RETURN 0  
END CATCH  
end
GO
/****** Object:  StoredProcedure [dbo].[SP_CHANGEBOOKINGSTATUS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_CHANGEBOOKINGSTATUS]  
(  
@BOOKINGID INT,  
@BOOKINGSTATUSID INT  
)  
AS  
BEGIN  
BEGIN TRY  
UPDATE DBO.TBLBOOKING SET BOOKINGSTATUSID=@BOOKINGSTATUSID,UpdatedDate=GETDATE(),
TimeIn=CASE WHEN @BOOKINGSTATUSID = 3 THEN GETDATE() ELSE  TimeIn END,
TimeOut=CASE WHEN @BOOKINGSTATUSID = 6 THEN GETDATE() ELSE TimeOut END
WHERE BOOKINGID=@BOOKINGID  
RETURN 1  
END TRY  
BEGIN CATCH  
RETURN 0  
END CATCH  
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Delete_Service]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Delete_Service]  
(
@ServiceID int,@CityID int
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY 
   UPDATE tblServiceCity SET IsDelete='Y' WHERE ServiceID=@ServiceID and CityID=@CityID
return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_Delete_ServiceType]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Delete_ServiceType]  
(
@ServiceTypeID int,@CityID int
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY 
   UPDATE tblServiceTypeCity SET IsDelete='Y' WHERE ServiceTypeID=@ServiceTypeID and CityID=@CityID
return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_AllCities]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_AllCities]

AS  
BEGIN  
     SELECT CityID,CityName from tblCity 
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_AllProducts]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_AllProducts]
(@CityID int)
AS  
BEGIN  
     SELECT tblProduct.ProductID,ProductName,ProductLongDescription
	 ,ProductShortDescription,ProductPrice,ProductImage from tblProduct
	 inner join tblProductCity on tblProductCity.ProductID=tblProduct.ProductID 
	 where IsDelete='N' and CityID=@CityID
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_AllService]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_AllService]  
  
AS    
BEGIN    
     SELECT tblService.ServiceID,tblService.ServiceTypeID,tblServiceCity.CityID,  
  CityName,ServiceTypeName,ServiceName,ServiceImage,ServiceImageFile  
  ,Service_Short_Description,Service_Long_Description from   
  tblService inner join tblServiceType on tblServiceType.ServiceTypeID=tblService.ServiceTypeID  
   left outer join tblServiceCity on  tblService.ServiceID=tblServiceCity.ServiceID  
   inner join tblCity on tblCity.CityID=tblServiceCity.CityID  
  --where tblServiceCity.IsDelete='N'  
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_AllServiceTypes]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_AllServiceTypes]

AS  
BEGIN  
     SELECT tblServiceType.ServiceTypeID,ServiceTypeImage,CityName,ServiceTypeName,tblServiceTypeCity.CityID from tblServiceType
	 left outer join tblServiceTypeCity on  tblServiceType.ServiceTypeID=tblServiceTypeCity.ServiceTypeID
	  inner join tblCity on tblCity.CityID=tblServiceTypeCity.CityID where tblServiceTypeCity.IsDelete='N'
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_AllVendors]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_AllVendors]

AS  
BEGIN  
     SELECT VendorID,concat(Vendor_FirstName+' ',Vendor_MiddleName+' ',Vendor_LastName) as Vendor_FirstName,Vendor_MobileNumber,
	 Vendor_Address1,Vendor_Latitude,Vendor_Longitude,Photo from dbo.tblVendor 
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_AstrologyAmount]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_AstrologyAmount]
(@AstrologyID int)
AS  
BEGIN  
     SELECT Amount from tblAstrologyCategories where AstrologyID=@AstrologyID
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_AstrologyCategories]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_AstrologyCategories]
AS  
BEGIN  
     SELECT AstrologyID,AstrologyName,Amount from tblAstrologyCategories 
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_Certifications]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_Certifications]

AS  
BEGIN  
     SELECT CertificationID,CertificationName from tblCertifications
END  

GO
/****** Object:  StoredProcedure [dbo].[SP_Get_Cities]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_Cities]  
(  
@StateID int  
)  
AS    
BEGIN 
	if(@StateID <> 0)
	begin
     SELECT CityID,CityName from tblCity where StateID=@StateID  
	end
	else
	begin
		SELECT CityID,CityName from tblCity
	end
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_Languages]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[SP_Get_Languages]

AS  
BEGIN  
     SELECT LanguageID,LanguageName from tblLanguage
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_ModeOfPayment]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[SP_Get_ModeOfPayment]

AS  
BEGIN  
     SELECT ModeOfPaymentID,ModeOfPayment from tblModeOfPayment
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_Occupation]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_Occupation]

AS  
BEGIN  
     SELECT OccupationID,OccupationName from tblOccupation
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_Product]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[SP_Get_Product]
(@ProductID int)
AS  
BEGIN  
     SELECT ProductID,ProductName,ProductShortDescription,ProductLongDescription,ProductPrice from tblProduct  where ProductID=@ProductID and IsDelete='N' 
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_ProductDetails]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_ProductDetails]
(@ProductID int)
AS  
BEGIN  
     SELECT ProductID,ItemID,ItemName from tblProductDetails  where ProductID=@ProductID and IsDelete='N' 
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_ServicePackages]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_ServicePackages]
(@ServiceID int)
AS  
BEGIN  
     SELECT PackageID,PackageName from tblPackages  where ServiceID=@ServiceID
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_ServicePrice]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_ServicePrice]
(@ServiceID int,@PackageID int)
AS  
BEGIN  
     SELECT Price  from tblPackages  where ServiceID=@ServiceID and PackageID=@PackageID
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_ServiceTypeCity]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_ServiceTypeCity]
(@ServiceTypeID int)
AS  
BEGIN  
     SELECT distinct tblServiceTypeCity.CityID,CityName from tblServiceTypeCity
	 inner join tblCity on tblCity.CityID=tblServiceTypeCity.CityID where ServiceTypeID=@ServiceTypeID
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_SocialNetwork]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Get_SocialNetwork]

AS  
BEGIN  
     SELECT SocialNetworkID,SocialNetworkName from tblSocialNetwork
END  

GO
/****** Object:  StoredProcedure [dbo].[SP_Get_States]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_States]

AS  
BEGIN  
     SELECT StateID,StateName from tblState where CountryID=1
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_Store]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Get_Store]
(
@MobileNumber nvarchar(50)
)
AS  
BEGIN  
     SELECT StoreID,MobileNumber,UserTypeID  from tblStoreRegistration where MobileNumber=@MobileNumber
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_Title]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create procedure [dbo].[SP_Get_Title]

AS  
BEGIN  
     SELECT TitleID,TitleName from tblTitle
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_User]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Get_User]  
(  
@User_MobileNumber nvarchar(50)  
)  
AS    
BEGIN    
     SELECT UserID,UserTypeID,User_MobileNumber  from dbo.tblUser where User_MobileNumber=@User_MobileNumber and User_Status=1 
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_UserDetails]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Get_UserDetails]  
(  
@UserID int  
)  
AS    
BEGIN    
     SELECT UserID,User_Name,User_MobileNumber,tblUser.StateID,StateName,tblUser.CityID,CityName,User_EmailID,  
    User_Address1,User_PinCode,tblUser.CountryID,CountryName from tblUser  
    left join tblState on tblState.StateID=tblUser.StateID  
    left join tblCity on tblCity.CityID=tblUser.CityID  
    left join tblCountries on tblCountries.CountryID=tblUser.CountryID  
     where UserID=@UserID
END   
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_Vendor]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_Get_Vendor]  
(  
@Vendor_MobileNumber nvarchar(50)  
)  
AS    
BEGIN    
     SELECT VendorID,UserTypeID, Vendor_MobileNumber  from dbo.tblVendor where Vendor_MobileNumber=@Vendor_MobileNumber and Vendor_Status=1
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Get_VirtualVideoCategories]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Get_VirtualVideoCategories]
AS  
BEGIN  
     SELECT VirtualVideoCategoryID,VideoType from tblVirtualVideoCategory 
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_GETMEETINGCREDENTIALS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GETMEETINGCREDENTIALS]
AS
BEGIN
SELECT TOP 1 APIKEY,APISECRET FROM DBO.TBLMEETINGCREDENTIALS
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GETMEETINGDETAILS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GETMEETINGDETAILS]    
(
@bookingid int
)
AS    
BEGIN    
DECLARE @APIKEY NVARCHAR(100)  
SET @APIKEY = (SELECT APIKey FROM TBLMEETINGCREDENTIALS)  
SELECT MEETINGID,MEETINGPASSWORD,Signature,@APIKEY AS APIKEY FROM DBO.TBLMEETING  
WHERE ISDELETED='N' AND BOOKINGID= @bookingid  
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GETORDERDETAILS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GETORDERDETAILS]    
(    
@USERID INT NULL,    
@BOOKINGID INT NULL,    
@ORDERNO NVARCHAR(50) NULL,    
@INVOICENO  NVARCHAR(50) NULL,  
@CARTTYPE NVARCHAR(20) NULL  
)    
AS    
BEGIN    
IF(@CARTTYPE = 'SERVICE' OR @CARTTYPE = 'ASTROLOGY' OR @CARTTYPE = 'VIRTUAL')    
BEGIN  
SELECT SERVICENAME=(CASE WHEN B.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
						 WHEN B.BookingType='ASTROLOGY' THEN A.ASTROLOGYNAME 
						 WHEN B.BookingType='VIRTUALPOOJA'  THEN 'Virtual - ' + S.SERVICENAME 	
						 WHEN B.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual - Astrology -' + A.ASTROLOGYNAME 	 	
						 END),
B.ORDERNO,CONVERT(VARCHAR,P.PAYMENTDATE,103) AS PAYMENTDATE,U.USER_EMAILID AS EMAILID,P.AMOUNTPAID AS TOTAL,M.MODEOFPAYMENT FROM DBO.TBLPAYMENT P JOIN DBO.TBLBOOKING B ON P.BOOKINGID=B.BOOKINGID JOIN DBO.TBLBILLING L ON     
L.BOOKINGID=P.BOOKINGID JOIN DBO.TBLUSER U ON U.USERID=P.USERID JOIN DBO.TBLMODEOFPAYMENT M ON P.MODEOFPAYMENTID=M.MODEOFPAYMENTID    
LEFT JOIN  DBO.TBLSERVICE S ON S.SERVICEID=B.SERVICEID   
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=B.ServiceID
WHERE P.INVOICENO=@INVOICENO   
END  
IF(@CARTTYPE = 'ECART')    
BEGIN  
SELECT PR.PRODUCTNAME AS SERVICENAME,B.ORDERNO,CONVERT(VARCHAR,P.PAYMENTDATE,103) AS PAYMENTDATE,U.USER_EMAILID AS EMAILID,P.AMOUNTPAID AS TOTAL,M.MODEOFPAYMENT FROM DBO.TBLPRODUCTPAYMENT P JOIN DBO.TBLPRODUCTBOOKING B ON P.BOOKINGID=B.BOOKINGID JOIN DBO.
TBLPRODUCTBILLING L ON     
L.BOOKINGID=P.BOOKINGID JOIN DBO.TBLUSER U ON U.USERID=P.USERID JOIN DBO.TBLMODEOFPAYMENT M ON P.MODEOFPAYMENTID=M.MODEOFPAYMENTID    
JOIN DBO.TBLPRODUCT PR ON PR.PRODUCTID=B.PRODUCTID    
WHERE P.INVOICENO=@INVOICENO   
END  
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GetPatientData]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GetPatientData]
AS
BEGIN
SELECT PatientName,PatientIllness FROM DBO.TBLPATIENT
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GETSERVICEDETAILS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GETSERVICEDETAILS]    
@SERVICEID INT    
AS    
BEGIN    
SELECT DISTINCT VS.VENDORID,S.SERVICEID,SERVICETYPEID, SERVICENAME, SERVICE_SHORT_DESCRIPTION AS ShortDescription, SERVICE_LONG_DESCRIPTION AS LongDescription, K.INSIGHTNAME AS Insight FROM DBO.TBLSERVICE S     
JOIN DBO.[TBLKEYINSIGHTS] K ON K.SERVICEID=S.SERVICEID    
LEFT JOIN DBO.TBLVENDORSERVICE VS ON VS.SERVICEID=S.SERVICEID   
JOIN DBO.tblServiceCity SC ON SC.SERVICEID=S.SERVICEID  
JOIN DBO.TBLVENDOR V ON V.CITYID=SC.CITYID  
WHERE S.SERVICEID= @SERVICEID  
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GETSERVICES]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GETSERVICES]  
@SERVICETYPEID INT,  
@CITYID INT  
AS  
BEGIN  
SELECT S.SERVICEID,S.SERVICENAME FROM DBO.TBLSERVICE S JOIN DBO.TBLSERVICECITY C ON 
S.SERVICEID  = C.SERVICEID WHERE C.CITYID=@CITYID AND SERVICETYPEID=@SERVICETYPEID  
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GETSERVICETYPES]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GETSERVICETYPES]
@CITYID INT
AS
BEGIN
SELECT S.SERVICETYPEID,S.ServiceTypeName FROM DBO.TBLSERVICETYPE S JOIN DBO.TBLSERVICETYPECITY C ON 
S.ServiceTypeID  = C.ServiceTypeId WHERE C.CITYID=@CITYID
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GETSTORES]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GETSTORES]  
(  
@CITYID INT NULL  
  
)  
AS  
BEGIN  
SELECT S.StoreID,S.StoreName,S.OwnerName,C.CityName,S.Address, S.MobileNumber,S.EmailID  
FROM DBO.tblStoreRegistration S JOIN DBO.tblCity C ON S.CityID=C.CityID  
WHERE S.CityID=@CITYID AND S.Status=1  
end
GO
/****** Object:  StoredProcedure [dbo].[SP_GETUSERDETAILS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GETUSERDETAILS]
(
@USERID INT
)
AS
BEGIN
SELECT T.USER_NAME AS USERNAME,User_MobileNumber AS MOBILENUMBER,User_Address1 AS ADDRESS,User_EmailID AS EMAILID,
USER_PINCODE AS PINCODE, C.CityID,C.CityName
FROM DBO.TBLUSER T LEFT JOIN DBO.tblCity C ON C.CityID=T.CityID
WHERE USERID=@USERID
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GETVENDORS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_GETVENDORS]
(
@CITYID INT NULL

)
AS
BEGIN
SELECT V.VendorID,V.Vendor_FirstName AS VENDORNAME,C.CityName,V.Vendor_Address1 AS VEDNORADDRESS,
V.Vendor_MobileNumber AS MOBILENUMBER,V.Vendor_EmailID as EMAILID  FROM DBO.TBLVENDOR V JOIN DBO.tblCity C ON V.CityID=C.CityID
WHERE V.CityID=@CITYID AND V.Vendor_Status=1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_Insert_AstrologySlotBooking]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Insert_AstrologySlotBooking]
(
@Name nvarchar(50),@EmailID  nvarchar(50),@MobileNumber  nvarchar(50),@CityID int,@AstrologyID int,
@Gender  nvarchar(50),@DateOfBirth date,
@TimeOfBirth time(7),
@PlaceOfBirth nvarchar(50)
,@LanguageID int,@SlotDate date,@SlotTime nvarchar(50),@Description nvarchar(1000),@Amount decimal(18,2)
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY 
     Insert into tblAstrologySlotBooking(Name,EmailID,MobileNumber,CityID,AstrologyID,Gender,DateOfBirth,TimeOfBirth
	 ,LanguageID,SlotDate,SlotTime,Description,Status,PlaceOfBirth,Amount,IsDelete) 
	 values(@Name,@EmailID,@MobileNumber,@CityID,@AstrologyID,@Gender,@DateOfBirth,@TimeOfBirth
	 ,@LanguageID,@SlotDate,@SlotTime,@Description,1,@PlaceOfBirth,@Amount,'N')  
	 return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_Insert_Store]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Insert_Store]  
(
@StoreName nvarchar(50),@OwnerName nvarchar(50),@CityID int,@MobileNumber nvarchar(50)
,@EmailID nvarchar(50),@Address nvarchar(200),@PinCode nvarchar(10)
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY 
     Insert into tblStoreRegistration(StoreName,OwnerName,CityID,MobileNumber,EmailID,Address,PinCode,Status,UserTypeID) 
	 values(@StoreName,@OwnerName,@CityID,@MobileNumber,@EmailID,@Address,@PinCode,1,4)  
	 return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END  

GO
/****** Object:  StoredProcedure [dbo].[SP_Insert_StoreStock]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Insert_StoreStock]    
(  
@ProductID int,@ProductQuantity int,@StoreID int  
)  
AS  
BEGIN  
SET NOCOUNT ON;  
BEGIN  
TRY   
DECLARE @Product int  
--SET @Product=isnull((SELECT ProductQuantity FROM tblStoreStock where ProductID=@ProductID and StoreID=@StoreID),0)  
--IF(@Product=0)  
IF NOT EXISTS(SELECT ProductQuantity FROM tblStoreStock where ProductID=@ProductID and StoreID=@StoreID)
  BEGIN  
   Insert into tblStoreStock(StoreID,ProductID,ProductQuantity)   
  values(@StoreID,@ProductID,@ProductQuantity)   
  
  END  
ELSE  
  BEGIN  
	SET @Product = ISNULL((SELECT ProductQuantity FROM tblStoreStock where ProductID=@ProductID and StoreID=@StoreID),0)
     Update tblStoreStock SET  ProductQuantity=@ProductQuantity+@Product where ProductID=@ProductID and StoreID=@StoreID  
  END  
  return 1  
END TRY  
BEGIN CATCH  
return 0  
END CATCH  
END    
GO
/****** Object:  StoredProcedure [dbo].[SP_Insert_User]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Insert_User]    
(  
@User_MobileNumber nvarchar(50)  
)  
AS  
BEGIN  
SET NOCOUNT ON;  
BEGIN  
TRY   
	Declare @UserId int
     Insert into dbo.tblUser(User_MobileNumber,UserTypeID,User_Status,CreatedDate) values(@User_MobileNumber,1,1,GETDATE())    
	SET @UserId=SCOPE_IDENTITY()
	Select UserID,UserTypeID from tblUser where UserID=@UserId
END TRY  
BEGIN CATCH  
return 0  
END CATCH  
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Insert_Vendor]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_Insert_Vendor]
(
@TitleID int,@Vendor_FirstName nvarchar(50),@Vendor_MiddleName nvarchar(50),@Vendor_LastName nvarchar(50),
@Vendor_NickName nvarchar(50),@Vendor_Gothram nvarchar(50),@Vendor_FatherName nvarchar(50) ,@Vendor_Gender nvarchar(10),
@Vendor_Occupation nvarchar(50),@Vendor_Height decimal(18,2),@Vendor_Weight decimal(18,2),@Vendor_DOB nvarchar(50)
,@Vendor_Age int,@Vendor_PlaceofBirth nvarchar(50),@Vendor_Address1 nvarchar(500),@Vendor_PinCode1 nvarchar(50)
,@Vendor_Address2 nvarchar(500),@Vendor_PinCode2 nvarchar(50),@Vendor_MobileNumber nvarchar(50),
@Vendor_AlternateNumber nvarchar(50),@Vendor_EmailID nvarchar(50),@Vendor_PANNumber nvarchar(50),
@Vendor_AadharNumber nvarchar(50),@Vendor_IdentificationMark1 nvarchar(50),@Vendor_IdentificationMark2 nvarchar(50),
@Vendor_EmergencyContactPerson nvarchar(50),@Vendor_EmergencyContactNumber nvarchar(50),
@Vendor_NameOnPassBook nvarchar(50),@Vendor_BankName nvarchar(50),@Vendor_AccountNumber nvarchar(50)
,@Vendor_IFSCCode nvarchar(50),@CityID int
,@Vendor_MICRCode nvarchar(50),@Vendor_AreasOfActivity nvarchar(50),
@VendorCertifications TT_VendorCertifications READONLY ,
@VendorSocialNetworks TT_VendorSocialNetworks READONLY,
@VendorRelationShips TT_VendorRelationShip READONLY,
@VendorSpecializations TT_VendorSpecialization READONLY

)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY
DECLARE @VendorID int
INSERT INTO dbo.tblVendor (CityID,TitleID,Vendor_FirstName,Vendor_MiddleName,Vendor_LastName,
                           Vendor_NickName,Vendor_Gothram,Vendor_FatherName,Vendor_Gender,
  Vendor_Occupation,Vendor_Height,Vendor_Weight,Vendor_DOB,Vendor_Age,
  Vendor_PlaceofBirth,Vendor_Address1,Vendor_PinCode1,Vendor_Address2,Vendor_PinCode2,
  Vendor_MobileNumber,Vendor_AlternateNumber,Vendor_EmailID,Vendor_PANNumber,
                           Vendor_AadharNumber,Vendor_IdentificationMark1,Vendor_IdentificationMark2,
  Vendor_EmergencyContactPerson,Vendor_EmergencyContactNumber,
  Vendor_NameOnPassBook,Vendor_BankName,Vendor_AccountNumber,Vendor_IFSCCode,Vendor_MICRCode,
  Vendor_AreasOfActivity,UserTypeID,Vendor_Status,CreatedDate)
VALUES (@CityID,@TitleID,@Vendor_FirstName,@Vendor_MiddleName,@Vendor_LastName,
                           @Vendor_NickName,@Vendor_Gothram,@Vendor_FatherName,@Vendor_Gender,
  @Vendor_Occupation,@Vendor_Height,@Vendor_Weight,@Vendor_DOB,@Vendor_Age,
  @Vendor_PlaceofBirth,@Vendor_Address1,@Vendor_PinCode1,@Vendor_Address2,@Vendor_PinCode2,
  @Vendor_MobileNumber,@Vendor_AlternateNumber,@Vendor_EmailID,@Vendor_PANNumber,
                           @Vendor_AadharNumber,@Vendor_IdentificationMark1,@Vendor_IdentificationMark2,
  @Vendor_EmergencyContactPerson,@Vendor_EmergencyContactNumber,
  @Vendor_NameOnPassBook,@Vendor_BankName,@Vendor_AccountNumber,@Vendor_IFSCCode,@Vendor_MICRCode,
  @Vendor_AreasOfActivity,2,1,GETDATE())



SELECT @VendorID=@@IDENTITY
IF(SELECT COUNT(*)  FROM @VendorCertifications) > 0
BEGIN
INSERT INTO dbo.tblVendorCertifications(VendorID,CertificationID)
SELECT @VendorID,CertificationID  FROM @VendorCertifications
END

IF(SELECT COUNT(*)  FROM @VendorSocialNetworks) > 0
BEGIN
INSERT INTO [dbo].[tblVendorSocialNetwork] (VendorID,SocialNetworkID,SocialNetworkURL)
SELECT  @VendorID,SocialNetworkID,SocialNetworkURL FROM @VendorSocialNetworks
END
IF(SELECT COUNT(*)  FROM @VendorRelationShips) > 0 
BEGIN
INSERT INTO tblRelationShip (VendorID,RelationShipName,Name,Gender)
SELECT @VendorID,RelationShipName,Name,Gender FROM @VendorRelationShips

END
IF(SELECT COUNT(*)  FROM @VendorSpecializations) > 0
BEGIN
INSERT INTO tblSpecialization(VendorID,SpecializationName)
SELECT @VendorID,SpecializationName FROM @VendorSpecializations

END

return 1
END TRY
BEGIN CATCH
return 0
END CATCH

END
GO
/****** Object:  StoredProcedure [dbo].[SP_Insert_VirtualSlotBooking]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Insert_VirtualSlotBooking]
(
@Name nvarchar(50),@EmailID  nvarchar(50),@MobileNumber  nvarchar(50),@CityID int
,@LanguageID int,@Description nvarchar(500),@Amount decimal(18,2),
@ServiceType nvarchar(50),@ServiceID int,@VirtualVideoCategoryID int,@PackageId int
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY 
     Insert into tblVirtualSlotBooking(Name,EmailID,MobileNumber,CityID,ServiceType,ServiceID,PackageId,VirtualVideoCategoryID
	 ,LanguageID,Amount,Description) 
	 values(@Name,@EmailID,@MobileNumber,@CityID,@ServiceType,@ServiceID,@PackageId,@VirtualVideoCategoryID
	 ,@LanguageID,@Amount,@Description)  
	 return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END


alter table tblVirtualSlotBooking add PackageId int

GO
/****** Object:  StoredProcedure [dbo].[SP_InsertUpdate_Service]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_InsertUpdate_Service]  
(
@ServiceName nvarchar(50),@CityID int,@ServiceImage image,@ServiceTypeID int, @Action nvarchar(50),@ServiceID int,
@Servcie_Short_Description nvarchar(2000),@Service_Long_Description nvarchar(2000),@ServiceImageFile nvarchar(200)
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY 
IF(@Action='Save')
 BEGIN
  --DECLARE @ServiceTypeID int
     Insert into tblService(ServiceTypeID,ServiceName,ServiceImage,ServiceImageFile,Service_Short_Description,Service_Long_Description) 
	 values(@ServiceTypeID,@ServiceName,@ServiceImage,@ServiceImageFile,@Servcie_Short_Description,@Service_Long_Description) 
  SELECT @ServiceID=@@IDENTITY 
  BEGIN
     INSERT INTO tblServiceCity(ServiceID,CityID,IsDelete) values(@ServiceID,@CityID,'N')
	
  END
 END
IF(@Action='Update')
 BEGIN
  BEGIN
   UPDATE tblService SET ServiceTypeID=@ServiceTypeID,ServiceName=@ServiceName,ServiceImage=@ServiceImage,Service_Short_Description=
                         @Servcie_Short_Description,Service_Long_Description=@Service_Long_Description,ServiceImageFile=@ServiceImageFile
                      WHERE  ServiceID=@ServiceID
  END
  BEGIN
   UPDATE tblServiceCity SET CityID=@CityID WHERE ServiceID=@ServiceID 
  END
 END

	 return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_InsertUpdate_ServiceType]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_InsertUpdate_ServiceType]  
(
@ServiceTypeName nvarchar(50),@CityID int,@ServiceTypeImage image,@ServiceTypeID int, @Action nvarchar(50)
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY 

IF(@Action='Save')
 BEGIN
  --DECLARE @ServiceTypeID int
     Insert into tblServiceType(ServiceTypeName,ServiceTypeImage) values(@ServiceTypeName,@ServiceTypeImage) 
  SELECT @ServiceTypeID=@@IDENTITY 
  BEGIN
     INSERT INTO tblServiceTypeCity(ServiceTypeID,CityID,IsDelete) values(@ServiceTypeID,@CityID,'N')
  END
 END
IF(@Action='Update')
 BEGIN
  BEGIN
   UPDATE tblServiceType SET ServiceTypeName=@ServiceTypeName,ServiceTypeImage=@ServiceTypeImage
                      WHERE ServiceTypeID=@ServiceTypeID 
  END
  BEGIN
   UPDATE tblServiceTypeCity SET CityID=@CityID WHERE ServiceTypeID=@ServiceTypeID 
  END
 END

	 return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_InsertVendorEnquiry]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_InsertVendorEnquiry]  
(
@Name nvarchar(50),
@MobileNumber nvarchar(250),
@EmailID varchar(50),
@Description nvarchar(200),
@CityID int
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY  
     Insert into dbo.tblVendorEnquiry(Name,MobileNumber,EmailID,CityID,Description) values(@Name,@MobileNumber,@EmailID,@CityID,@Description)  
	 return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END  
GO
/****** Object:  StoredProcedure [dbo].[SP_PRODUCTBOOKING]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_PRODUCTBOOKING]
(
@StoreID INT,
@BOOKINGTYPE NVARCHAR(50),
@PRODUCTID INT,
@BOOKINGSTATUSID INT,
@USERID INT,
@BOOKINGLOCATION NVARCHAR(100),
@ReviewComments NVARCHAR(100),
@ISDIFFERENTLOCATION NVARCHAR(1),
@CITYID INT,
@PINCODE NVARCHAR(20),
@NEWCITYID INT,
@NEWPINCODE NVARCHAR(20),
@NEWADDRESS NVARCHAR(100),
@USERNAME NVARCHAR(50),
@MOBILENUMBER NVARCHAR(50),
@EMAILID NVARCHAR(50),
@ORDERNO NVARCHAR(50),
@PAYMENTMODE INT,
@PAYMENTSTATUS INT,
@INVOICENO NVARCHAR(50),
@TOTALAMOUNT INT,
@QUANTITY INT

)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY
DECLARE @BOOKINGID INT

IF(@USERID <> 0)
BEGIN
UPDATE DBO.TBLUSER SET USER_NAME=@USERNAME,USER_MOBILENUMBER=@MOBILENUMBER,USER_EMAILID=@EMAILID,
	CITYID=@CITYID, USER_ADDRESS1=@BOOKINGLOCATION, USER_PINCODE=@PINCODE, MODIFIEDDATE=GETDATE()
	WHERE USERID=@USERID
END
ELSE
BEGIN
IF EXISTS (SELECT USER_MOBILENUMBER FROM DBO.TBLUSER WHERE USER_MOBILENUMBER=@MOBILENUMBER)
BEGIN
UPDATE DBO.TBLUSER SET USER_NAME=@USERNAME,USER_EMAILID=@EMAILID,
	CITYID=@CITYID, USER_ADDRESS1=@BOOKINGLOCATION, USER_PINCODE=@PINCODE, MODIFIEDDATE=GETDATE()
	WHERE USER_MOBILENUMBER=@MOBILENUMBER
SET @USERID=(SELECT UserID FROM DBO.TBLUSER WHERE USER_MOBILENUMBER=@MOBILENUMBER)
END
ELSE
BEGIN
INSERT INTO DBO.TBLUSER (USER_NAME,USER_MOBILENUMBER,USER_EMAILID,CITYID,USER_ADDRESS1,USER_PINCODE,CREATEDDATE,UserTypeID,User_Status)
VALUES (@USERNAME,@MOBILENUMBER,@EMAILID,@CITYID,@BOOKINGLOCATION,@PINCODE,GETDATE(),1,1)
SET @USERID=SCOPE_IDENTITY()
END
END

INSERT INTO [dbo].[tblProductBooking]
           ([BookingDate]
           ,[StoreID]
           ,[BookingType]
           ,[ProductID]
           ,[ProductBookingStatusID]
           ,[UserID]
           ,[BookingLocation]
           ,[ReviewComments]
           ,[BookingTime]
		   ,CREATEDDATE
		   ,UPDATEDDATE
		   ,BOOKINGAMOUNT
		   ,ORDERNO
		   ,QUANTITY)
     VALUES(
           GETDATE(),
           @StoreID,
           @BookingType,
           @PRODUCTID, 
           @BookingStatusID, 
           @UserID, 
           @BookingLocation,
           @ReviewComments, 
           convert(varchar(10), GETDATE(), 108),
		   GETDATE(),
		   GETDATE(),
		   @TOTALAMOUNT,
		   @ORDERNO,
		   @QUANTITY
		   )

SET @BOOKINGID=SCOPE_IDENTITY()

INSERT INTO DBO.TBLPRODUCTBILLING(BOOKINGID,USERID,BILLINGADDRESS,CITYID,PINCODE,CREATEDDATE,UPDATEDDATE)
VALUES (@BOOKINGID,@USERID,
		CASE WHEN @ISDIFFERENTLOCATION = 'Y' THEN @NEWADDRESS ELSE @BOOKINGLOCATION END,
		CASE WHEN @ISDIFFERENTLOCATION = 'Y' THEN @NEWCITYID ELSE @CITYID END,
		CASE WHEN @ISDIFFERENTLOCATION = 'Y' THEN @NEWPINCODE ELSE @PINCODE END,
		GETDATE(),
		GETDATE()
		)

INSERT INTO DBO.TBLPRODUCTPAYMENT(USERID,MODEOFPAYMENTID,PAYMENTDATE,PAYMENTSTATUS,VENDORID,AMOUNTPAID,INVOICENO,BOOKINGID)
VALUES (@USERID,@PAYMENTMODE,GETDATE(),@PAYMENTSTATUS,@StoreID,@TOTALAMOUNT,@INVOICENO,@BOOKINGID)



return 1
END TRY
BEGIN CATCH
return 0
END CATCH

END
GO
/****** Object:  StoredProcedure [dbo].[SP_PRODUCTCHANGEBOOKINGSTATUS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_PRODUCTCHANGEBOOKINGSTATUS]    
(    
@BOOKINGID INT,    
@BOOKINGSTATUSID INT    
)    
AS    
BEGIN    
BEGIN TRY    
DECLARE @PRODUCTID INT, @STOREID INT, @ProductQuantity INT
UPDATE DBO.TBLPRODUCTBOOKING SET PRODUCTBOOKINGSTATUSID=@BOOKINGSTATUSID,UpdatedDate=GETDATE() 
WHERE BOOKINGID=@BOOKINGID  
IF(@BOOKINGSTATUSID = 5)
BEGIN
SET @PRODUCTID= (SELECT ProductId FROM DBO.tblProductBooking WHERE BookingID=@BOOKINGID)
SET @STOREID= (SELECT StoreID FROM DBO.tblProductBooking WHERE BookingID=@BOOKINGID)
SET @ProductQuantity = ISNULL((SELECT ProductQuantity FROM tblStoreStock where ProductID=@ProductID and StoreID=@StoreID),0)
IF(@ProductQuantity <> 0)
BEGIN
Update DBO.tblStoreStock SET  ProductQuantity=@ProductQuantity - 1 where ProductID=@ProductID and StoreID=@StoreID  
END
END

RETURN 1    
END TRY    
BEGIN CATCH    
RETURN 0    
END CATCH    
END
GO
/****** Object:  StoredProcedure [dbo].[sp_RegisterUser]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[sp_RegisterUser]
(
@name nvarchar(50),
@email nvarchar(50)
--@id int output
)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY
INSERT INTO dbo.tblUser (User_Name,User_EmailID)
VALUES (@name,@email)
return 1
END TRY
BEGIN CATCH
return 0
END CATCH
--SET @id=SCOPE_IDENTITY()
--      RETURN  @id
END
GO
/****** Object:  StoredProcedure [dbo].[sp_savepatient]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_savepatient]
(
@PatientName NVARCHAR(50),
@PatientIllness nvarchar(50)
)
as
begin
insert into dbo.tblPatient values (@PatientName,@PatientIllness)
return 1
end
GO
/****** Object:  StoredProcedure [dbo].[SP_SCHEDULEMEETING]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_SCHEDULEMEETING]  
(  
@MEETINGID NVARCHAR(50),  
@MEETINGPASSWORD NVARCHAR(50),  
@MEETINGSIGNATURE NVARCHAR(MAX),
@BookingId INT
)  
AS  
BEGIN  
BEGIN TRY  
IF NOT EXISTS(SELECT MEETINGID FROM DBO.tblMeeting WHERE BOOKINGID=@BookingId)
BEGIN
INSERT INTO dbo.TBLMEETING(MEETINGID,MEETINGPASSWORD,[SIGNATURE],ISDELETED,CREATEDDATE,CREATEDBY,BOOKINGID)  
VALUES(@MEETINGID,@MEETINGPASSWORD,@MEETINGSIGNATURE,'N',GETDATE(),'Admin',@BookingId)  
END
ELSE
BEGIN
UPDATE dbo.TBLMEETING SET MeetingId=@MEETINGID, MeetingPassword=@MEETINGPASSWORD, Signature=@MEETINGSIGNATURE
WHERE BOOKINGID=@BookingId
END
RETURN 1  
END TRY    
BEGIN CATCH    
return 0    
END CATCH    
END
GO
/****** Object:  StoredProcedure [dbo].[SP_SEARCHSERVICE]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_SEARCHSERVICE]  
(  
@SEARCH NVARCHAR(50),
@CITYID INT
)  
AS  
BEGIN  

SELECT * FROM DBO.tblService S JOIN tblServiceCity SC ON S.ServiceID=SC.ServiceID
WHERE CityId=@CITYID AND SERVICENAME LIKE '%' + @SEARCH + '%' OR KEYWORD LIKE '%' + @SEARCH + '%'  

END 
GO
/****** Object:  StoredProcedure [dbo].[SP_STOCKDETAILS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_STOCKDETAILS]
(
@STOREID INT
)
AS
BEGIN
SELECT P.ProductID,P.ProductName,P.ProductPrice,S.StoreStockID,S.ProductQuantity
FROM DBO.tblStoreStock S JOIN tblProduct P ON S.ProductID=P.ProductID
WHERE StoreID=@STOREID
END
GO
/****** Object:  StoredProcedure [dbo].[SP_STOREORDERDETAILS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_STOREORDERDETAILS]
(
@STOREID INT,
@STORETYPE VARCHAR(50),
@CALENDARTYPE NVARCHAR(50) 
)
AS
BEGIN
IF(@CALENDARTYPE = 'CURRENT')  
BEGIN 
SELECT isnull(ST.ProductQuantity,0) AS STOREQUANTITY,B.BookingID,b.QUANTITY,B.PRODUCTID,PR.PRODUCTNAME,B.ORDERNO,CONVERT(VARCHAR,P.PAYMENTDATE,103) AS BookingDate,U.USER_EMAILID AS EMAILID,
U.User_Name AS USERNAME, L.BillingAddress,C.CityName,U.User_MobileNumber AS MOBILENUMBER,CONVERT(varchar(15),B.BookingTime,100) AS BookingTime,
PS.BookingStatusName AS BOOKINGSTATUS,B.RatingsID,B.ReviewComments,L.PinCode,B.ProductBookingStatusID AS BookingStatusID,
P.AMOUNTPAID AS TOTAL,M.MODEOFPAYMENT FROM DBO.TBLPRODUCTPAYMENT P JOIN DBO.TBLPRODUCTBOOKING B ON P.BOOKINGID=B.BOOKINGID 
JOIN DBO.TBLPRODUCTBILLING L ON L.BOOKINGID=P.BOOKINGID JOIN DBO.TBLUSER U ON U.USERID=P.USERID
JOIN tblCity C ON C.CityID=L.CityId  
JOIN DBO.TBLMODEOFPAYMENT M ON P.MODEOFPAYMENTID=M.MODEOFPAYMENTID      
JOIN DBO.TBLPRODUCT PR ON PR.PRODUCTID=B.PRODUCTID 
JOIN DBO.tblStoreRegistration S ON S.StoreID=B.StoreID AND S.Status=1
JOIN tblProductBookingStatus PS ON PS.BookingStatusID=B.ProductBookingStatusID   
LEFT JOIN DBO.tblStoreStock ST ON ST.StoreID=B.StoreID AND ST.ProductID=B.ProductId
WHERE S.StoreID=@STOREID AND B.ProductBookingStatusID <> 7 AND CAST(B.UpdatedDate AS DATE) >= CAST(GETDATE() AS DATE) 
ORDER BY B.UpdatedDate DESC
END
IF(@CALENDARTYPE = 'HISTORY')  
BEGIN 
SELECT isnull(ST.ProductQuantity,0) AS STOREQUANTITY,B.BookingID,B.QUANTITY,B.PRODUCTID,PR.PRODUCTNAME,B.ORDERNO,CONVERT(VARCHAR,P.PAYMENTDATE,103) AS BookingDate,U.USER_EMAILID AS EMAILID,
U.User_Name AS USERNAME, L.BillingAddress,C.CityName,U.User_MobileNumber AS MOBILENUMBER,CONVERT(varchar(15),B.BookingTime,100) AS BookingTime,
PS.BookingStatusName AS BOOKINGSTATUS,B.RatingsID,B.ReviewComments,L.PinCode,B.ProductBookingStatusID AS BookingStatusID,
P.AMOUNTPAID AS TOTAL,M.MODEOFPAYMENT FROM DBO.TBLPRODUCTPAYMENT P JOIN DBO.TBLPRODUCTBOOKING B ON P.BOOKINGID=B.BOOKINGID 
JOIN DBO.TBLPRODUCTBILLING L ON L.BOOKINGID=P.BOOKINGID JOIN DBO.TBLUSER U ON U.USERID=P.USERID
JOIN tblCity C ON C.CityID=L.CityId  
JOIN DBO.TBLMODEOFPAYMENT M ON P.MODEOFPAYMENTID=M.MODEOFPAYMENTID      
JOIN DBO.TBLPRODUCT PR ON PR.PRODUCTID=B.PRODUCTID 
JOIN DBO.tblStoreRegistration S ON S.StoreID=B.StoreID AND S.Status=1
JOIN tblProductBookingStatus PS ON PS.BookingStatusID=B.ProductBookingStatusID 
LEFT JOIN DBO.tblStoreStock ST ON ST.StoreID=B.StoreID AND ST.ProductID=B.ProductId
WHERE S.StoreID=@STOREID AND B.ProductBookingStatusID  IN (4,5) AND CAST(B.UpdatedDate AS DATE) < CAST(GETDATE() AS DATE) 
ORDER BY B.UpdatedDate DESC
END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_test]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_test]
(
@testtype testtype READONLY
)
as
begin
insert into test 
select 4, ActivityName, Rating from  @testtype
end
GO
/****** Object:  StoredProcedure [dbo].[sp_testdata]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[sp_testdata]
as
begin
select StateID,StateName from tblState
select * from tblCity
end
GO
/****** Object:  StoredProcedure [dbo].[SP_Update_UserProfile]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SP_Update_UserProfile]      
(    
@UserId int,  
@User_MobileNumber nvarchar(50),    
@CountryID int,@StateID int,@CityID int,    
@User_Name nvarchar(50),    
@User_EmailID nvarchar(50),@User_Address1 nvarchar(50),@User_PinCode nvarchar(50)    
--@User_Status nvarchar(50),@User_Latitude nvarchar(50),@User_Longitude nvarchar(50)    
)    
AS    
BEGIN    
SET NOCOUNT ON;    
BEGIN    
TRY     
     update dbo.tblUser set User_Name=@User_Name, CountryID=@CountryID,StateID=@StateID,CityID=@CityID,User_EmailID=@User_EmailID,    
  User_Address1=@User_Address1,User_PinCode=@User_PinCode,User_Status='1', User_MobileNumber=@User_MobileNumber,  
 modifieddate=getdate()  
   where UserId=@UserId    
  return 1    
END TRY    
BEGIN CATCH    
return 0    
END CATCH    
END 
GO
/****** Object:  StoredProcedure [dbo].[SP_Update_Vendor]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_Update_Vendor]
(
@TitleID int,@Vendor_FirstName nvarchar(50),@Vendor_MiddleName nvarchar(50),@Vendor_LastName nvarchar(50),
@Vendor_NickName nvarchar(50),@Vendor_Gothram nvarchar(50),@Vendor_FatherName nvarchar(50) ,@Vendor_Gender nvarchar(10),
@Vendor_Occupation nvarchar(50),@Vendor_Height decimal(18,2),@Vendor_Weight decimal(18,2),@Vendor_DOB nvarchar(50)
,@Vendor_Age int,@Vendor_PlaceofBirth nvarchar(50),@Vendor_Address1 nvarchar(500),@Vendor_PinCode1 nvarchar(50)
,@Vendor_Address2 nvarchar(500),@Vendor_PinCode2 nvarchar(50),@Vendor_MobileNumber nvarchar(50),
@Vendor_AlternateNumber nvarchar(50),@Vendor_EmailID nvarchar(50),@Vendor_PANNumber nvarchar(50),
@Vendor_AadharNumber nvarchar(50),@Vendor_IdentificationMark1 nvarchar(50),@Vendor_IdentificationMark2 nvarchar(50),
@Vendor_EmergencyContactPerson nvarchar(50),@Vendor_EmergencyContactNumber nvarchar(50),
@Vendor_NameOnPassBook nvarchar(50),@Vendor_BankName nvarchar(50),@Vendor_AccountNumber nvarchar(50)
,@Vendor_IFSCCode nvarchar(50),@CityID int,@VendorID int
,@Vendor_MICRCode nvarchar(50),@Vendor_AreasOfActivity nvarchar(50),
@VendorCertifications TT_VendorCertifications READONLY ,
@VendorSocialNetworks TT_VendorSocialNetworks READONLY,
@VendorRelationShips TT_VendorRelationShip READONLY,
@VendorSpecializations TT_VendorSpecialization READONLY

)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY
--DECLARE @VendorID int
UPDATE  dbo.tblVendor SET CityID=@CityID,TitleID=@TitleID,Vendor_FirstName=@Vendor_FirstName,
                           Vendor_MiddleName=@Vendor_MiddleName,Vendor_LastName=@Vendor_LastName,
                           Vendor_NickName=@Vendor_NickName,Vendor_Gothram=@Vendor_Gothram,
						   Vendor_FatherName=@Vendor_FatherName,Vendor_Gender=@Vendor_Gender,
                           Vendor_Occupation=@Vendor_Occupation,Vendor_Height=@Vendor_Height,
						   Vendor_Weight=@Vendor_Weight,Vendor_DOB=@Vendor_DOB,Vendor_Age=@Vendor_Age,
                           Vendor_PlaceofBirth=@Vendor_PlaceofBirth,Vendor_Address1=@Vendor_Address1,
						   Vendor_PinCode1=@Vendor_PinCode1,Vendor_Address2=@Vendor_Address2,
						   Vendor_PinCode2=@Vendor_PinCode2,Vendor_MobileNumber=@Vendor_MobileNumber,
						   Vendor_AlternateNumber=@Vendor_AlternateNumber,Vendor_EmailID=@Vendor_EmailID,
						   Vendor_PANNumber=@Vendor_PANNumber,Vendor_AadharNumber=@Vendor_AadharNumber,
						   Vendor_IdentificationMark1=@Vendor_IdentificationMark1,Vendor_IdentificationMark2=@Vendor_IdentificationMark2,
						   Vendor_EmergencyContactPerson=@Vendor_EmergencyContactPerson,Vendor_EmergencyContactNumber=@Vendor_EmergencyContactNumber,
                           Vendor_NameOnPassBook=@Vendor_NameOnPassBook,Vendor_BankName=@Vendor_BankName,
						   Vendor_AccountNumber=@Vendor_AccountNumber,Vendor_IFSCCode=@Vendor_IFSCCode,
						   Vendor_MICRCode=@Vendor_MICRCode,Vendor_AreasOfActivity=@Vendor_AreasOfActivity,
						   UserTypeID=2,Vendor_Status=1,CreatedDate=GETDATE()
      where VendorID=@VendorID

IF(SELECT COUNT(*)  FROM @VendorCertifications) > 0
BEGIN
DELETE FROM tblVendorCertifications where VendorID=@VendorID
INSERT INTO dbo.tblVendorCertifications(VendorID,CertificationID)
SELECT @VendorID,CertificationID  FROM @VendorCertifications
END

IF(SELECT COUNT(*)  FROM @VendorSocialNetworks) > 0
BEGIN
DELETE FROM tblVendorSocialNetwork where VendorID=@VendorID
INSERT INTO [dbo].[tblVendorSocialNetwork] (VendorID,SocialNetworkID,SocialNetworkURL)
SELECT  @VendorID,SocialNetworkID,SocialNetworkURL FROM @VendorSocialNetworks
END
IF(SELECT COUNT(*)  FROM @VendorRelationShips) > 0 
BEGIN
DELETE FROM tblRelationShip where VendorID=@VendorID
INSERT INTO tblRelationShip (VendorID,RelationShipName,Name,Gender)
SELECT @VendorID,RelationShipName,Name,Gender FROM @VendorRelationShips

END
IF(SELECT COUNT(*)  FROM @VendorSpecializations) > 0
BEGIN
DELETE FROM tblSpecialization where VendorID=@VendorID
INSERT INTO tblSpecialization(VendorID,SpecializationName)
SELECT @VendorID,SpecializationName FROM @VendorSpecializations

END

return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_UPDATEUSERRATING]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[SP_UPDATEUSERRATING]
(
@BOOKINGID INT,
@RATINGS  INT,
@REVIEWCOMMENTS NVARCHAR(100)
)
AS
BEGIN
BEGIN TRY
UPDATE DBO.tblBooking SET RatingsID=@RATINGS,ReviewComments=@REVIEWCOMMENTS WHERE BookingID=@BOOKINGID
return 1
END TRY
BEGIN CATCH
return 0
END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[SP_USERBOOKING]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_USERBOOKING]
(
@BOOKINGDATE DATETIME,
@VENDORID INT,
@BOOKINGTYPE NVARCHAR(50),
@SERVICETYPEID INT,
@SERVICEID INT,
@BOOKINGSTATUSID INT,
@USERID INT,
@BOOKINGLOCATION NVARCHAR(100),
@BOOKINGTIME TIME,
@ReviewComments NVARCHAR(100),
@ISDIFFERENTLOCATION NVARCHAR(1),
@CITYID INT,
@PINCODE NVARCHAR(20),
@NEWCITYID INT,
@NEWPINCODE NVARCHAR(20),
@NEWADDRESS NVARCHAR(100),
@USERNAME NVARCHAR(50),
@MOBILENUMBER NVARCHAR(50),
@EMAILID NVARCHAR(50),
@PACKAGEID INT,
@ORDERNO NVARCHAR(50),
@PAYMENTMODE INT,
@PAYMENTSTATUS INT,
@INVOICENO NVARCHAR(50),
@TOTALAMOUNT INT

)
AS
BEGIN
SET NOCOUNT ON;
BEGIN
TRY
DECLARE @BOOKINGID INT

IF(@USERID <> 0)
BEGIN
UPDATE DBO.TBLUSER SET USER_NAME=@USERNAME,USER_MOBILENUMBER=@MOBILENUMBER,USER_EMAILID=@EMAILID,
	CITYID=@CITYID, USER_ADDRESS1=@BOOKINGLOCATION, USER_PINCODE=@PINCODE, MODIFIEDDATE=GETDATE()
	WHERE USERID=@USERID
END
ELSE
BEGIN
IF EXISTS (SELECT USER_MOBILENUMBER FROM DBO.TBLUSER WHERE USER_MOBILENUMBER=@MOBILENUMBER)
BEGIN
UPDATE DBO.TBLUSER SET USER_NAME=@USERNAME,USER_EMAILID=@EMAILID,
	CITYID=@CITYID, USER_ADDRESS1=@BOOKINGLOCATION, USER_PINCODE=@PINCODE, MODIFIEDDATE=GETDATE()
	WHERE USER_MOBILENUMBER=@MOBILENUMBER
SET @USERID=(SELECT UserID FROM DBO.TBLUSER WHERE USER_MOBILENUMBER=@MOBILENUMBER)
END
ELSE
BEGIN
INSERT INTO DBO.TBLUSER (USER_NAME,USER_MOBILENUMBER,USER_EMAILID,CITYID,USER_ADDRESS1,USER_PINCODE,CREATEDDATE,UserTypeID,User_Status)
VALUES (@USERNAME,@MOBILENUMBER,@EMAILID,@CITYID,@BOOKINGLOCATION,@PINCODE,GETDATE(),1,1)
SET @USERID=SCOPE_IDENTITY()
END
END

INSERT INTO [dbo].[tblBooking]
           ([BookingDate]
           ,[VendorID]
           ,[BookingType]
           ,[ServiceTypeID]
           ,[ServiceID]
           ,[BookingStatusID]
           ,[UserID]
           ,[BookingLocation]
           ,[ReviewComments]
           ,[BookingTime]
		   ,PACKAGEID
		   ,CREATEDDATE
		   ,UPDATEDDATE
		   ,BOOKINGAMOUNT
		   ,ORDERNO)
     VALUES(
           @BookingDate,
           @VendorID,
           @BookingType,
           @ServiceTypeID, 
           @ServiceID, 
           @BookingStatusID, 
           @UserID, 
           @BookingLocation,
           @ReviewComments, 
           @BookingTime,
		   @PACKAGEID,
		   GETDATE(),
		   GETDATE(),
		   @TOTALAMOUNT,
		   @ORDERNO
		   )

SET @BOOKINGID=SCOPE_IDENTITY()

INSERT INTO DBO.TBLBILLING(BOOKINGID,USERID,BILLINGADDRESS,CITYID,PINCODE,CREATEDDATE,UPDATEDDATE)
VALUES (@BOOKINGID,@USERID,
		CASE WHEN @ISDIFFERENTLOCATION = 'Y' THEN @NEWADDRESS ELSE @BOOKINGLOCATION END,
		CASE WHEN @ISDIFFERENTLOCATION = 'Y' THEN @NEWCITYID ELSE @CITYID END,
		CASE WHEN @ISDIFFERENTLOCATION = 'Y' THEN @NEWPINCODE ELSE @PINCODE END,
		GETDATE(),
		GETDATE()
		)

INSERT INTO DBO.TBLPAYMENT(USERID,MODEOFPAYMENTID,PAYMENTDATE,PAYMENTSTATUS,VENDORID,AMOUNTPAID,INVOICENO,BOOKINGID)
VALUES (@USERID,@PAYMENTMODE,GETDATE(),@PAYMENTSTATUS,@VENDORID,@TOTALAMOUNT,@INVOICENO,@BOOKINGID)



return 1
END TRY
BEGIN CATCH
return 0
END CATCH

END
GO
/****** Object:  StoredProcedure [dbo].[SP_USERONGOING]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_USERONGOING]
(
@USERID INT,
@CALENDARTYPE NVARCHAR(50) 
)
AS
BEGIN
IF(@CALENDARTYPE = 'CURRENT')  
BEGIN 
SELECT SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME 
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 	
					END),
BK.BOOKINGTYPE,BK.BOOKINGAMOUNT AS TOTAL, BK.BookingStatusID,BK.BOOKINGID,CONVERT(varchar(15),BK.TIMEIN,100) AS TIMEIN,CONVERT(varchar(15),BK.TIMEOUT,100) AS TIMEOUT,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,
BK.BOOKINGLOCATION,CONVERT(varchar(15),BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS,
V.Vendor_MobileNumber AS MobileNumber, C.CITYNAME ,V.Vendor_EmailID AS EMAILID, MP.ModeOfPayment, PK.PackageName,BK.RatingsID,BK.ReviewComments,L.PinCode,L.BillingAddress
FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID
left JOIN DBO.TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN DBO.TBLBOOKINGSTATUS BS ON	BK.BookingStatusID=BS.BookingStatusID
JOIN DBO.TBLBILLING L ON L.BOOKINGID=BK.BOOKINGID 
JOIN DBO.tblCity C ON C.CityID=l.CityID
left JOIN dbo.tblPackages PK ON PK.PackageID=BK.PACKAGEID 
JOIN dbo.tblPayment PT ON PT.BOOKINGID=BK.BookingID
JOIN DBO.tblModeOfPayment MP ON PT.ModeofPaymentID=MP.ModeOfPaymentID
WHERE U.USERID=@USERID AND  CAST(BK.BookingDate AS DATE) >= CAST(GETDATE() AS DATE)   ORDER BY BK.CREATEDDATE DESC
END
IF(@CALENDARTYPE = 'HISTORY')  
BEGIN  
SELECT  SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 	
					END),
BK.BOOKINGTYPE,BK.BOOKINGAMOUNT AS TOTAL, BK.BookingStatusID,BK.BOOKINGID,CONVERT(varchar(15),BK.TIMEIN,100) AS TIMEIN,CONVERT(varchar(15),BK.TIMEOUT,100) AS TIMEOUT,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,
BK.BOOKINGLOCATION,CONVERT(varchar(15),BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS,
V.Vendor_MobileNumber AS MobileNumber, C.CITYNAME ,V.Vendor_EmailID AS EMAILID, MP.ModeOfPayment, PK.PackageName,BK.RatingsID,BK.ReviewComments,L.PinCode,L.BillingAddress
FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID
left JOIN TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN TBLBOOKINGSTATUS BS ON	BK.BookingStatusID=BS.BookingStatusID
--JOIN DBO.tblCity C ON C.CityID=V.CityID
JOIN DBO.TBLBILLING L ON L.BOOKINGID=BK.BOOKINGID
JOIN DBO.tblCity C ON C.CityID=l.CityID
left JOIN dbo.tblPackages PK ON PK.PackageID=BK.PACKAGEID 
JOIN dbo.tblPayment PT ON PT.BOOKINGID=BK.BookingID
JOIN DBO.tblModeOfPayment MP ON PT.ModeofPaymentID=MP.ModeOfPaymentID
WHERE U.USERID=@USERID AND  CAST(BK.BookingDate AS DATE) < CAST(GETDATE() AS DATE)   ORDER BY BK.CREATEDDATE DESC
END

END
GO
/****** Object:  StoredProcedure [dbo].[SP_USERPACKAGES]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_USERPACKAGES]    
(    
@SERVICEID INT    
)    
AS    
BEGIN    
SELECT P.PackageID,P.PackageName,P.PRICE,R.PROCEDURENAME,I.ITEMNAME,I.ITEMPRICE,S.SERVICENAME,C.CITYNAME FROM DBO.TBLPACKAGES P left JOIN DBO.TBLPROCEDURE R ON P.PackageID=R.PACKAGEID     
left JOIN  DBO.TBLPOOJAITEM I ON I.PACKAGEID=P.PackageID JOIN DBO.TBLSERVICE S ON P.ServiceId=S.ServiceId JOIN DBO.TBLSERVICECITY SC ON  S.ServiceID=SC.ServiceId   
JOIN DBO.TBLCITY C ON C.CityID=SC.CITYID WHERE P.ServiceId=@SERVICEID 
END
GO
/****** Object:  StoredProcedure [dbo].[SP_USERPRODUCTORDERDETAILS]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_USERPRODUCTORDERDETAILS]
(
@USERID INT,
@USERTYPE VARCHAR(50),
@CALENDARTYPE NVARCHAR(50) 
)
AS
BEGIN
IF(@CALENDARTYPE = 'CURRENT')  
BEGIN 
SELECT B.BookingID,b.QUANTITY,B.PRODUCTID,PR.PRODUCTNAME,B.ORDERNO,CONVERT(VARCHAR,P.PAYMENTDATE,103) AS BookingDate,U.USER_EMAILID AS EMAILID,
U.User_Name AS USERNAME, L.BillingAddress,C.CityName,U.User_MobileNumber AS MOBILENUMBER,CONVERT(varchar(15),B.BookingTime,100) AS BookingTime,
PS.BookingStatusName AS BOOKINGSTATUS,B.RatingsID,B.ReviewComments,L.PinCode,B.ProductBookingStatusID AS BookingStatusID,
S.StoreID,S.StoreName,S.OwnerName,S.MobileNumber AS STOREMOBILENUMBER,S.EmailID AS STOREEMAILID,S.Address AS STOREADDRESS,
S.PinCode AS STOREPINCODE,
P.AMOUNTPAID AS TOTAL,M.MODEOFPAYMENT FROM DBO.TBLPRODUCTPAYMENT P JOIN DBO.TBLPRODUCTBOOKING B ON P.BOOKINGID=B.BOOKINGID 
JOIN DBO.TBLPRODUCTBILLING L ON L.BOOKINGID=P.BOOKINGID JOIN DBO.TBLUSER U ON U.USERID=P.USERID
JOIN tblCity C ON C.CityID=L.CityId  
JOIN DBO.TBLMODEOFPAYMENT M ON P.MODEOFPAYMENTID=M.MODEOFPAYMENTID      
JOIN DBO.TBLPRODUCT PR ON PR.PRODUCTID=B.PRODUCTID 
JOIN DBO.tblStoreRegistration S ON S.StoreID=B.StoreID AND S.Status=1
JOIN tblProductBookingStatus PS ON PS.BookingStatusID=B.ProductBookingStatusID   
WHERE B.UserID=@USERID  AND CAST(B.UpdatedDate AS DATE) >= CAST(GETDATE() AS DATE) 
ORDER BY B.UpdatedDate DESC
END
IF(@CALENDARTYPE = 'HISTORY')  
BEGIN 
SELECT B.BookingID,b.QUANTITY,B.PRODUCTID,PR.PRODUCTNAME,B.ORDERNO,CONVERT(VARCHAR,P.PAYMENTDATE,103) AS BookingDate,U.USER_EMAILID AS EMAILID,
U.User_Name AS USERNAME, L.BillingAddress,C.CityName,U.User_MobileNumber AS MOBILENUMBER,CONVERT(varchar(15),B.BookingTime,100) AS BookingTime,
PS.BookingStatusName AS BOOKINGSTATUS,B.RatingsID,B.ReviewComments,L.PinCode,B.ProductBookingStatusID AS BookingStatusID,
S.StoreID,S.StoreName,S.OwnerName,S.MobileNumber AS STOREMOBILENUMBER,S.EmailID AS STOREEMAILID,S.Address AS STOREADDRESS,
S.PinCode AS STOREPINCODE,
P.AMOUNTPAID AS TOTAL,M.MODEOFPAYMENT FROM DBO.TBLPRODUCTPAYMENT P JOIN DBO.TBLPRODUCTBOOKING B ON P.BOOKINGID=B.BOOKINGID 
JOIN DBO.TBLPRODUCTBILLING L ON L.BOOKINGID=P.BOOKINGID JOIN DBO.TBLUSER U ON U.USERID=P.USERID
JOIN tblCity C ON C.CityID=L.CityId  
JOIN DBO.TBLMODEOFPAYMENT M ON P.MODEOFPAYMENTID=M.MODEOFPAYMENTID      
JOIN DBO.TBLPRODUCT PR ON PR.PRODUCTID=B.PRODUCTID 
JOIN DBO.tblStoreRegistration S ON S.StoreID=B.StoreID AND S.Status=1
JOIN tblProductBookingStatus PS ON PS.BookingStatusID=B.ProductBookingStatusID   
WHERE B.UserID=@USERID AND B.ProductBookingStatusID IN (4,5) AND CAST(B.UpdatedDate AS DATE) < CAST(GETDATE() AS DATE) 
ORDER BY B.UpdatedDate DESC
END
END
GO
/****** Object:  StoredProcedure [dbo].[SP_VENDORONGOING]    Script Date: 11/16/2020 8:51:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[SP_VENDORONGOING]  
(  
@VENDORID INT,  
@CALENDARTYPE NVARCHAR(50)  
)  
AS  
BEGIN  
IF(@CALENDARTYPE = 'CURRENT')  
BEGIN  
SELECT SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME 
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 
					END),
BK.BOOKINGTYPE, BK.BOOKINGAMOUNT AS TOTAL, CONVERT(varchar(15),BK.TIMEIN,100) AS TIMEIN,CONVERT(varchar(15),BK.TIMEOUT,100) AS TIMEOUT,U.User_MobileNumber AS MOBILENUMBER,U.USER_EMAILID AS EMAILID,PK.PackageName,BK.RatingsID,BK.ReviewComments,C.CityName,L.PinCode,L.BillingAddress,MP.ModeOfPayment,
BK.BookingStatusID, BK.BOOKINGID,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,L.BillingAddress AS BookingLocation,CONVERT(varchar(15),BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID  
JOIN TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN TBLBOOKINGSTATUS BS ON BK.BookingStatusID=BS.BookingStatusID   
JOIN DBO.TBLBILLING L ON L.BOOKINGID=BK.BOOKINGID JOIN tblCity C ON C.CityID=L.CityId   
LEFT JOIN dbo.tblPackages PK ON PK.PackageID=BK.PACKAGEID 
JOIN dbo.tblPayment PT ON PT.BOOKINGID=BK.BookingID
JOIN DBO.tblModeOfPayment MP ON PT.ModeofPaymentID=MP.ModeOfPaymentID
WHERE V.VENDORID=@VENDORID AND BK.BookingStatusID <> 7 AND  CAST(BK.BookingDate AS DATE) = CAST(GETDATE() AS DATE)  
ORDER BY BK.CREATEDDATE DESC  
  
  
END  
IF(@CALENDARTYPE = 'TOMORROW')  
BEGIN  
SELECT SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME 
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 
					END),
BK.BOOKINGTYPE, BK.BOOKINGAMOUNT AS TOTAL, CONVERT(varchar(15),BK.TIMEIN,100) AS TIMEIN,CONVERT(varchar(15),BK.TIMEOUT,100) AS TIMEOUT,U.User_MobileNumber AS MOBILENUMBER,U.USER_EMAILID AS EMAILID,PK.PackageName,BK.RatingsID,BK.ReviewComments,C.CityName,L.PinCode,L.BillingAddress,MP.ModeOfPayment,
BK.BookingStatusID, BK.BOOKINGID,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,L.BillingAddress AS BookingLocation,CONVERT(varchar(15),BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID  
JOIN TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN TBLBOOKINGSTATUS BS ON BK.BookingStatusID=BS.BookingStatusID   
JOIN DBO.TBLBILLING L ON L.BOOKINGID=BK.BOOKINGID JOIN tblCity C ON C.CityID=L.CityId   
LEFT JOIN tblPackages PK ON PK.PackageID=BK.PACKAGEID   
JOIN dbo.tblPayment PT ON PT.BOOKINGID=BK.BookingID
JOIN DBO.tblModeOfPayment MP ON PT.ModeofPaymentID=MP.ModeOfPaymentID
WHERE V.VENDORID=@VENDORID AND BK.BookingStatusID <> 7 AND  CAST(BK.BookingDate AS DATE) = CAST(GETDATE() + 1 AS DATE)  
ORDER BY BK.CREATEDDATE DESC  
END  
IF(@CALENDARTYPE = 'WEEK')  
BEGIN  
SELECT SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME 
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 
					END),
BK.BOOKINGTYPE, BK.BOOKINGAMOUNT AS TOTAL, CONVERT(varchar(15),BK.TIMEIN,100) AS TIMEIN,CONVERT(varchar(15),BK.TIMEOUT,100) AS TIMEOUT,U.User_MobileNumber AS MOBILENUMBER,U.USER_EMAILID AS EMAILID,PK.PackageName,BK.RatingsID,BK.ReviewComments,C.CityName,L.PinCode,L.BillingAddress,MP.ModeOfPayment,
BK.BookingStatusID, BK.BOOKINGID,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,L.BillingAddress AS BookingLocation,CONVERT(varchar(15),BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID  
JOIN TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN TBLBOOKINGSTATUS BS ON BK.BookingStatusID=BS.BookingStatusID   
JOIN DBO.TBLBILLING L ON L.BOOKINGID=BK.BOOKINGID JOIN tblCity C ON C.CityID=L.CityId   
LEFT JOIN tblPackages PK ON PK.PackageID=BK.PACKAGEID  
JOIN dbo.tblPayment PT ON PT.BOOKINGID=BK.BookingID
JOIN DBO.tblModeOfPayment MP ON PT.ModeofPaymentID=MP.ModeOfPaymentID
WHERE V.VENDORID=@VENDORID AND BK.BookingStatusID <> 7 AND  DATEPART(wk, bk.BOOKINGDATE) = DATEPART(wk, GETDATE())  
ORDER BY BK.CREATEDDATE DESC  
END  
IF(@CALENDARTYPE = 'UPCOMING')  
BEGIN  
SELECT SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME 
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 
					END),
BK.BOOKINGTYPE, BK.BOOKINGAMOUNT AS TOTAL, CONVERT(varchar(15),BK.TIMEIN,100) AS TIMEIN,CONVERT(varchar(15),BK.TIMEOUT,100) AS TIMEOUT,U.User_MobileNumber AS MOBILENUMBER,U.USER_EMAILID AS EMAILID,PK.PackageName,BK.RatingsID,BK.ReviewComments,C.CityName,L.PinCode,L.BillingAddress,MP.ModeOfPayment,
BK.BookingStatusID, BK.BOOKINGID,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,L.BillingAddress AS BookingLocation,CONVERT(varchar(15),BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID  
JOIN TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN TBLBOOKINGSTATUS BS ON BK.BookingStatusID=BS.BookingStatusID   
JOIN DBO.TBLBILLING L ON L.BOOKINGID=BK.BOOKINGID JOIN tblCity C ON C.CityID=L.CityId   
LEFT JOIN tblPackages PK ON PK.PackageID=BK.PACKAGEID  
JOIN dbo.tblPayment PT ON PT.BOOKINGID=BK.BookingID
JOIN DBO.tblModeOfPayment MP ON PT.ModeofPaymentID=MP.ModeOfPaymentID
WHERE V.VENDORID=@VENDORID AND BK.BookingStatusID <> 7 AND  DATEPART(wk, bk.BOOKINGDATE) > DATEPART(wk, GETDATE()) AND  
BK.BookingStatusID NOT IN (4,5)    
ORDER BY BK.CREATEDDATE DESC  
END  
IF(@CALENDARTYPE = 'HISTORY')  
BEGIN  
SELECT SERVICENAME=(CASE WHEN BK.BOOKINGTYPE='SERVICE' THEN S.SERVICENAME
					WHEN BK.BookingType='ASTROLOGY' THEN 'Astrology - ' + A.ASTROLOGYNAME 
					WHEN BK.BookingType='VIRTUALPOOJA'  THEN 'Virtual Online - ' + S.SERVICENAME 	
				    WHEN BK.BookingType='VIRTUALASTROLOGY'  THEN 'Virtual Online - Astrology -' + A.ASTROLOGYNAME 
					END),
BK.BOOKINGTYPE, BK.BOOKINGAMOUNT AS TOTAL, CONVERT(varchar(15),BK.TIMEIN,100) AS TIMEIN,CONVERT(varchar(15),BK.TIMEOUT,100) AS TIMEOUT,U.User_MobileNumber AS MOBILENUMBER,U.USER_EMAILID AS EMAILID,PK.PackageName,BK.RatingsID,BK.ReviewComments,C.CityName,L.PinCode, L.BillingAddress,MP.ModeOfPayment,
BK.BookingStatusID, BK.BOOKINGID,CONVERT(VARCHAR,BK.BOOKINGDATE,103) AS BOOKINGDATE,L.BillingAddress AS BookingLocation,CONVERT(varchar(15),BK.BOOKINGTIME,100) AS BOOKINGTIME,U.USER_NAME AS USERNAME,V.VENDOR_FIRSTNAME AS VENDORNAME,BK.SERVICEID,BS.BOOKINGSTATUSNAME AS BOOKINGSTATUS FROM DBO.TBLBOOKING BK WITH (NOLOCK) JOIN DBO.TBLUSER U ON BK.USERID=U.USERID  
JOIN TBLVENDOR V ON V.VENDORID=BK.VENDORID 
LEFT JOIN DBO.TBLSERVICE S ON S.SERVICEID=BK.SERVICEID 
LEFT JOIN DBO.TBLASTROLOGYCATEGORIES A ON A.ASTROLOGYID=BK.SERVICEID 
JOIN TBLBOOKINGSTATUS BS ON BK.BookingStatusID=BS.BookingStatusID   
JOIN DBO.TBLBILLING L ON L.BOOKINGID=BK.BOOKINGID JOIN tblCity C ON C.CityID=L.CityId   
LEFT JOIN tblPackages PK ON PK.PackageID=BK.PACKAGEID   
JOIN dbo.tblPayment PT ON PT.BOOKINGID=BK.BookingID
JOIN DBO.tblModeOfPayment MP ON PT.ModeofPaymentID=MP.ModeOfPaymentID
WHERE V.VENDORID=@VENDORID AND  CAST(BK.BookingDate AS DATE) < CAST(GETDATE() AS DATE)    
ORDER BY BK.CREATEDDATE DESC  
END  
END
GO
USE [master]
GO
ALTER DATABASE [Brahmasmi] SET  READ_WRITE 
GO
