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

// db.transaction((tx) => {
//     tx.executeSql(
//         'CREATE TABLE IF NOT EXISTS '
//         + `${TABLE_NAME_WORDS} `
//         + `(
//         id TEXT,
//         name TEXT,
//         level TEXT,
//         transcript TEXT,
//         sentences TEXT,
//         questions TEXT,
//         );`,
//     );
// });
//
// export const importWords = (words) => new Promise((resolve, reject) => {
//     const maxSizeInsert = Math.floor(MAX_LIMIT_DB/6);
//     const last = Math.ceil(words.length/maxSizeInsert);
//     for (let p = 1; p < last+1; p = p + 1) {
//         const items = [...words].slice((p - 1) * maxSizeInsert, p * maxSizeInsert);
//         let data = []
//         items.forEach(item => {
//             data = [
//                 ...data,
//                 item.id,
//                 item.name,
//                 item.level,
//                 item.transcript,
//                 item.sentences,
//                 item.questions
//             ]
//         })
//         db.transaction((tx) => {
//             tx.executeSql(
//                 `INSERT INTO ${TABLE_NAME_WORDS} (id, name, level, transcript, sentences, questions) VALUES ${items.map(itemR => '(?,?,?,?,?,?)').join(',')}`,
//                 data,
//                 () => {
//                     if (p === last) {
//                         resolve();
//                     }
//                 },
//                 (e) => {
//                     reject(e);
//                 }
//             );
//         })
//     }
// });
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
                    resolve(rows.item(0));
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

export default db;

