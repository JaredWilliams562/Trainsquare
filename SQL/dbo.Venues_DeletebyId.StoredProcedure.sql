USE [Trainsquare]
GO
/****** Object:  StoredProcedure [dbo].[Venues_DeletebyId]    Script Date: 5/25/2022 12:48:32 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author: Jared Williams
-- Create date: 04/04/2022
-- Description: Delete By Id proc for Venues
-- Code Reviewer:Sagan Jackson
-- MODIFIED BY: 
-- MODIFIED DATE:
-- Code Reviewer:
-- Note:
-- =============================================
CREATE proc [dbo].[Venues_DeletebyId] 
			@Id int 
as 
/*---- Test Code ----
Declare @id int = 5
EXEC dbo.Venues_DeleteById @Id

Select *
From dbo.Venues

SELECT * FROM  dbo.WorkShop

Where Id = @Id
*/
BEGIN 
		
		DELETE FROM dbo.Venues 
		WHERE Id = @Id 
END
GO
