import React from "react";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { AppFontAwesomeIcons } from "./Icon.fontawesome";

export type IconProps = {
  name: keyof typeof AppFontAwesomeIcons
} & Pick<FontAwesomeIconProps, "className" | "size">

// TODO: Should probably forward ref on this?
export function Icon({
  name,
  ...rest
}: IconProps) {
  return (
    <FontAwesomeIcon
      icon={AppFontAwesomeIcons[name]}
      {...rest}
    />
  )
}