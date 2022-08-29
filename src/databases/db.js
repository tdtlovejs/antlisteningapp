import SQLite from 'react-native-sqlite-storage';
import {
    DATABASE_NAME,
    MAX_LIMIT_DB, TABLE_NAME_WORDS,
} from '../utils/constants';

const TABLE_LISTENING = 'antlistening';
const db = SQLite.openDatabase({
    name: 'antlistening.db',
    createFromLocation : 1
});

// TABLE_TRACK_HISTORY
// TABLE_TRACK_ANSWER

export const getTrackById = (id) => new Promise((resolve, reject) => {
    console.log(db)
    db.transaction(tx => {
        console.log('tx ', tx)
        tx.executeSql(
            `SELECT * FROM ${TABLE_LISTENING} WHERE id = ? LIMIT 1`,
            [id],
            (tx, results) => {
                const {rows} = results;
                if (rows.length) {
                    resolve({
                        ...rows.item(0),
                        sentences: JSON.parse(rows.item(0).sentences),
                        questions: JSON.parse(rows.item(0).questions),
                    });
                } else {
                    resolve(null);
                }
            },
            (error) => {
                console.log('error ',error)
                reject(error);
            },
        );
    });
});
export const getRandomTrackId = () => new Promise((resolve, reject) => {
    // console.log(db)
    db.transaction(tx => {
        console.log('tx ', tx)
        tx.executeSql(
            `SELECT * FROM ${TABLE_LISTENING} ORDER BY RANDOM() LIMIT 1`,
            [],
            (tx, results) => {
                const {rows} = results;
                if (rows.length) {
                    resolve(rows.item(0).id);
                } else {
                    resolve(null);
                }
            },
            (error) => {
                console.log('error ',error)
                reject(error);
            },
        );
    });
});
export const getDataByQueryAndPaginate = (page, query, pageSize) => new Promise((resolve, reject) => {
    const text = query.trim().toLowerCase();
    db.transaction(async (tx) => {
        tx.executeSql(
            `SELECT * FROM ${TABLE_LISTENING} 
            WHERE name REGEXP ?
            ORDER BY level ASC
            LIMIT ?, ? `,
            [
                `^(|.* +)${text}.*`,
                pageSize * (page - 1),
                pageSize
            ],
            (tx, results) => {
                const {rows} = results;
                let words = [];
                for (let i = 0; i < rows.length; i++) {
                    words.push({
                        ...rows.item(i),
                        sentences: JSON.parse(rows.item(i).sentences),
                        questions: JSON.parse(rows.item(i).questions),
                    });
                }
                resolve(words);
            },
            (error) => {
                reject(error);
            },
        );
    });
});

export const getRandomTracks = (nbTracks) => new Promise((resolve, reject) => {
    // console.log(db)
    db.transaction(tx => {
        console.log('tx ', tx)
        tx.executeSql(
            `SELECT * FROM ${TABLE_LISTENING} ORDER BY RANDOM() LIMIT ?`,
            [nbTracks],
            (tx, results) => {
                const {rows} = results;
                let words = [];
                for (let i = 0; i < rows.length; i++) {
                    words.push({
                        ...rows.item(i),
                        sentences: JSON.parse(rows.item(i).sentences),
                        questions: JSON.parse(rows.item(i).questions),
                    });
                }
                resolve(words);
            },
            (error) => {
                console.log('error ',error)
                reject(error);
            },
        );
    });
});

export default db;

