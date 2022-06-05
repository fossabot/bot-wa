import { ICommand } from '@constants/command.constant'
import { editUser } from '@utils/user.utils'

export default {
    description: 'RPG games for adventure',
    category: 'game/rpg',

    callback: async ({ msg, client, User, args, prefix }) => {
        const { sender, pushName, from } = msg
        let user = User.rpg
        const tfcrates = Object.keys(tfinventory.tfcrates)
            .map((v) => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`)
            .filter((v) => v)
            .join('\n')
            .trim()
        let listCrate = Object.fromEntries(Object.entries(rewards).filter(([v]) => v && v in user))
        let info = `🧑🏻‍🏫 ᴜsᴇʀ: *${pushName}*

🔖 ᴄʀᴀᴛᴇ ʟɪsᴛ :
${Object.keys(tfinventory.tfcrates)
    .map((v) => user[v] && `⮕ ${global.rpg.emoticon(v)} ${v}: ${user[v]}`)
    .filter((v) => v)
    .join('\n')}
–––––––––––––––––––––––––
💁🏻‍♂ ᴛɪᴩ :
⮕ ᴏᴩᴇɴ ᴄʀᴀᴛᴇ:
${prefix}open [crate] [quantity]
★ ᴇxᴀᴍᴩʟᴇ:
${[prefix]}open mythic 3
`

        let type = (args[0] || '').toLowerCase()
        let count = Math.floor(isNumber(args[1]) ? Math.min(Math.max(parseInt(args[1]), 1), Number.MAX_SAFE_INTEGER) : 1) * 1
        if (!(type in listCrate))
            return client.sendMessage(from, {
                text: `*––––『 OPEN CRATES 』––––*`,
                templateButtons: [
                    { index: 1, quickReplyButton: { displayText: `ᴄᴏᴍᴍᴏɴ`, id: prefix + `open common` } },
                    { index: 2, quickReplyButton: { displayText: 'ᴜɴᴄᴏᴍᴍᴏɴ', id: prefix + `open uncommon` } },
                ],
            })

        if (user[type] < count)
            return msg.reply(
                `Your *${global.rpg.emoticon(type)}${type} crate* is not enough!, you only have ${user[type]} *${global.rpg.emoticon(type)}${type} crate*
type *${prefix}buy ${type} ${count - user[type]}* to buy
`.trim()
            )

        let crateReward = {}
        for (let i = 0; i < count; i++)
            for (let [reward, value] of Object.entries(listCrate[type]))
                if (reward in user) {
                    const total = value.getRandom()
                    if (total) {
                        user[reward] += total * 1
                        crateReward[reward] = (crateReward[reward] || 0) + total * 1
                    }
                }
        user[type] -= count * 1
        msg.reply(
            `
You have opened *${count}* ${global.rpg.emoticon(type)}${type} crate and got:
${Object.keys(crateReward)
    .filter((v) => v && crateReward[v] && !/legendary|pet|mythic|diamond|emerald/i.test(v))
    .map((reward) =>
        `
*${global.rpg.emoticon(reward)}${reward}:* ${crateReward[reward]}
`.trim()
    )
    .join('\n')}
`.trim()
        )
        let diamond = crateReward['diamond'],
            mythic = crateReward['mythic'],
            pet = crateReward['pet'],
            legendary = crateReward['legendary'],
            emerald = crateReward['emerald']
        if (mythic || diamond)
            msg.reply(
                `
Congrats you got a rare item, which is ${diamond ? `*${diamond}* ${global.rpg.emoticon('diamond')}diamond` : ''}${diamond && mythic ? 'and ' : ''}${mythic ? `*${mythic}* ${global.rpg.emoticon('mythic')}mythic` : ''}
`.trim()
            )
        if (pet || legendary || emerald)
            msg.reply(
                `
Congrats you got a epic item, which is ${pet ? `*${pet}* ${global.rpg.emoticon('pet')}pet` : ''}${pet && legendary && emerald ? ', ' : (pet && legendary) || (legendary && emerald) || (emerald && pet) ? 'and ' : ''}${
                    legendary ? `*${legendary}* ${global.rpg.emoticon('legendary')}legendary` : ''
                }${pet && legendary && emerald ? 'and ' : ''}${emerald ? `*${emerald}* ${global.rpg.emoticon('emerald')}emerald` : ''}
`.trim()
            )
        return editUser(sender, { rpg: user })
    },
} as ICommand

const tfinventory = {
    others: {
        money: true,
    },
    tfitems: {
        potion: true,
        trash: true,
        wood: true,
        rock: true,
        string: true,
        emerald: true,
        diamond: true,
        gold: true,
        iron: true,
    },
    tfcrates: {
        common: true,
        uncommon: true,
        mythic: true,
        legendary: true,
        pet: true,
    },
    tfpets: {
        horse: 10,
        cat: 10,
        fox: 10,
        dog: 10,
    },
}
const rewards = {
    common: {
        money: 101,
        exp: 201,
        trash: 11,
        potion: [0, 1, 0, 1, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    uncommon: {
        money: 201,
        exp: 401,
        trash: 31,
        potion: [0, 1, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        wood: [0, 1, 0, 0, 0, 0],
        rock: [0, 1, 0, 0, 0, 0],
        string: [0, 1, 0, 0, 0, 0],
    },
    mythic: {
        money: 301,
        exp: 551,
        trash: 61,
        potion: [0, 1, 0, 0, 0, 0],
        emerald: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        iron: [0, 1, 0, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        wood: [0, 1, 0, 0, 0],
        rock: [0, 1, 0, 0, 0],
        string: [0, 1, 0, 0, 0],
    },
    legendary: {
        money: 401,
        exp: 601,
        trash: 101,
        potion: [0, 1, 0, 0, 0],
        emerald: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        diamond: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        gold: [0, 1, 0, 0, 0, 0, 0, 0],
        iron: [0, 1, 0, 0, 0, 0, 0],
        common: [0, 1, 0, 0],
        uncommon: [0, 1, 0, 0, 0, 0],
        mythic: [0, 1, 0, 0, 0, 0, 0, 0, 0],
        legendary: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        pet: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        wood: [0, 1, 0, 0],
        rock: [0, 1, 0, 0],
        string: [0, 1, 0, 0],
    },
}
function isNumber(number) {
    if (!number) return number
    number = parseInt(number)
    return typeof number == 'number' && !isNaN(number)
}