const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0pkTjRKdlNCa2pNemVkMkk2K2RLVjllbkl2TGd3WkJQTDBJVk5OTm4xZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidXBPQVdRT1RIYUFBL1VQRnFLcDBIVWdTNE52MzN6Q1U4SnRtalZBYVJnaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3S0pSd0kvOW5ZOWRpbnlxNWhqMzBOeEQvZWpEeXRudzlTZmQ4K1ZXWlhFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZaHh1RUdWeE42aXdJM1hNN25ZNVovWHQ5Z0dMS1I0azRobHZndUd2RWhJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1PZG5QL2k4cmtFWll2YzIzQkF4VjJWTXdrb2UrUTQwc2FVcWExbUJQRWc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJNTXYvTkxRODNGMHRwVVhRMWw5cUNRMi9zWnNmcHR0by9pZWdXUkRvd1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ1BXMGt5bloxYklmUnA1MDJzclZYZlBoeDFldEVxdXJrNlN0UTdlL2Eyaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2ZIcCtLVE9hazFwZGMvYWZuTGVzQmIrelVKdkRxQVJFdGhoVmVwTVhSST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IiszTTJZelRNMUdyWXMyMk9XU1BWUG05T2hkajQxNG5tUm12c2lGa3NaeTNpUXpZNTJ4dVk4OGJaK25CRmoxS29jWi9aWG42R1hGb3ltbTZVTHQxOWl3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMyLCJhZHZTZWNyZXRLZXkiOiJmWWlzUyttOFFNcG13U3g3ZGdJTmFNMXU2eE1IQ2ZuZk5kcmpBd3Boc0prPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJmN0VQQzZCclJHMjdTQVdVSkJpbHZBIiwicGhvbmVJZCI6IjM2ZmZkNjNkLWEwNGMtNGMwNC04NDc4LTBiMmNlOWNlYjZjNiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwVndPZ1J3TjkzN2pueUJZdkhVbndFQy9vdkU9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2RSdExTR0NCUVVhSVJGR0R3MzhvcVBZZkZvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IllGTThOWlJWIiwibWUiOnsiaWQiOiI1MTk2MDI4NTkzMDoyOUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJTeXNzb2x1dGlvbnMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BlUWx2VUdFSi81aUwwR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ino0blFSZkxGYkhaUWpzVlNBYVRuRXoyekQxblorODkrRGN3T081cE81Umc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjVxbU4xWG9hdXFnY3pSNThFU3Q2WmlMMVh4SjRyOVd1YzRXa0JxOE8vM3dPVnQ4RUZIL3FleUhHZk9tNWU0Q2tiNWZVMHAzR2ZuaW9ra3ZoSGlVQ0RBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJsdVBwQndxSzZ4eXltSktubUFUUnhZQnVNQy9xZC83dzYzWml0UWlMYTBGckVWVzlGNlZZTllETys5Z0JDK3NvUG9PeDFJK2gxZk4rVVF5dFlSWnVoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjUxOTYwMjg1OTMwOjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmMrSjBFWHl4V3gyVUk3RlVnR2s1eE05c3c5WjJmdlBmZzNNRGp1YVR1VVkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzg2ODU2MTMsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQlhOIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Toputech/ALONE-MD',
    OWNER_NAME : process.env.OWNER_NAME || "🔥✦𝐒𝐲𝐬𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧𝐬✦🔥",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "51960285930",  
    ANTI_LINK : process.env.ANTI_LINK || "yes",
    ANTI_BAD : process.env.ANTI_BAD || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "yes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',             
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "yes",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'yes',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaeRrcnADTOKzivM0S1r",
    CAPTION : process.env.CAPTION || "🔥✦𝐒𝐲𝐬𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧𝐬✦🔥",
    BOT : process.env.BOT_NAME || '🔥✦𝐒𝐲𝐬𝐒𝐨𝐥𝐮𝐭𝐢𝐨𝐧𝐬✦🔥',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "America/Lima", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
                  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
