import * as SQLite from "expo-sqlite";
import { virtues_english, virtues_albanian } from './localization/virtues.js';

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("benjalin.db");
  return db;
}

const dbInitializer = () => {
  console.log('initializing the database');
  db.transaction((tx) => {
//    tx.executeSql("drop table if exists daily_scores;");
    tx.executeSql(
      "create table if not exists daily_scores (id integer primary key not null, score integer, virtue text, day integer, month integer, year integer);"
    );
    tx.executeSql("CREATE UNIQUE INDEX daily_score_idx ON daily_scores(virtue, day, month, year);");
  });
}

const db = openDatabase();

dbInitializer();

const storeScore = (score, virtue, year, month, day) => {
  console.log('storeing score', virtue, score, year, month, day);

  db.transaction((tx) => {
    tx.executeSql("insert or replace into daily_scores (score, virtue, year, month, day) values (?, ?, ?, ?, ?)", [score, virtue, year, month, day]);
  });
}


const averageScore = (virtue, cb) => {
  console.log('calculating the average for', virtue);
  db.transaction((tx) => {
    console.log("selecting average score");
    tx.executeSql("select avg(score) as average from daily_scores where virtue=?;",
                  [virtue],
                  (_, { rows }) => {
                    console.log(rows);
                    console.log('nnnnnnn', rows["_array"][0]["average"]);
                      cb(rows["_array"][0]["average"] || 0);
                  },
                  (t, e) => console.log('error retrieving average score', e))
  });
}



const logScores = () => {
  db.transaction((tx) => {
    tx.executeSql("select * from daily_scores", [], (_, { rows }) => 
                  console.log(JSON.stringify(rows)));
     });
}

const distinctMonthsByVirtue = (virtue, setterCB) => {
  console.log("is this here executing", virtue);
  db.transaction((tx) => {
    tx.executeSql("select distinct month from daily_scores where virtue=?;",
                 [virtue],
                 (_ , { rows }) => {
                   console.log("beautiful", rows);
                   setterCB(rows["_array"]);
                 });
  });
}

const todaysScore = (virtue, year, month, day, setterCB) => {
  console.log("retrieving today's score", virtue, year, month, day);
  db.transaction((tx) => {
    tx.executeSql("select * from daily_scores where virtue=? and year=? and month=? and day=?;",
                 [virtue, year, month, day],
                 (_, { rows }) => {
                   if(rows["length"] > 0) {
                     setterCB("You scored yourself here today " + rows["_array"][0].score);
                   }
                   else {
                     setterCB("You did not score yourself here for today.");
                   }
                 });
  });

}

const virtueDescriptions = () => {
  let lang = 'eng';
  if(lang == 'sq') {
    return virtues_albanian;
  }
  else if ('eng') {
    return virtues_english;
  }
}

export { logScores, storeScore, averageScore, distinctMonthsByVirtue, todaysScore, virtueDescriptions };
