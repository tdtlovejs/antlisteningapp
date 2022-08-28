import moment from 'moment';
import {timeRemember} from './constants';

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};
export const shuffleArray = (array) => {
    const arrShuffle = [...array]
    let currentIndex = arrShuffle.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [arrShuffle[currentIndex], arrShuffle[randomIndex]] = [
            arrShuffle[randomIndex], arrShuffle[currentIndex]];
    }

    return arrShuffle;
}
export const randomIndexFromLength = (countRandom, length, firstIndex) => {
    let listIndex = firstIndex !== undefined ? [firstIndex] : [];
    for (let index = 0; index < countRandom; index ++) {
        let itemIndex;
        do
            itemIndex = Math.floor(Math.random() * length)
        while (listIndex.includes(itemIndex))
        listIndex = [
            ...listIndex,
            itemIndex
        ]
    }
    return shuffleArray(listIndex);
}

export const checkKnow = (countCheck, lastCheckAt) => {
    const duration = lastCheckAt ? moment.duration(moment().diff(moment(lastCheckAt))) : null ;
    if (countCheck === 0 || !duration) {
        return false;
    }
    if (countCheck > 10) {
        return true;
    }
    return duration.asDays() < timeRemember[countCheck];
}

export const getRandomIndex = (count, size) => {
    let nbPages = Math.ceil(count/size);
    let arrRandomIndex = [];
    for (let index = 0; index < nbPages; index ++) {
        let arr = []
        for (let i = size*index; i < size*(index+1);i ++) {
            if (i < count) {
                arr = [
                    ...arr,
                    i
                ]
            }
        }
        const indexRandom = arr[Math.floor(Math.random() * arr.length)];
        arrRandomIndex = [
            ...arrRandomIndex,
            indexRandom
        ]
    }
    return arrRandomIndex;
}

export const getDefineWord = (means, langCode) => {
    try {
        if (means.length === 0) {
            return '';
        }
        for (let index = 0; index < means.length; index ++) {
            let defineEnStr = means[index].define.en ?? "";
            let defineStr = means[index].define[langCode] ?? "";
            if (defineEnStr.length > 8) {
                return defineStr;
            }

            if (index === means.length - 1) {
                return means[0].define[langCode]
            }
        }
    } catch (e) {
        return '';
    }
}

export const toHHMMSS = (nbSeconds) => {
    var sec_num = parseInt(nbSeconds, 10);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return (hours !== "00" ? hours+':' : "") + minutes + ':' + seconds;
}

