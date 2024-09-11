ALTER TABLE sb."Book" DROP CONSTRAINT "FK_Book_User_C";
ALTER TABLE sb."Book" DROP CONSTRAINT "FK_Book_User_U";
ALTER TABLE sb."BookTags" DROP CONSTRAINT "FK_BookTags_Book_B";
ALTER TABLE sb."BookDetails" DROP CONSTRAINT "FK_BookDetails_Book_B";
ALTER TABLE sb."Attributions" DROP CONSTRAINT "FK_Attributions_User_U";
ALTER TABLE sb."Attributions" DROP CONSTRAINT "FK_Attributions_Book_B";
DROP TABLE sb."Book";
DROP TABLE sb."User";
DROP TABLE sb."Difficulty";
DROP TABLE sb."Status";
DROP TABLE sb."Users";
DROP TABLE sb."Grade";
DROP TABLE sb."BookTags";
DROP TABLE sb."BookDetails"
DROP TABLE sb."Subject";
DROP TABLE sb."Attributions";
DROP TABLE sb."BookSubjects";
DROP SCHEMA "sb";
