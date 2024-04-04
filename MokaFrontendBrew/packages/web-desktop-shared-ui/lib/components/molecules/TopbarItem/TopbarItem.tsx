import React from "react";
import { IconType } from "react-icons";
import {
  topbarStyles,
  TopbarItemVariant,
} from "../../organisms/Topbar/Topbar.styles";
import { Link } from 'react-router-dom';
export interface TopbarItemProps {
  icon: IconType;
  label: string;
  variant?: TopbarItemVariant;
  onClick?: () => void;
  to?: string;
}

const TopbarItem: React.FC<TopbarItemProps> = ({
  icon: Icon,
  label,
  variant = "default",
  onClick,
  to,
}) => {
  const itemClass = `${topbarStyles.item.base} ${topbarStyles.item.border} ${topbarStyles.item.variants[variant]}`;

  return to ? (
    <Link to={to} className={itemClass}>
      <Icon className={`${topbarStyles.item.icon} mr-2`} />
      <span className={topbarStyles.item.text}>{label}</span>
    </Link>
  ) : (
    <button className={itemClass} onClick={onClick}>
      <Icon className={`${topbarStyles.item.icon} mr-2`} />
      <span className={topbarStyles.item.text}>{label}</span>
    </button>
  );
};

export default TopbarItem;
