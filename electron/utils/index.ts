import { join } from 'node:path';
import { app } from 'electron';
import { readFileSync, writeFileSync, existsSync } from 'fs';
export const saveConfig = (_playInfo) => {
  const {
    setting,
    dataPath
  } = getConfig();
  return (function (playInfo) {
    const findIndex = setting.findIndex((item) => item.key === playInfo.key);
    
    const findInfo = setting[findIndex] || {};
    const {
      key,
      title,
      desc,
      enable,
      week,
      time,
      audio,
      avatar
    } = playInfo;
    findInfo.key = key;
    findInfo.title = title;
    findInfo.desc = desc;
    findInfo.enable = enable;
    findInfo.week = week;
    findInfo.time = time;
    findInfo.audio = audio;
    findInfo.avatar = avatar;
    if (findIndex === -1) {
      setting.push(findInfo);
    }
    writeFileSync(dataPath, JSON.stringify(setting), { encoding: "utf-8" })
  })(JSON.parse(_playInfo))
}

export const getConfig = () => {
  const dataPath = join(app.getPath('userData'), 'setting.json')
  const hasSetting = existsSync(dataPath);
  const settingTxt = hasSetting ? readFileSync(dataPath, { encoding: "utf-8" }) : '';
  const setting = settingTxt ? JSON.parse(settingTxt) : [];

  return {
    dataPath,
    setting
  };
}