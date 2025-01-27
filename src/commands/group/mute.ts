import { ICommand } from "@constants/command.constant";
import { findGroup } from "@utils/group.utils";
import { sleep } from "@utils/helper.utils";

export default {
  aliases: ["mutebot", "shutup"],
  category: "group",
  description: "Making bots can't be used by group members but admins can",
  adminGroup: true,
  groupOnly: true,

  callback: async ({ client, msg, shortMessage }) => {
    try {
      let data = await findGroup(msg.from);
      if (data.isMute) return msg.reply(shortMessage.mute.isMute);
      data["isMute"] = true;
      await data.save();
      msg.reply(shortMessage.mute.succes);
    } catch (e) {
      msg.reply(shortMessage.mute.error);
    }
  },
} as ICommand;
