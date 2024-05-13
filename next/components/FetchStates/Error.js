import Link from "next/link";
import Button from "../Button/Button";

const Error = () => {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <p>We're sorry, something broke!</p>
      <br />
      <p>Failed to load...Please return to home</p>
      <Link href="/">
        <Button style={{ marginTop: "2rem" }} variant="contained">
          <a>Return Home</a>
        </Button>
      </Link>
    </div>
  );
};

export default Error;
