import { IonIcon } from "@ionic/react";
import { build, cog, createOutline, ellipsisHorizontal, person, qrCodeOutline } from "ionicons/icons";
import React from "react";

const styles = {
  icon: {
    color: "#a9a9a9",
    fontSize: 25,
    marginBottom: -7,
  },
};

const Icon = (type) => <IonIcon icon={type} style={styles.icon}></IonIcon>;

export const SetupMenu = () => Icon(build);
export const TournamentMenu = () => Icon(ellipsisHorizontal);
export const QRIcon = () => Icon(qrCodeOutline);
export const EditIcon = () => Icon(createOutline);
export const SettingsIcon = () => Icon(cog);
export const PersonIcon = () => (
  <IonIcon
    icon={person}
    style={{ ...styles.icon, color: "lightgreen" }}
  ></IonIcon>
);
