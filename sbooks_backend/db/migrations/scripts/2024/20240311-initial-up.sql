CREATE SCHEMA IF NOT EXISTS sb;

CREATE TABLE IF NOT EXISTS sb."User"
(
    "DBUserId" serial NOT NULL,
    "Password" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "Name" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "Email" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "Role" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "Status" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "CreatedBy" integer,
    "UpdatedBy" integer,    
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "DBUserId_pkey" PRIMARY KEY ("DBUserId")
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS sb."Book"
(
    "BookId" serial NOT NULL,
    "Title" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "Grade" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "Difficulty" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "Author" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "Status" varchar(255) COLLATE pg_catalog."default" NOT NULL,    
    "CreatedBy" integer NOT NULL,
    "UpdatedBy" integer NOT NULL,   
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "BookId_pkey" PRIMARY KEY ("BookId")
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS sb."Difficulty"
(
	"DifficultyId" serial NOT NULL,
	"Name" varchar(255) COLLATE pg_catalog."default" NOT NULL,
	"CreatedAt" timestamp with time zone NOT NULL, 
	"UpdatedAt" timestamp with time zone NOT NULL,
	CONSTRAINT "DifficultyId_pkey" PRIMARY KEY ("DifficultyId")
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS sb."Attributions"
(
    "userId" integer NOT NULL,
    "bookId" integer NOT NULL,    
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS sb."BookTags"
(
    "TagId" serial NOT NULL,
    "BookId" integer NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "BookTagsId_pkey" PRIMARY KEY ("TagId")
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS sb."Difficulty"
(
    "DifficultyId" serial NOT NULL,
    "Name" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "DifficultyId_pkey" PRIMARY KEY ("DifficultyId")
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS sb."Status"
(
    "StatusId" serial NOT NULL,
    "Name" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "StatusId_pkey" PRIMARY KEY ("StatusId")
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS sb."Grade"
(
    "GradeId" serial NOT NULL,
    "Name" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "GradeId_pkey" PRIMARY KEY ("GradeId")
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS sb."Subject"
(
    "SubjectId" serial NOT NULL,
    "Name" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Subject_pkey" PRIMARY KEY ("SubjectId")
)
TABLESPACE pg_default;


CREATE TABLE IF NOT EXISTS sb."BookDetails"
(
    "BookDetailsId" serial NOT NULL,
    "BookId" integer NOT NULL,
    "Description" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "Level" integer NOT NULL,
    "Parent" integer,
    "Sort" integer NOT NULL,    
    "Source" varchar(255) COLLATE pg_catalog."default" NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "BookDetailsId_pkey" PRIMARY KEY ("BookDetailsId")
)
TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS sb."BookSubjects"
(
    -- "BookSubjectsId" serial NOT NULL,
    "SubjectId" integer NOT NULL,
    "BookId" integer NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL, 
    "UpdatedAt" timestamp with time zone NOT NULL
    -- CONSTRAINT "BookSubjectsId_pkey" PRIMARY KEY ("BookSubjectsId")
)
TABLESPACE pg_default;

ALTER TABLE IF EXISTS sb."BookDetails"
    ADD CONSTRAINT "FK_BookDetails_Book_B" FOREIGN KEY ("BookId")
    REFERENCES sb."Book" ("BookId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_BookDetails_Book_B"
    ON sb."BookDetails"("BookId");

ALTER TABLE IF EXISTS sb."Book"
    ADD CONSTRAINT "FK_Book_User_C" FOREIGN KEY ("CreatedBy")
    REFERENCES sb."User" ("DBUserId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_FK_Book_DBUser_C"
    ON sb."Book"("CreatedBy");  

ALTER TABLE IF EXISTS sb."Book"
    ADD CONSTRAINT "FK_Book_User_U" FOREIGN KEY ("UpdatedBy")
    REFERENCES sb."User" ("DBUserId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_FK_Book_DBUser_U"
	ON sb."Book"("UpdatedBy");	
	
ALTER TABLE IF EXISTS sb."Attributions"
    ADD CONSTRAINT "FK_Attributions_User_U" FOREIGN KEY ("userId")
    REFERENCES sb."User" ("DBUserId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_FK_Attributions_DBUser_U"
    ON sb."Attributions"("userId");
    
ALTER TABLE IF EXISTS sb."Attributions"
    ADD CONSTRAINT "FK_Attributions_Book_B" FOREIGN KEY ("bookId")
    REFERENCES sb."Book" ("BookId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_FK_Attributions_Book_U"
    ON sb."Attributions"("bookId");

ALTER TABLE IF EXISTS sb."BookTags"
    ADD CONSTRAINT "FK_BookTags_Book_B" FOREIGN KEY ("BookId")
    REFERENCES sb."Book" ("BookId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_FK_BookTags_BookId_B"
    ON sb."BookTags"("BookId");

ALTER TABLE IF EXISTS sb."BookSubjects"
    ADD CONSTRAINT "FK_BookSubjects_Book_B" FOREIGN KEY ("BookId")
    REFERENCES sb."Book" ("BookId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION,
    ADD CONSTRAINT "FK_BookSubjects_Subject_S" FOREIGN KEY ("SubjectId")
    REFERENCES sb."Subject" ("SubjectId") MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;
CREATE INDEX IF NOT EXISTS "fki_BookSubjects_Book_B"
    ON sb."BookSubjects"("BookId");
CREATE INDEX IF NOT EXISTS "fki_BookSubjects_Subject_S"
    ON sb."BookSubjects"("SubjectId");