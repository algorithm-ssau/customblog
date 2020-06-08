-- begin BLOG_TAG
create table BLOG_TAG (
    ID uuid,
    VERSION integer not null,
    CREATE_TS timestamp,
    CREATED_BY varchar(50),
    UPDATE_TS timestamp,
    UPDATED_BY varchar(50),
    DELETE_TS timestamp,
    DELETED_BY varchar(50),
    --
    NAME varchar(255),
    --
    primary key (ID)
)^
-- end BLOG_TAG
-- begin BLOG_RATE
create table BLOG_RATE (
    ID uuid,
    VERSION integer not null,
    CREATE_TS timestamp,
    CREATED_BY varchar(50),
    UPDATE_TS timestamp,
    UPDATED_BY varchar(50),
    DELETE_TS timestamp,
    DELETED_BY varchar(50),
    --
    AUTHOR_ID uuid,
    VALUE double precision,
    --
    primary key (ID)
)^
-- end BLOG_RATE
-- begin BLOG_CATEGORY
create table BLOG_CATEGORY (
    ID uuid,
    VERSION integer not null,
    CREATE_TS timestamp,
    CREATED_BY varchar(50),
    UPDATE_TS timestamp,
    UPDATED_BY varchar(50),
    DELETE_TS timestamp,
    DELETED_BY varchar(50),
    --
    NAME varchar(255),
    DESCRIPTION varchar(2048),
    ACTIVE boolean,
    --
    primary key (ID)
)^
-- end BLOG_CATEGORY
-- begin BLOG_PUBLICATION
create table BLOG_PUBLICATION (
    ID uuid,
    VERSION integer not null,
    CREATE_TS timestamp,
    CREATED_BY varchar(50),
    UPDATE_TS timestamp,
    UPDATED_BY varchar(50),
    DELETE_TS timestamp,
    DELETED_BY varchar(50),
    --
    TITLE varchar(1024) not null,
    CONTENT text not null,
    RELEASE_DATE timestamp not null,
    CATEGORY_ID uuid,
    VISIBLE boolean,
    AUTHOR_ID uuid,
    --
    primary key (ID)
)^
-- end BLOG_PUBLICATION
-- begin BLOG_AUTHOR
create table BLOG_AUTHOR (
    ID uuid,
    VERSION integer not null,
    CREATE_TS timestamp,
    CREATED_BY varchar(50),
    UPDATE_TS timestamp,
    UPDATED_BY varchar(50),
    DELETE_TS timestamp,
    DELETED_BY varchar(50),
    --
    USER_ID uuid,
    ABOUT text,
    VISIBLE_NAME varchar(512),
    ACTIVE boolean,
    BANNED boolean,
    --
    primary key (ID)
)^
-- end BLOG_AUTHOR
-- begin BLOG_COMMENT
create table BLOG_COMMENT (
    ID uuid,
    VERSION integer not null,
    CREATE_TS timestamp,
    CREATED_BY varchar(50),
    UPDATE_TS timestamp,
    UPDATED_BY varchar(50),
    DELETE_TS timestamp,
    DELETED_BY varchar(50),
    --
    PUBLICATION_ID uuid,
    PARENT_ID uuid,
    CONTENT varchar(255),
    AUTHOR_ID uuid,
    --
    primary key (ID)
)^
-- end BLOG_COMMENT
-- begin COMMENT_RATE_LINK
create table COMMENT_RATE_LINK (
    COMMENT_ID uuid,
    RATE_ID uuid,
    primary key (COMMENT_ID, RATE_ID)
)^
-- end COMMENT_RATE_LINK
-- begin PUBLICATION_TAG_LINK
create table PUBLICATION_TAG_LINK (
    PUBLICATION_ID uuid,
    TAG_ID uuid,
    primary key (PUBLICATION_ID, TAG_ID)
)^
-- end PUBLICATION_TAG_LINK
-- begin PUBLICATION_RATE_LINK
create table PUBLICATION_RATE_LINK (
    PUBLICATION_ID uuid,
    RATE_ID uuid,
    primary key (PUBLICATION_ID, RATE_ID)
)^
-- end PUBLICATION_RATE_LINK
-- begin SEC_USER
alter table SEC_USER add column AVATAR_URL varchar(1024) ^
alter table SEC_USER add column BANNED boolean ^
alter table SEC_USER add column DTYPE varchar(100) ^
update SEC_USER set DTYPE = 'blog_ExtUser' where DTYPE is null ^
-- end SEC_USER