npx sequelize model:generate --name Build --attributes name:string,imageLink:text,legoItemNumber:integer,pieceCount:integer

npx sequelize model:generate --name Theme --attributes name:string

npx sequelize model:generate --name DisplayShelf --attributes title:string,subtitle:text,userId:integer

npx sequelize model:generate --name Review --attributes title:string,content:text,rating:integer,userId:integer,buildId:integer

npx sequelize model:generate --name BuildAndShelf --attributes buildStatus:string,buildId:integer,shelfId:integer

npx sequelize model:generate --name BuildAndTheme --attributes buildId:integer,themeId:integer

npx dotenv sequelize db:migrate

npx sequelize-cli seed:generate --name BuildsSeeder

npx sequelize-cli seed:generate --name UsersSeeder

npx sequelize-cli seed:generate --name ThemesSeeder

npx dotenv sequelize db:seed:all
npx dotenv sequelize db:migrate:undo:all
