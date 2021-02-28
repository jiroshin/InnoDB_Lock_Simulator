var colorDefaultRecord = "#FFFFFF"
var colorGapRecord = "#B0BEC5"
var colorRecordLock = "#EF5350"
var colorGapLock = "#FFCC80"
var colorNextKeyLock = "#66BB6A"
var timeSleepMSec = 200

async function setRecordColor(selector, color, sleepMsec) {
  $(selector).css("background-color", color)
  await sleep(sleepMsec)
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function displayWhereClause(whereClause) {
  $("#where-clause").text(whereClause)
}

function displayComment(txt) {
  $("#comment").text(txt)
}

function resetRecord() {
  displayWhereClause("{where clause}")
  displayComment("コメント")
  setRecordColor(".gap", colorGapRecord, 0)
  setRecordColor("#id1", colorDefaultRecord, timeSleepMSec)
  setRecordColor("#id2", colorDefaultRecord, timeSleepMSec)
  setRecordColor("#id3", colorDefaultRecord, timeSleepMSec)
  setRecordColor("#id4", colorDefaultRecord, timeSleepMSec)
  setRecordColor("#id5", colorDefaultRecord, timeSleepMSec)
  setRecordColor("#id10", colorDefaultRecord, timeSleepMSec)
  setRecordColor("#id20", colorDefaultRecord, 0)
}

// =========== when click button =========== //

$("#reset").click(function() {resetRecord()});

$("#full-table-scan").click(async function() {
  resetRecord()
  displayWhereClause("where balance = 500")
  displayComment("indexが張られていないbalanceに対してwhere条件を設定したため、クエリフルテーブルスキャンになってしまいます。この場合、テーブル全体にロックがかかりデータの挿入や削除、更新ができません。")
  await setRecordColor("#id1", colorRecordLock, timeSleepMSec)
  await setRecordColor("#id2", colorRecordLock, timeSleepMSec)
  await setRecordColor("#id3", colorRecordLock, timeSleepMSec)
  await setRecordColor("#id4", colorRecordLock, timeSleepMSec)
  await setRecordColor("#id5", colorRecordLock, timeSleepMSec)
  await setRecordColor("#id10", colorRecordLock, timeSleepMSec)
  await setRecordColor("#id20", colorRecordLock, 0)
});

$("#where_eq_3").click(async function() {
  resetRecord()
  displayWhereClause("where id = 3")
  displayComment("存在するidのため対象の一行に対してロックがかかる。")
  await setRecordColor(id3, colorRecordLock, 0)
});

$("#where_eq_8").click(async function() {
  resetRecord()
  displayComment("存在しないidのため対象のGapに対してロックがかかる。")
  displayWhereClause("where id = 8")
  await setRecordColor(gap2, colorGapLock, 0)
});

$("#where_eq_25").click(async function() {
  resetRecord()
  displayComment("存在しないidのため対象のGapに対してロックがかかる。この場合、正の方向の無限大に対してロックがかかってしまいまい、他のトランザクションのGapロックとタイミングが被るとDeadLockが発生する可能性がある。トランザクションの再試行やGET_LOCK()関数を使って対応すると良いかもしれません。")
  displayWhereClause("where id = 25")
  await setRecordColor(gap4, colorGapLock, 0)
});

$("#where_lt_3").click(async function() {
  resetRecord()
  displayWhereClause("where id < 3")
  displayComment("id=3にNext-keyロックがかかるのがポイント。")
  await setRecordColor(gap1, colorGapLock, timeSleepMSec)
  await setRecordColor(id1, colorRecordLock, timeSleepMSec)
  await setRecordColor(id2, colorRecordLock, timeSleepMSec)
  await setRecordColor(id3, colorNextKeyLock, 0)
});

$("#where_lt_8").click(async function() {
  resetRecord()
  displayWhereClause("where id < 8")
  displayComment("id=10にnext-keyロックがかかるのがポイント。")
  await setRecordColor(gap1, colorGapLock, timeSleepMSec)
  await setRecordColor(id1, colorRecordLock, timeSleepMSec)
  await setRecordColor(id2, colorRecordLock, timeSleepMSec)
  await setRecordColor(id3, colorRecordLock, timeSleepMSec)
  await setRecordColor(id4, colorRecordLock, timeSleepMSec)
  await setRecordColor(id5, colorRecordLock, timeSleepMSec)
  await setRecordColor(gap2, colorGapLock, timeSleepMSec)
  await setRecordColor(id10, colorNextKeyLock, 0)
});

$("#where_gt_3").click(async function() {
  resetRecord()
  displayWhereClause("where id > 3")
  displayComment("分かりやすい動きをしてくれている。もしindex走査が反対の時にはNext-keyロックも逆順になるので注意。")
  await setRecordColor(id4 , colorNextKeyLock, timeSleepMSec)
  await setRecordColor(id5 , colorRecordLock, timeSleepMSec)
  await setRecordColor(gap2, colorGapLock, timeSleepMSec)
  await setRecordColor(id10 , colorRecordLock, timeSleepMSec)
  await setRecordColor(gap3, colorGapLock, timeSleepMSec)
  await setRecordColor(id20 , colorRecordLock, timeSleepMSec)
  await setRecordColor(gap4, colorGapLock, timeSleepMSec)
});

$("#where_gt_8").click(async function() {
  resetRecord()
  displayWhereClause("where id > 8")
  displayComment("分かりやすい動きをしてくれている。もしindex走査が反対の時にはNext-keyロックも逆順になるので注意。")
  await setRecordColor(gap2, colorGapLock, timeSleepMSec)
  await setRecordColor(id10 , colorNextKeyLock, timeSleepMSec)
  await setRecordColor(gap3, colorGapLock, timeSleepMSec)
  await setRecordColor(id20 , colorRecordLock, timeSleepMSec)
  await setRecordColor(gap4, colorGapLock, timeSleepMSec)
});

$("#where_lte_3").click(async function() {
  resetRecord()
  displayWhereClause("where id <= 3")
  displayComment("id=4にNext-keyロックがかかるのがポイント。もしindex走査が反対の時にはNext-keyロックも逆順になるので注意。")
  await setRecordColor(gap1, colorGapLock, timeSleepMSec)
  await setRecordColor(id1, colorRecordLock, timeSleepMSec)
  await setRecordColor(id2, colorRecordLock, timeSleepMSec)
  await setRecordColor(id3, colorRecordLock, timeSleepMSec)
  await setRecordColor(id4, colorNextKeyLock, 0)
});

$("#where_lte_5").click(async function() {
  resetRecord()
  displayWhereClause("where id <= 5")
  displayComment("Next-keyロックがGap超えて10にかかるので注意。思わずツッコミたくなる。")
  await setRecordColor(gap1, colorGapLock, timeSleepMSec)
  await setRecordColor(id1, colorRecordLock, timeSleepMSec)
  await setRecordColor(id2, colorRecordLock, timeSleepMSec)
  await setRecordColor(id3, colorRecordLock, timeSleepMSec)
  await setRecordColor(id4, colorRecordLock, timeSleepMSec)
  await setRecordColor(id5, colorRecordLock, timeSleepMSec)
  await setRecordColor(gap2, colorGapLock, timeSleepMSec)
  await setRecordColor(id10, colorNextKeyLock, 0)
});

$("#where_lte_8").click(async function() {
  resetRecord()
  displayWhereClause("where id <= 8")
  displayComment("id=10にNext-keyロックがかかるのがポイント。")
  await setRecordColor(gap1, colorGapLock, timeSleepMSec)
  await setRecordColor(id1, colorRecordLock, timeSleepMSec)
  await setRecordColor(id2, colorRecordLock, timeSleepMSec)
  await setRecordColor(id3, colorRecordLock, timeSleepMSec)
  await setRecordColor(id4, colorRecordLock, timeSleepMSec)
  await setRecordColor(id5, colorRecordLock, timeSleepMSec)
  await setRecordColor(gap2, colorGapLock, timeSleepMSec)
  await setRecordColor(id10, colorNextKeyLock, 0)
});

$("#where_gte_3").click(async function() {
  resetRecord()
  displayWhereClause("where id >= 3")
  displayComment("分かりやすい動きをしてくれている。もしindex走査が反対の時にはNext-keyロックも逆順になるので注意。")
  await setRecordColor(id3, colorRecordLock, timeSleepMSec)
  await setRecordColor(id4, colorNextKeyLock, timeSleepMSec)
  await setRecordColor(id5, colorRecordLock, timeSleepMSec)
  await setRecordColor(gap2, colorGapLock, timeSleepMSec)
  await setRecordColor(id10, colorRecordLock, timeSleepMSec)
  await setRecordColor(gap3, colorGapLock, timeSleepMSec)
  await setRecordColor(id20, colorRecordLock, timeSleepMSec)
  await setRecordColor(gap4, colorGapLock, 0)
});

$("#where_gte_5").click(async function() {
  resetRecord()
  displayWhereClause("where id >= 5")
  displayComment("分かりやすい動きをしてくれている。もしindex走査が反対の時にはNext-keyロックも逆順になるので注意。")
  await setRecordColor(id5, colorRecordLock, timeSleepMSec)
  await setRecordColor(gap2, colorGapLock, timeSleepMSec)
  await setRecordColor(id10, colorNextKeyLock, timeSleepMSec)
  await setRecordColor(gap3, colorGapLock, timeSleepMSec)
  await setRecordColor(id20, colorRecordLock, timeSleepMSec)
  await setRecordColor(gap4, colorGapLock, 0)
});

$("#where_gte_8").click(async function() {
  resetRecord()
  displayWhereClause("where id >= 8")
  displayComment("分かりやすい動きをしてくれている。もしindex走査が反対の時にはNext-keyロックも逆順になるので注意。")
  await setRecordColor(gap2, colorGapLock, timeSleepMSec)
  await setRecordColor(id10, colorNextKeyLock, timeSleepMSec)
  await setRecordColor(gap3, colorGapLock, timeSleepMSec)
  await setRecordColor(id20, colorRecordLock, timeSleepMSec)
  await setRecordColor(gap4, colorGapLock, 0)
});
