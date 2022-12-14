import SQLite from 'react-native-sqlite-storage';
import {
    DATABASE_NAME,
    MAX_LIMIT_DB, randomRange, TABLE_NAME_MY_PLAYLIST, TABLE_NAME_TRACK,
} from '../utils/constants';

const db = SQLite.openDatabase({
    name: DATABASE_NAME,
});

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
        liked INTEGER DEFAULT 0,
        likedAt INTEGER
        );`,
        [],
        () => {

        },
        (err) => {
            console.log(err)
        }
    );
});


export const getAllMyPlaylist = () => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT * FROM ${TABLE_NAME_MY_PLAYLIST} ORDER BY updatedAt DESC;`,
            [],
            (tx, results) => {
                const {rows} = results;
                let playlists = [];
                for (let i = 0; i < rows.length; i++) {
                    playlists.push({
                        ...rows.item(i),
                        tracks: JSON.parse(rows.item(i).tracks),
                    });
                }
                resolve(playlists);
            },
            (error) => {
                reject(error);
            },
        );
    });
});
export const getMyPlaylistById = (id) => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT * FROM ${TABLE_NAME_MY_PLAYLIST} WHERE id = ?;`,
            [id],
            (tx, results) => {
                const {rows} = results;
                if (rows.length) {
                    resolve({
                        ...rows.item(0),
                        tracks: JSON.parse(rows.item(0).tracks),
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
export const insertMyPlaylist = (data) => new Promise((resolve, reject) => {
    const {
        name,
    } = data;
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO ${TABLE_NAME_MY_PLAYLIST} (name, tracks, updatedAt) VALUES (?,?,?);`,
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
export const updateMyPlaylistById = (id, data) => new Promise((resolve, reject) => {
    data.updatedAt =  new Date().getTime();
    let fields = ['name', 'tracks', 'updatedAt']
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
    console.log('array ',array)
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE ${TABLE_NAME_MY_PLAYLIST} SET ${array.map(item => item.key + " = ?").join(',')} WHERE id = ?`,
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
export const deleteMyPlaylist = (id) => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM ${TABLE_NAME_MY_PLAYLIST} where id = ?`,
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


export const importTracks = (tracks) => new Promise((resolve, reject) => {
    const maxSizeInsert = Math.floor(MAX_LIMIT_DB/8);
    const last = Math.ceil(tracks.length/maxSizeInsert);
    for (let p = 1; p < last+1; p = p + 1) {
        const items = [...tracks].slice((p - 1) * maxSizeInsert, p * maxSizeInsert);
        let data = []
        items.forEach(item => {
            data = [
                ...data,
                item.id,
                item.name,
                item.level,
                item.transcript,
                item.sentences,
                item.questions,
                item.answers,
                // item.duration,
                randomRange(30, 300)
            ]
        })
        db.transaction((tx) => {
            tx.executeSql(
                `INSERT INTO ${TABLE_NAME_TRACK} (id, name, level, transcript, sentences, questions, answers, duration) VALUES ${items.map(itemR => '(?,?,?,?,?,?,?,?)').join(',')}`,
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

// export const getWordsByListIds = (ids) => new Promise((resolve, reject) => {
//     const time = new Date().getTime();
//     db.transaction(tx => {
//         tx.executeSql(
//             `SELECT *, (countCheck > 0 AND (? - lastCheckAt)/86400000 < countCheck) AS isKnow FROM ${TABLE_NAME_WORDS} WHERE id IN (${ids.map(item => '?').join(',')});`,
//             [time,...ids],
//             (tx, results) => {
//                 const {rows} = results;
//                 let words = [];
//                 for (let i = 0; i < rows.length; i++) {
//                     words.push({
//                         ...rows.item(i),
//                         phonetic: JSON.parse(rows.item(i).phonetic),
//                         means: JSON.parse(rows.item(i).means),
//                         context: JSON.parse(rows.item(i).context),
//                     });
//                 }
//                 resolve(words);
//             },
//             (error) => {
//                 reject(error);
//             },
//         );
//     });
// });
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

export const getTracksByListIds = (ids) => new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
            `SELECT * FROM ${TABLE_NAME_TRACK} WHERE id IN (${ids.map(item => '?').join(',')});`,
            [...ids],
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

export const updateLiked = (id, liked) => new Promise((resolve, reject) => {
    const time = new Date().getTime();
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE ${TABLE_NAME_TRACK} SET liked = ?, likedAt = ? WHERE id = ?`,
            [
                liked ? 1 : 0,
                liked ? time : 0,
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

export const updateListenAtById = (id) => new Promise((resolve, reject) => {
    const time = new Date().getTime();
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE ${TABLE_NAME_TRACK} SET  listenAt = ? WHERE id = ?`,
            [
                time,
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

export const getTracksByQueryAndPaginateAndFilters = (page, query, pageSize, filters) => new Promise((resolve, reject) => {
    const text = query.trim().toLowerCase();
    const time = new Date().getTime();
    db.transaction(async (tx) => {
        tx.executeSql(
            `SELECT * FROM ${TABLE_NAME_TRACK} 
            WHERE name REGEXP ?
            ${filters.liked !== undefined ? 'AND liked = ?' : ''}
--             ORDER BY level ASC
            ${filters.liked !== undefined ? 'ORDER BY likedAt DESC' : ''}
            LIMIT ?, ? `,
            [
                `^(|.* +)${text}.*`,
                ...(filters.liked !== undefined ? [filters.liked] : []),
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
export const getTracksByRecently = (nbTracks) => new Promise((resolve, reject) => {
    // console.log(db)
    db.transaction(tx => {
        console.log('tx ', tx)
        tx.executeSql(
            `SELECT * FROM ${TABLE_NAME_TRACK} ORDER BY listenAt DESC LIMIT ?`,
            [
                nbTracks
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
                console.log('error ',error)
                reject(error);
            },
        );
    });
});
export default db;

