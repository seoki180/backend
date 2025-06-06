import pool from '../config/db.config.js'
import { prisma } from '../config/prisma.config.js'


export default class users_model {
    static async selectMissionInfo(user_index) {
        const query = `select 
        S.score_log_total_score,
        S.score_log_carbon_reduction,
        U.user_mission_count
        from SCORES_LOG S
        left join USERS as U on S.user_index = U.user_index
        where S.user_index = ?`

        return new Promise((resolve, reject) => {
            pool.query(query, [user_index], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    }

    static async selectUserInfo(data){
        const query = `SELECT 
  U.user_index,
  U.user_id,
  U.user_name,
  U.user_profile,
  T.team_name
FROM USERS AS U
LEFT JOIN TEAMS AS T ON U.team_index = T.team_index
WHERE U.user_index = ?`; 
        return new Promise((resolve, reject) => {
            pool.query(query, [data.user_index], (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    }
    static async selectCarbon(user_index){
        const result = await prisma.sCORES_LOG.findMany({
            where:{
                user_index : parseInt(user_index),
            },
            select:{
                score_log_carbon_reduction : true
            }
        })
        return result
    }
}   
