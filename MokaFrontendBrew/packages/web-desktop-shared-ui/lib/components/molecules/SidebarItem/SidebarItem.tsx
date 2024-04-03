import React from "react";
import { IconType } from "react-icons";
import {
  sidebarStyles,
  SidebarItemVariant,
} from "../../organisms/Sidebar/Sidebar.styles";

export interface SidebarItemProps {
  icon: IconType;
  label: string;
  variant?: SidebarItemVariant;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  variant = "default",
  onClick,
}) => {
  const itemClass = `${sidebarStyles.item.base} ${sidebarStyles.item.border} ${sidebarStyles.item.variants[variant]}`;

  return (
    <button className={itemClass} onClick={onClick}>
      <Icon className={`${sidebarStyles.item.icon} mr-2`} />
      <span className={sidebarStyles.item.text}>{label}</span>
    </button>
  );
};

export default SidebarItem;
