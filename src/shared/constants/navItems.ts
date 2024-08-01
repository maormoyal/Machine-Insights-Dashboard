import factoryIcon from '../../assets/factory.icon.svg';
import circleInfoIcon from '../../assets/circle-info.icon.svg';
import bellIcon from '../../assets/bell.icon.svg';
import fileIcon from '../../assets/file.icon.svg';
import settingsIcon from '../../assets/settings.icon.svg';

import { NavItemsEnum } from '../enums/navItems.enum';

export const NAV_ITEMS = [
  { title: NavItemsEnum.Diagnostics, icon: factoryIcon },
  { title: NavItemsEnum.Information, icon: circleInfoIcon },
  { title: NavItemsEnum.Alerts, icon: bellIcon },
  { title: NavItemsEnum.Files, icon: fileIcon },
  { title: NavItemsEnum.Settings, icon: settingsIcon },
];
