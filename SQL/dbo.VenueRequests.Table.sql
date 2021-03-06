USE [Trainsquare]
GO
/****** Object:  Table [dbo].[VenueRequests]    Script Date: 5/25/2022 12:48:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VenueRequests](
	[VenueId] [int] NOT NULL,
	[EventDescription] [nvarchar](4000) NOT NULL,
	[StartDate] [datetime2](7) NOT NULL,
	[EndDate] [datetime2](7) NOT NULL,
	[Requester] [int] NOT NULL,
	[DateModified] [datetime2](7) NOT NULL,
	[DateCreated] [datetime2](7) NOT NULL,
	[Id] [int] IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_VenueRequest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[VenueRequests] ADD  CONSTRAINT [DF_VenueRequests_DateModified]  DEFAULT (getutcdate()) FOR [DateModified]
GO
ALTER TABLE [dbo].[VenueRequests] ADD  CONSTRAINT [DF_VenueRequests_DateCreated]  DEFAULT (getutcdate()) FOR [DateCreated]
GO
