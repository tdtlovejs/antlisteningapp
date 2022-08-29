import {Dimensions} from 'react-native';
import React from "react";


export const LANGUAGE_EN = 'en';
export const LANGUAGE_VI = 'vi';

export const listLanguage = [
    LANGUAGE_EN,
    LANGUAGE_VI
]

export const KEY_STORAGE_FIRST_LAUNCH = 'firstLaunch'
export const KEY_STORAGE_SETTINGS = 'settings';
export const KEY_STORAGE_LANG = 'lang';
export const KEY_STORAGE_DIC_DONE = 'dicDone';
export const KEY_STORAGE_GROUP_TYPE = 'groupType';
export const DONE = 'done';
export const NOT_DONE = 'not_done';
export const IS_FIRST_LAUNCH = 'is_first_launch';
export const IS_NOT_FIRST_LAUNCH = 'is_not_first_launch';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;

export const LIST_ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

export const GAME_HEART = 3

export const NO_ADS = true

export const MAX_LIMIT_DB = 999;

export const ADS_BANNER_ID = 'ca-app-pub-7186151264205129/4590092831';
export const ADS_INTERSTITIAL_ID = 'ca-app-pub-7186151264205129/5431567060';
export const ADS_REWARDED_ID = 'ca-app-pub-7186151264205129/4948636748';

export const PAGE_SIZE = 10;
export const UNIT_SIZE = 20;

export const ROUTE_TAB_HOME = 'home';
export const ROUTE_TAB_STATISTIC = 'statistic';

export const ROUTE_STACK_TAB_CUSTOM = 'tab_custom';
export const ROUTE_STACK_VOCABULARY_STUDY = 'vocabulary_study';
export const ROUTE_STACK_WORDS_BY_PACK = 'words_by_pack';
export const ROUTE_STACK_SETTINGS = 'settings';
export const ROUTE_STACK_WORD_BY_MY_GROUP = 'word_by_my_group';
export const ROUTE_STACK_SELECT_GROUP = 'select_group';
export const ROUTE_STACK_UNIT_BY_SUBSUBTOPIC = 'unit_by_subsubtopic'
export const ROUTE_STACK_TRAINING = 'training';
export const ROUTE_STACK_GAMING = 'gaming';
export const ROUTE_STACK_RANDOM_TRAINING = 'random_training';

export const ROUTE_STACK_RANDOM_GAMING = 'random_gaming';
export const ROUTE_STACK_GAMING_CHOICE_WRONG_WORD = 'gaming_choice_wrong_word';
export const ROUTE_STACK_GAMING_CHOICE_WRONG_DEFINE = 'gaming_choice_wrong_define';
export const ROUTE_STACK_GAMING_MATCHING_DEFINE_WORD = 'gaming_matching_define_word';
export const ROUTE_STACK_GAMING_CHOICE_MISSING_LETTER = 'gaming_choice_missing_letter';
export const ROUTE_STACK_GAMING_UNSCRAMBLE_WORD = 'gaming_scramble_word';
export const ROUTE_STACK_GAMING_SMASHING_GIFT = 'gaming_smashing_gift';

export const ROUTE_STACK_RANDOM_GAMING_CHOICE_WRONG_WORD = 'random_gaming_choice_wrong_word';
export const ROUTE_STACK_RANDOM_GAMING_CHOICE_WRONG_DEFINE = 'random_gaming_choice_wrong_define';
export const ROUTE_STACK_RANDOM_GAMING_MATCHING_DEFINE_WORD = 'random_gaming_matching_define_word';
export const ROUTE_STACK_RANDOM_GAMING_CHOICE_MISSING_LETTER = 'random_gaming_choice_missing_letter';
export const ROUTE_STACK_RANDOM_GAMING_UNSCRAMBLE_WORD = 'random_gaming_scramble_word';
export const ROUTE_STACK_RANDOM_GAMING_SMASHING_GIFT = 'random_gaming_smashing_gift';


export const ROUTE_STACK_REMIND_WORDS_PAGE = 'remind_words_page';
export const ROUTE_STACK_KNOW_WORDS_PAGE = 'know_words_page';


export const DATABASE_NAME = 'antlistening'
export const TABLE_NAME_TRACK = 'track';
export const TABLE_NAME_MY_PLAYLIST = 'myplaylist';

export const TABLE_NAME_GAMING_HIGH_SCORE = 'gamingHighScore';

export const MAX_SIZE_WORDS_IN_GROUP = 10;

export const MY_GROUP = 'my_group';

export const GROUP_500_TOEFL = '500_toefl';
export const GROUP_600_IELTS = '600_ielts';
export const GROUP_1200_TOEIC = '1200_toeic';
export const GROUP_2100_SAT = '2100_sat';
export const GROUP_600_BEGINNERS = '600_beginners';
export const GROUP_600_INTERMEDIATES_1 = '600_intermediates_1';
export const GROUP_600_INTERMEDIATES_2 = '600_intermediates_2';
export const GROUP_600_HIGH_INTERMEDIATE = '600_high_intermediate';
export const GROUP_600_LOW_ADVANCED = '600_low_advanced';
export const GROUP_600_ADVANCED = '600_advanced';
export const GROUP_1000_COMMON = '1000_common';
export const GROUP_1700_BUSINESS= '1700_business';
export const GROUP_2800_WRITTEN = '2800_written';
export const GROUP_3000_SPOKEN = '3000_spoken';

export const GROUP_KINDERGARTEN = 'kindergarten';
export const GROUP_GRADE_1 = 'grade_1';
export const GROUP_GRADE_2 = 'grade_2';
export const GROUP_GRADE_3 = 'grade_3';
export const GROUP_GRADE_4 = 'grade_4';
export const GROUP_GRADE_5 = 'grade_5';
export const GROUP_GRADE_6 = 'grade_6';
export const GROUP_GRADE_7 = 'grade_7';
export const GROUP_GRADE_8 = 'grade_8';
export const GROUP_GRADE_9 = 'grade_9';
export const GROUP_GRADE_10_BASIC = 'grade_10_basic';
export const GROUP_GRADE_10_ADVANCED = 'grade_10_advanced';
export const GROUP_GRADE_11_BASIC = 'grade_11_basic';
export const GROUP_GRADE_11_ADVANCED = 'grade_11_advanced';
export const GROUP_GRADE_12_BASIC = 'grade_12_basic';
export const GROUP_GRADE_12_ADVANCED = 'grade_12_advanced ';

export const GROUP_OXFORD_TOPIC = 'oxford_topic';
export const GROUP_OXFORD_3000 = 'oxford_3000';
export const GROUP_OXFORD_5000 = 'oxford_5000';

import {t} from 'i18next';


export const TRAINING_TYPE_CHOICE_MEANING = 'choice_meaning';
export const TRAINING_TYPE_CHOICE_PHOTO = 'choice_photo';
export const TRAINING_TYPE_CHOICE_WORD = 'choice_word';
export const TRAINING_TYPE_WRITE_WORD = 'write_word';

export const TRAINING_TYPE_LIST = [
    TRAINING_TYPE_CHOICE_MEANING,
    TRAINING_TYPE_CHOICE_PHOTO,
    TRAINING_TYPE_CHOICE_WORD,
    TRAINING_TYPE_WRITE_WORD
]


export const getRandomTrainingType = () => {
    return TRAINING_TYPE_LIST[Math.floor(Math.random() * TRAINING_TYPE_LIST.length)];
}

// THỐNG KÊ THỜI GIAN HẰNG NGÀY TRÊN ỨNG DỤNG

export const REMINDER_01 = 1;
export const REMINDER_02 = 2;
export const REMINDER_03 = 3;
export const REMINDER_04 = 4;
export const REMINDER_05 = 5;
export const REMINDER_06 = 6;
export const REMINDER_07 = 7;
export const REMINDER_08 = 8;
// export const REMINDER_09 =

export const timeRemember = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10
}
export const randomRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


export const colorByLevel = {
    a1: '#0E75BB',
    a2: '#8CC63F',
    b1: '#F7941E',
    b2: '#92278F',
    c1: '#0F75BC',
    c2: '#ED1C24'
}
export const pointByLevel = {
    a1: 1,
    a2: 2,
    b1: 3,
    b2: 4,
    c1: 5,
    c2: 6
}

export const GAMING_CODE_CHOICE_WRONG_WORD = 'choice_wrong_word';
export const GAMING_CODE_CHOICE_WRONG_DEFINE = 'choice_wrong_define';
export const GAMING_CODE_MATCHING_DEFINE_WORD = 'matching_define_word';
export const GAMING_CODE_CHOICE_MISSING_LETTER = 'choice_missing_letter';
export const GAMING_CODE_UNSCRAMBLE_WORD = 'scramble_word';
export const GAMING_CODE_SMASHING_GIFT = 'smashing_gift';

export const PAGE_KNOW = 'know';
export const PAGE_REMIND = 'remind';

export const BOX_WORD_TYPE_WRONG_WORD = 'wrongWord';
export const BOX_WORD_TYPE_WRONG_DEFINE = 'wrongDefine'

export const PHONETIC_AUDIO_UK = 'uk';
export const PHONETIC_AUDIO_US = 'us';

export const NOTI_CHANNEL_ID_WORD_REMINDER = 'word-reminder';
export const NOTI_CHANNEL_ID_DAILY_STUDY_REMINDER = 'daily-study-reminder';

export const IMAGE_RANDOM_BY_INDEX = (index) => {
    return `https://source.unsplash.com/random/500x500?sig=${index}`
}

export const LIST_INDEX_VOCA_ADS = [
    5, // 20
    20, // 60
    40, // 120
    65, // 240
    95, // 480
    // 940, // 960
    // 1900, // 1920
    // 3820, // 3840
    // 7660, // 7680
]

export const LIST_INDEX_PACK_ADS = [
    10, // 20
    40, // 60
    100, // 120
    220, // 240
    460, // 480
    940, // 960
    1900, // 1920
    3820, // 3840
    7660, // 7680
]
