import styles from "./StatusBadge.module.scss";

const StatusBadge = ({ label, variant }) => {
  //variant could be active and inactive
  return <div className={styles.badge}>{label}</div>;
};

export default StatusBadge;
