import * as SQLite from "expo-sqlite"

const DATABASE_NAME = "shushme.db"
export const TABLE_NAME = "places"
export const COLUMN_ID = "_ID"
export const COLUMN_PLACE_ID = "placeID"

const db = SQLite.openDatabase(DATABASE_NAME)

export const createTable = (db) => {

    const query = "CREATE TABLE IF NOT EXISTS " +  TABLE_NAME + "(" +
                COLUMN_ID + " INTEGER PRIMARY KEY AUTOINCREMENT, " +
                COLUMN_PLACE_ID + " TEXT NOT NULL, " +
                "UNIQUE (" + COLUMN_PLACE_ID + ") ON CONFLICT REPLACE" +
                 ");" ;

    db.transaction((tx) => {
        //tx.executeSql("DROP TABLE IF EXISTS "+TABLE_NAME); //used for debugging
        tx.executeSql(query)
    },
    (e) => {
        console.log("ERROR: " + e.message)
    })
}

export default db