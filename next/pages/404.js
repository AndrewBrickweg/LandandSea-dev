import Link from "next/link";
import MetaHead from "../components/Layout/MetaHead/MetaHead";
import Button from "../components/Button/Button";

export default function NotFoundPage() {
  return (
    <>
      <MetaHead
        title="Page not found"
        desc="We're sorry, the page you were looking for was not found, please return home."
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
        }}
      >
        <h1>404 | Page Not Found</h1>
        <Link href="/">
          <Button style={{ marginTop: "2rem" }} variant="contained">
            <a>Return Home</a>
          </Button>
        </Link>
      </div>
    </>
  );
}
