import rpgSc from '@schema/rpg.schema'

export const findUserRpg = async (id: string) => {
    if (!/@s.whatsapp.net/.test(id)) throw 'Invalid id/sender'
    let __data = await rpgSc.findOne({ id })
    if (!__data) __data = await rpgSc.create({ id })
    return __data
}

export const editRpg = async (id: string, edit: Object = null) => {
    if (!/@s.whatsapp.net/.test(id)) throw 'Invalid id/sender'
    if (edit == null) throw 'Enter what needs to be edited!'
    await rpgSc
        .findOneAndUpdate({ sender: id }, { $set: edit })
        .then((res) => {
            return res
        })
        .catch((e) => {
            throw e
        })
}

export const destroyedItem = async (id: string, item: 'sword' | 'armor' | 'pickaxe' | 'fishingrod') => {
    if (!/@s.whatsapp.net/.test(id)) throw 'Invalid id/sender'
    let { rpg }: any = await findUserRpg(id)
    if (rpg[item] == 0 || rpg[item] == false) throw `Player doesn't have a ${item}`
    let __typeItem = item === 'fishingrod' ? false : 0
    rpg[item] = __typeItem
    rpg[item + 'durability'] = 0
    return rpgSc.findOneAndUpdate({ id }, { $set: { rpg } })
}
