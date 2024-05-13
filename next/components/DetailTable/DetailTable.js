import styles from "./DetailTable.module.scss";
import { Grid, Paper } from "@mui/material";

const DetailTable = ({ data }) => {
  return (
    <Grid className={styles.container}>
      <Paper elevation={3} className={styles.detailTableWrapper}>
        <div className={styles.header}>{data.tableHeading}</div>
        <table className={styles.detailTable} cellSpacing={0}>
          <tbody>
            {/* conditionally render data if it exits  */}
            {data.rows.map((row, i) => (
              <tr key={i} className={styles.tableRow}>
                <td className={styles.tableRowHeader}>{row.heading}</td>
                <td className={styles.tableRowValue}>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Grid>
  );
};

export default DetailTable;
