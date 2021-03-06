USE [Trainsquare]
GO
/****** Object:  StoredProcedure [dbo].[Venues_DeletebyId_V2]    Script Date: 5/25/2022 12:48:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Author: Matthew Golben
-- Create date: 05/10/2022
-- Description: Deletion of Venue and Location according to Venue
-- Code Reviewer: Jared Williams
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE   proc [dbo].[Venues_DeletebyId_V2] 
			@Id int 


AS


/*---- Test Code ----

EXEC dbo.Venues_SelectAll_V2

Declare @id int = 74
EXEC dbo.Venues_DeleteById @Id

EXEC dbo.Venues_SelectAll_V2


*/
BEGIN 
		
	DECLARE @LocationId int = (SELECT LocationId FROM dbo.Venues WHERE Id = @Id)

		DELETE FROM dbo.Venues 
		WHERE Id = @Id 

		DELETE FROM [dbo].[Locations]
		WHERE Id = @LocationId;
END

GO
