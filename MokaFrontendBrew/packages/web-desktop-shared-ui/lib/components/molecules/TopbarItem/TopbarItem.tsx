import React from "react";
import { IconType } from "react-icons";
import {
  topbarStyles,
  TopbarItemVariant,
} from "../../organisms/Topbar/Topbar.styles";

export interface TopbarItemProps {
  icon: IconType;
  label: string;
  variant?: TopbarItemVariant;
  onClick?: () => void;
}

const SidebarItem: React.FC<TopbarItemProps> = ({
  icon: Icon,
  label,
  variant = "default",
  onClick,
}) => {
  const itemClass = `${topbarStyles.item.base} ${topbarStyles.item.border} ${topbarStyles.item.variants[variant]}`;

  return (
    <button className={itemClass} onClick={onClick}>
      <Icon className={`${topbarStyles.item.icon} mr-2`} />
      <span className={topbarStyles.item.text}>{label}</span>
    </button>
  );
};

export default SidebarItem;
