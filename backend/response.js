export function get_match_and_modify (db_res) {
  return {
    matchedCount: db_res.matchedCount,
    modifiedCount: db_res.modifiedCount
  }
}
