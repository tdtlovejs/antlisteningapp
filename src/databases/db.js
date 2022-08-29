import SQLite from 'react-native-sqlite-storage';
import {
    DATABASE_NAME,
    MAX_LIMIT_DB, TABLE_NAME_MY_PLAYLIST, TABLE_NAME_TRACK,
} from '../utils/constants';

const db = SQLite.openDatabase({
    name: DATABASE_NAME,
});

// const TABLE_LISTENING = 'antlistening';
// const db = SQLite.openDatabase({
//     name: 'antlistening.db',
//     createFromLocation : 1
// });

// TABLE_TRACK_HISTORY
// TABLE_TRACK_ANSWER
db.transaction((tx) => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS '
        + `${TABLE_NAME_MY_PLAYLIST} `
        + `(
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        tracks TEXT, 
        updatedAt INTEGER
        );`,
    );
});
db.transaction((tx) => {
    tx.executeSql(
        'CREATE TABLE IF NOT EXISTS '
        + `${TABLE_NAME_TRACK} `
        + `(
        id TEXT,
        name TEXT,
        level TEXT,
        transcript TEXT,
        sentences TEXT,
        questions TEXT,
        answers TEXT,
        listenAt INTEGER,
        duration INTEGER,
        );`,
    );
});


export const getAllMyGroup = () => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT * FROM ${TABLE_NAME_MY_GROUP} ORDER BY updatedAt DESC;`,
            [],
            (tx, results) => {
                const {rows} = results;
                let words = [];
                for (let i = 0; i < rows.length; i++) {
                    words.push({
                        ...rows.item(i),
                        words: JSON.parse(rows.item(i).words),
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
export const getMyGroupById = (id) => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT * FROM ${TABLE_NAME_MY_GROUP} WHERE id = ?;`,
            [id],
            (tx, results) => {
                const {rows} = results;
                if (rows.length) {
                    resolve({
                        ...rows.item(0),
                        words: JSON.parse(rows.item(0).words),
                    })
                } else {
                    resolve(null);
                }
            },
            (error) => {
                reject(error);
            },
        );
    });
});
export const insertMyGroup = (data) => new Promise((resolve, reject) => {
    const {
        name,
    } = data;
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO ${TABLE_NAME_MY_GROUP} (name, words, updatedAt) VALUES (?,?,?);`,
            [
                name,
                JSON.stringify([]),
                new Date().getTime()
            ],
            (tx, results) => {
                const {rows} = results;
                resolve(rows.item(0));
            },
            (error) => {
                reject(error);
            },
        );
    });
});
export const updateMyGroupById = (id, data) => new Promise((resolve, reject) => {
    data.updatedAt =  new Date().getTime();
    let fields = ['name', 'words', 'updatedAt']
    let array = []
    fields.forEach(item => {
        if (data.hasOwnProperty(item)) {
            array = [
                ...array,
                {
                    key: item,
                    value: data[item],
                }
            ]
        }
    })

    db.transaction(tx => {
        tx.executeSql(
            `UPDATE ${TABLE_NAME_MY_GROUP} SET ${array.map(item => item.key + " = ?").join(',')} WHERE id = ?`,
            [
                ...array.map(item => item.value),
                id
            ],
            (tx, results) => {
                resolve(results);
            },
            (error) => {
                reject(error);
            },
        );
    });
});
export const deleteMyGroup = (id) => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM ${TABLE_NAME_MY_GROUP} where id=?`,
            [
                id
            ],
            (tx, results) => {
                resolve(results);
            },
            (error) => {
                reject(error);
            },
        );
    });
});


export const importTracks = (words) => new Promise((resolve, reject) => {
    const maxSizeInsertConversation = Math.floor(MAX_LIMIT_DB/7);
    const last = Math.ceil(words.length/maxSizeInsertConversation);
    for (let p = 1; p < last+1; p = p + 1) {
        const items = [...words].slice((p - 1) * maxSizeInsertConversation, p * maxSizeInsertConversation);
        let data = []
        items.forEach(item => {
            data = [
                ...data,
                item.id,
                item.word,
                item.pos,
                item.level,
                item.phonetic,
                item.means,
                item.context,
            ]
        })
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO ${TABLE_NAME_WORDS} (id, word, pos, level, phonetic, means, context) VALUES ${items.map(itemR => '(?,?,?,?,?,?,?)').join(',')}`,
                data,
                () => {
                    if (p === last) {
                        resolve();
                    }
                },
                (e) => {
                    reject(e);
                }
            );
        })
    }
});

export const getWordsByListIds = (ids) => new Promise((resolve, reject) => {
    const time = new Date().getTime();
    db.transaction(tx => {
        tx.executeSql(
            `SELECT *, (countCheck > 0 AND (? - lastCheckAt)/86400000 < countCheck) AS isKnow FROM ${TABLE_NAME_WORDS} WHERE id IN (${ids.map(item => '?').join(',')});`,
            [time,...ids],
            (tx, results) => {
                const {rows} = results;
                let words = [];
                for (let i = 0; i < rows.length; i++) {
                    words.push({
                        ...rows.item(i),
                        phonetic: JSON.parse(rows.item(i).phonetic),
                        means: JSON.parse(rows.item(i).means),
                        context: JSON.parse(rows.item(i).context),
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
            `SELECT * FROM ${TABLE_NAME_TRACK} ORDER BY RANDOM() LIMIT ?`,
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

export const getTrackById = (id) => new Promise((resolve, reject) => {
    console.log(db)
    db.transaction(tx => {
        console.log('tx ', tx)
        tx.executeSql(
            `SELECT * FROM ${TABLE_NAME_TRACK} WHERE id = ? LIMIT 1`,
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
            `SELECT * FROM ${TABLE_NAME_TRACK} ORDER BY RANDOM() LIMIT 1`,
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
            `SELECT * FROM ${TABLE_NAME_TRACK} 
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

