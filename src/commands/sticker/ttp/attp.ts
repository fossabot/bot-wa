import { ICommand } from '@constants/command.constant'
import { lolhuman } from '@config'

export default {
    description: 'Change text to sticker',
    category: 'sticker',
    consume: 2,
    callback: async ({ args, msg, client, shortMessage, message }) => {
        const { from, sender } = msg
        if (args.length < 1) return msg.error(shortMessage.require.text)
        return client.sendMessage(from, { sticker: { url: `https://api.lolhuman.xyz/api/attp?apikey=${lolhuman}&text=${args.join(' ')}` }, mentions: [sender] }, { quoted: message })
    },
} as ICommand
