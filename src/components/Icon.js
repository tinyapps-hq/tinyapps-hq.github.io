import { IonIcon } from "@ionic/react";
import { build, person, qrCodeOutline } from "ionicons/icons";
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
export const QRIcon = () => Icon(qrCodeOutline);
export const PersonIcon = () => (
  <IonIcon
    icon={person}
    style={{ ...styles.icon, color: "lightgreen" }}
  ></IonIcon>
);
